// should read the endpoint, execute the endpoint and transform the response.
import axios from 'axios';
import _ from 'lodash';
import async from 'async';
import objectMapper from 'object-mapper';
// import { readFile } from 'fs/promises';
import { fetch_configuration } from './redis.js';
// const datavalue = JSON.parse(await readFile(new URL('../config/definitionData.json', import.meta.url)));


export default async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }
  const inputs = {
    sourceAPI: {
      operationId: req.body.operationId,
    },
  };
  inputs[req.body.operationId] = {};
  inputs[req.body.operationId].requestParams = req.body.inputs
    ? req.body.inputs.filters
      ? req.body.inputs.filters
      : req.body.inputs
    : {};

  const query = { $and: [{ sourceOperationId: req.body.operationId }, { status: 'published' }] };
  const key = req.body.source + req.body.operationId;
  fetch_configuration(key, query, (err, data) => {
    if (err) {
      return res.status(400).json({ err: err.message });
    }
    if (!data) {
      return res.status(400).json({ msg: 'something went wrong.' });
    }
    const { mappings } = data;
    const options = {};
    inputs.targetAPI = {};
    _.each(data.content, (targetAPI) => {
      const targetMapping = _.find(mappings.targetAPI, (mapping) => {
        if (mapping.schemaId === targetAPI.schemaId) {
          return mapping;
        }
      });
      const headers = resolveMappings(inputs, targetMapping.headerParams);
      const requestParams = resolveMappings(inputs, targetMapping.requestParams);
      let url = `${targetAPI.endPoint.protocol
      }://${
        targetAPI.endPoint.host
      }${targetAPI.endPoint.path}`;

      url = resolvePathParameters(url, targetAPI.requestParams, requestParams);
      const option = {
        url,
        method: targetAPI.endPoint.method,
        headers,
      };

      if (
        targetAPI.endPoint.method.toLowerCase() !== 'get'
                && targetAPI.endPoint.method.toLowerCase() !== 'delete'
      ) option.data = requestParams;
      const functCall = async function () {
        try {
          return await axios(option).then((response) => response.data);
        } catch (error) {
          console.log(error);
          return error;
        }
      };

      let dependendencyArray = [];
      if (targetAPI.dependsOn !== '' && targetAPI.dependsOn.length > 0) {
        dependendencyArray = handleDependsOn(targetAPI, option, inputs);
      }
      options[targetAPI.operationId] = dependendencyArray && dependendencyArray.length > 0
        ? dependendencyArray
        : functCall;
    });

    async.auto(options, (error, results) => {
      if (error) {
        console.log(`Exception..${error}`);
        res.send(error);
      }
      if (!results) {
        console.log(`Exception..${error}`);
        res.send({ message: 'Exception occurred while executing the api..' });
      }
      Object.keys(results).forEach((element) => {
        if (inputs.targetAPI[element]) inputs.targetAPI[element].responseParams = results[element].data;
        else {
          inputs.targetAPI[element] = {
            responseParams: results[element].data,
          };
        }
      });
      const response = resolveMappings(inputs, mappings.sourceAPI.responseParams);

      res.send(response);
    });
  });
};

const handleDependsOn = async function (targetAPI, option, inputs) {
  let dependentArray = [];
  dependentArray = dependentArray.concat(targetAPI.dependsOn);
  const functCall = async function (results) {
    for (const denpendency in targetAPI.dependsOn) {
      inputs.targetAPI[targetAPI.dependsOn[denpendency]] = {
        responseParams: results[targetAPI.dependsOn[denpendency]],
      };
    }
    // TODO: clean and make it better. This code is repeated twice..
    const headers = resolveMappings(inputs, targetMapping.headerParams);
    const requestParams = resolveMappings(inputs, targetMapping.requestParams);
    const url = resolvePathParameters(
      option.url,
      targetAPI.requestParams,
      requestParams,
    );

    option.url = url;
    option.headers = headers;
    if (
      option.method.toLowerCase() !== 'get'
            && option.method.toLowerCase() !== 'delete'
    ) option.data = requestParams;
    try {
      const response = await axios(option);
      return response;
    } catch (error) {
      console.log(`error${error}`);
      return error;
    }
  };
  dependentArray.push(functCall);

  return dependentArray;
};

function resolvePathParameters(url, requestParams, resolvedParams) {
  // TODO: figure out a better approach to resolve path parameters.
  if (requestParams && requestParams.length < 1) {
    return `${url}/`;
  }
  _.each(requestParams, (reqParam) => {
    _.find(Object.keys(resolvedParams), (resolvedParam) => {
      if (reqParam.title === resolvedParam) {
        if (reqParam.in && reqParam.in === 'path') {
          const paramName = `{${resolvedParam}}`;
          if (url.indexOf(resolvedParam) > 0) url = url.replace(paramName, resolvedParams[resolvedParam]);
          else url = `${url}/${resolvedParams[resolvedParam]}`;
        } else if (reqParam.in === 'query') {
          if (url.indexOf('?') > 0) url = `${url}&${resolvedParam}=${resolvedParams[resolvedParam]}`;
          else url = `${url}?${resolvedParam}=${resolvedParams[resolvedParam]}`;
        }
      }
    });
  });
  return url;
}

function resolveMappings(sourceData, parameters) {
  const extractedParams = {};
  _.each(parameters, (param) => {
    const { key } = param;
    if (param.type === 'directMap') {
      console.log(`value${param.value}`);

      extractedParams[param.value] = key;
    } else if (param.type === 'constant') {
      extractedParams[param.value] = [{ key, default: param.value }];
    }
    if (param.type === 'transform') {
      const paramData = decodeURIComponent(param.value);

      if (paramData.indexOf('{{') > 0) {
        let params = paramData;
        const paramFinal = {};
        paramFinal.misc = [];
        while (params.indexOf('{{') > 0) {
          const paramItem = params.substring(
            params.indexOf('{{'),
            params.indexOf('}}') + 2,
          );
          const strippedParam = paramItem.replace(/[{{}}]/g, '');
          let value = _.get(sourceData, strippedParam);
          if (value) {
            value = value.toString();
          }
          const regexVar = new RegExp(paramItem);
          params = params.replace(regexVar, `'${value}'`);
        }
        extractedParams.misc = params;
        sourceData.misc = extractedParams.misc;
        extractedParams.misc = [
          {
            key,
            transform(value) {
              return new Function(value)();
            },
          },
        ];
      }
    }
  });
  const resolvedData = objectMapper.merge(sourceData, {}, extractedParams);
  return resolvedData;
}
