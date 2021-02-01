import _ from 'lodash';
import mergeAllOf from 'json-schema-merge-allof';

let paramSchema;

function parameter(paramObj) {
  paramSchema = paramObj;
}

function getParamTemplate(property, isRequired, type, paramIn, format, pattern, defaultVal, enumVal) {
  if (property) {
    const param = {
      format,
      pattern,
      type,
      title: property,
      required: isRequired,
      in: paramIn,
      default: defaultVal,
      enum: enumVal,
    };
    return param;
  } return null;
}

parameter.prototype.get = function () {
  // FIXME Please check  paramObj variable once
  let params = [];
  let paramObj = (paramSchema && paramSchema.content) ? paramSchema.content[Object.keys(paramSchema.content)].schema
    : (paramSchema[Object.keys(paramSchema)]) ? paramSchema[Object.keys(paramSchema)].schema : (paramSchema.schema) ? paramSchema.schema : paramSchema;

  if (paramObj) {
    paramObj = mergeAllOf(paramObj);
  }

  if (paramObj && (_isObject(paramObj) || _isArray(paramObj) || paramObj.properties)) {
    let propObj = getPropertiesObj(paramObj);
    Object.keys(propObj).forEach((property) => {
      let type = (propObj[property].schema) ? propObj[property].schema.type : propObj[property].type;
      let inParam = (paramSchema.in) ? paramSchema.in : 'body';
      let param = getParamTemplate(property, paramSchema.required, type, inParam, paramSchema.format, paramSchema.pattern, paramSchema.default, paramSchema.enum);
      if (param) {
        param = setObjProperties(param, propObj[property]);
        params.push(param);
      }
    });
  } else {
    let type = (paramSchema.schema) ? paramSchema.schema.type : paramSchema.type;
    let inParam = (paramSchema.in) ? paramSchema.in : 'body';
    let param = getParamTemplate(paramSchema.name, paramSchema.required, type, inParam, paramSchema.format, paramSchema.pattern, paramSchema.default, paramSchema.enum);

    if (param) {
      params.push(param);
    }
  }

  return params;
};
function setObjProperties(paramObj, propObject) {
  if (propObject.type === 'object' && propObject.properties) {
    paramObj.properties = processObject(propObject.properties);
  }

  if (propObject.type === 'array' && propObject.items && propObject.items.type === 'object' && propObject.items.properties) {
    paramObj.items = processObject(propObject.items.properties);
  }
  return paramObj;
}

function getPropertiesObj(schemaObj) {
  return _isObject(schemaObj) ? schemaObj.properties : (schemaObj.items) ? schemaObj.items.properties : (schemaObj.properties);
}

function _isObject(schema) {
  /* if (schema.type === 'object' && schema.properties) {
    return true;
  }
  return false;
  */
  return schema.type === 'object' && schema.properties;
}

function _isArray(schema) {
  /*
  if (schema.type === 'array' && schema.items && schema.items.type === 'object') {
    return true;
  }
  return false;
  */
  return schema.type === 'array' && schema.items && schema.items.type === 'object';
}

function processObject(propertyObject) {
  /* let propArray = [];
  let objectKeys = Object.keys(propertyObject);
  _.each(objectKeys, function (key) {
    let obj = {};
    obj.title = key;
    obj.type = propertyObject[key].type;
    propArray.push(obj);
  });
  return propArray; */
  return _.reduce(_.keys(propertyObject), (acc, key) => {
    acc.push({
      title: key,
      type: propertyObject[key].type,
    });
    return acc;
  }, []);
}

export default parameter;
