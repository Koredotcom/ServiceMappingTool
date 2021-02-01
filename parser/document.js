/* eslint-disable import/extensions */
import _ from 'lodash';
import swaggerParser from 'swagger-parser';
import operationCl from './operation.js';
import { logger } from '../logger/winston.js';

let schema = {};

function document(swaggerDoc) {
  schema = swaggerDoc;
}

document.prototype.validate = async function () {
  try {
    const api = await swaggerParser.dereference(schema);
    return api;
  } catch (err) {
    logger.error(err.message);
    return err;
  }
};

document.prototype.getMetaInfo = async function (showRootElement, showTags) {
  const data = await this.validate();
  const root = 'root';
  let operationDoc = [];
  if (showRootElement) {
    operationDoc = {};
    operationDoc[root] = {};
  }
  const { paths } = data;
  Object.keys(paths).forEach((key) => {
    Object.keys(paths[key]).forEach((opName) => {
      const operation = new operationCl(paths[key][opName]);
      const operationId = getOperationId(paths[key][opName], key, opName);
      const apiDoc = {
        name: paths[key][opName].summary,
        operationId,
        endPoint: getEndpoint(schema, opName, key),
        headerParams: operation.getHeaders(),
        requestParams: operation.getRequestParams(),
        responseParams: operation.getResponseParams(),
        errorCodes: operation.getErrorCodes(),
      };

      const { tags } = paths[key][opName];
      if (showTags && tags && tags.length > 0) {
        if (!operationDoc[root][tags[0]]) {
          operationDoc[root][tags[0]] = {};
          operationDoc[root][tags[0]][operationId] = apiDoc;
        } else {
          operationDoc[root][tags[0]][operationId] = apiDoc;
        }
      } else {
        operationDoc.push(apiDoc);
      }
    });
  });
  return operationDoc;
};

function getEndpoint(schema, opName, key) {
  const host = (schema.host) ? schema.host : (schema.servers && schema.servers.length > 0) ? schema.servers[0].url : '';
  const basePath = (schema.basePath) ? schema.basePath : '';
  const protocol = (schema.protocol) ? schema.protocol : (schema.schemes && schema.schemes.length > 0) ? schema.schemes[0] : 'https';
  const contentType = (schema.contentType) ? schema.contentType : (schema.produces && schema.produces.length > 0) ? schema.produces[0] : 'application/json';
  const port = (schema.port) ? schema.port : '';
  const endPoint = {
    host,
    port,
    protocol,
    path: basePath + key,
    'content-type': contentType,
    method: opName,
  };
  return endPoint;
}

function getOperationId(methodObj, key, opName) {
  if (methodObj.operationId) {
    return methodObj.operationId;
  }
  let operationId = '';
  const subOps = key.split('/');
  _.each(subOps, (op) => {
    operationId = `${operationId}_${op}`;
  });
  operationId = `${operationId}_${opName}`;
  return operationId;
}

export default document;
