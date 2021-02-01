/* eslint-disable import/extensions */
import _ from 'lodash';
import ParamCl from './parameter.js';

let op;

function operation(operationSchema) {
  op = operationSchema;
}

operation.prototype.getHeaders = function () {
  const schemaHeaders = _.filter(op.parameters, (param) => param.in === 'header');
  return getParameters(schemaHeaders);
};

operation.prototype.getRequestParams = function () {
  const requestParams = _.filter(op.parameters, (param) => param.in && param.in !== 'header');
  const { requestBody } = op;
  const paramsFromReqBody = getParameters(requestBody);
  let params = getParameters(requestParams); // TODO: clean this. Open API 2.0 has request parameters listed under 'parameters' property. 3.0 version has spread under 'parameters' and 'requestBody'

  if (paramsFromReqBody) {
    params = params.concat(paramsFromReqBody);
  }

  return params;
};

function getParameters(parameters) {
  /* try {
        let params = [];
        _.each(parameters, function (parameter) {
            let paramCl = new ParamCl(parameter);
            paramObj = paramCl.get();
            params = params.concat(paramObj);
        });
        return params;
    } catch (error) {
        console.log(error);
    } */
  return _.reduce(parameters, (acc, param) => {
    const Paramter = new ParamCl(param);
    return acc.concat(Paramter.get());
  }, []);
}

operation.prototype.getResponseParams = function () {
  return getParameters(op.responses);
};

operation.prototype.getErrorCodes = () => _.reduce(_.keys(op.responses), (acc, error_code) => {
  if (error_code != 200) {
    acc.push({
      code: error_code,
      message: _.get(op.responses, [error_code, 'description'], 'something went wrong.'),
    });
  }
  return acc;
}, []);

export default operation;
