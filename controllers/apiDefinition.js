/* eslint-disable import/extensions */
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import apiDefinitionModel from '../datamodels/apiDefSchema.js';
import mappingModel from '../datamodels/mappingSchema.js';
import { logger } from '../logger/winston.js';

// const { v4: uuidv4 } = uuid;

export const createApiDefinition = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }

  const { adapterId } = req.params;
  _.each(req.body.content, (target) => {
    target.schemaId = uuidv4();
  });

  const apiDefinition = {
    adapterId,
    apiDefinitionId: uuidv4(),
    sourceOperationId: req.body.sourceOperationId,
    sourceAPI: req.body.sourceAPI,
    content: req.body.content,
  };
  try {
    const apiResDoc = new apiDefinitionModel(apiDefinition);
    apiResDoc.save((err, response) => {
      if (err) {
        throw err;
      }
      logger.info('apiDefinition has been created.');
      res.status(200).send(response);
    });
  } catch (err) {
    logger.error(err.message);
    res.send({ err: `Exception occurred while creating api definition.${err}` });
  }
};

export const get_apiDefinition_and_mapping_byId = async (req, res) => {
  const { adapterId, apiDefinitionId } = req.params;
  const query = { apiDefinitionId, adapterId };
  try {
    Promise.all([
      apiDefinitionModel.findOne(query),
      mappingModel.findOne(query),
    ])
      .then(([apiDefRes, mappingsRes]) => {
        const result = JSON.parse(JSON.stringify(apiDefRes));
        if (!result) {
          return res.json({});
        }
        result.mappings = mappingsRes;
        return res.json(result);
      })
      .catch((err) => {
        logger.error(err.message);
        res.send({
          message: `Exception occurred while fetching adapter details:- ${err}`,
        });
      });
  } catch (err) {
    logger.error(err.message);
    console.log({
      message: `Exception occurred while fetching adapter details:- ${err}`,
    });
  }
};

export const update_apiDefinition = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }
  const { adapterId, apiDefinitionId } = req.params;
  const query = { apiDefinitionId, adapterId };

  // TODO: validate apiDefinitionId and adapterId
  const apiReq = {
    adapterId,
    apiDefinitionId,
    sourceOperationId: req.body.sourceOperationId,
    sourceAPI: req.body.sourceAPI,
    content: req.body.content,
  };
  try {
    apiDefinitionModel.findOneAndUpdate(query,
      { $set: apiReq },
      { useFindAndModify: false, new: true },
      (err, response) => {
        if (err) {
          throw err;
        }
        if (!response) {
          return res.status(200).send({ msg: `Could not find api definition record for specified id :- ${apiDefinitionId}` });
        }
        return res.status(200).send(response);
      });
  } catch (err) {
    logger.error(err.message);
    res.json({ msg: `Exception occurred while updating api definition: ${apiDefinitionId}: ${err}` });
  }
};

export const delete_apiDefinition = async (req, res) => {
  const { adapterId, apiDefinitionId } = req.params;
  // TODO: validate adapterId and apiDefinitionId
  const query = { adapterId, apiDefinitionId };
  try {
    const models = [];
    models.push(apiDefinitionModel);
    models.push(mappingModel);
    models.map(async (model) => {
      await model.deleteMany(query, (err) => {
        console.log('err--->', err);
        return err;
      });
    });
    res.status(200).json({ msg: 'API definition deleted successfully.' });
  } catch (err) {
    logger.info(err.message);
    res.json({ err: `Exception occurred while delete api definition:- ${err}` });
  }
};

export const get_by_operationId = async (req, res) => {
  const { adapterId, operationId: sourceOperationId } = req.params;
  // TODO: validate operationId and apiDefinitionId
  const query = { adapterId, sourceOperationId };
  try {
    Promise.all([
      apiDefinitionModel.findOne(query),
      mappingModel.findOne(query),
    ])
      .then(([adapterRes, mappingsRes]) => {
        const result = JSON.parse(JSON.stringify(adapterRes));
        if (!result) {
          return res.json({});
        }
        result.mappings = mappingsRes;
        return res.json(result);
      })
      .catch((err) => {
        logger.error(err.message);
        res.send({ msg: `Exception occurred while fetching adapter details:- ${err}` });
      });
  } catch (exception) {
    console.log({ msg: `Exception occurred while fetching adapter details:- ${exception}` });
    res.json({ err: 'something went wrong.' });
  }
};

export const get_by_sourceOperationId = async (req, res) => {
  const { operationId: sourceOperationId } = req.params;
  // TODO: validate operationId and apiDefinitionId
  const query = { sourceOperationId };
  try {
    Promise.all([
      apiDefinitionModel.findOne(query),
      mappingModel.findOne(query),
    ])
      .then(([apiDefRes, mappingsRes]) => {
        const result = JSON.parse(JSON.stringify(apiDefRes));
        if (!result) {
          return res.json({});
        }
        result.mappings = mappingsRes;
        return res.json(result);
      })
      .catch((err) => {
        res.send({ msg: `Exception occurred while fetching adapter details:- ${err}` });
      });
  } catch (exception) {
    console.log({ msg: `Exception occurred while fetching adapter details:- ${exception}` });
    res.json({ err: 'something went wrong.' });
  }
};
