/* eslint-disable import/extensions */
import axios from 'axios';
import path from 'path';
import yaml from 'js-yaml';
import document from './parser/document.js';

export default async (req, res) => {
  const url = req.body.fileURL;
  const extn = path.extname(url).substr(1);
  axios({
    method: 'get',
    url: `${url}`,
  }).then(async (response) => {
    let { data } = response;
    data = parse(data, extn);
    const doc = new document(data);
    return doc.getMetaInfo(false, false);
  }).then((result) => {
    res.send(result);
  })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

/*
function parse(spec, extn) {
  let parsedData = {};
  if (extn === 'yaml') {
    parsedData = parseYaml(spec);
  }
  else {
    parsedData = parseJSON(spec);
  }
  return parsedData;
}
*/

const parse = (spec, extn) => (extn === 'yaml' ? parseYaml(spec) : parseJSON(spec));

const parseYaml = (spec) => {
  try {
    const obj = yaml.safeLoad(spec);
    if (typeof obj !== 'object') {
      res.err('Specification is not a valid YAML.');
    }
    return obj;
  } catch (yamlException) {
    throw new Error(`Specification is not a valid YAML. ${yamlException}`);
  }
};

const parseJSON = (spec) => spec;
