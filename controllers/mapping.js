/* eslint-disable import/extensions */

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import mappingModel from '../datamodels/mappingSchema.js';
import { logger } from '../logger/winston.js';

// const { v4: uuidv4 } = uuid;

export const create_mappings = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }

  const apiReq = {
    adapterId: req.params.adapterId,
    apiDefinitionId: req.params.apiDefinitionId,
    mappingId: uuidv4(),
    sourceAPI: req.body.sourceAPI,
    targetAPI: req.body.targetAPI,
    sourceOperationId: req.body.sourceOperationId
  };
  try {
    const mappingDoc = new mappingModel(apiReq);
    mappingDoc.save((err, response) => {
      if (err) {
        throw err;
      }
      return res.send(response);
    });
  } catch (err) {
    logger.error(err.message);
    return res.json({ msg: `Exception occurred while creating mapping:- ${err}` });
  }
};

export const update_mappings = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }
  const { adapterId, apiDefinitionId, mappingId } = req.params;
  const query = { adapterId, apiDefinitionId, mappingId };
  //TODO: validate adapterId and apiDefinitionId
  const apiReq = {
    adapterId,
    apiDefinitionId,
    mappingId,
    sourceAPI: req.body.sourceAPI,
    targetAPI: req.body.targetAPI,
    sourceOperationId: req.body.sourceOperationId
  };
  try {
    mappingModel.findOneAndUpdate(query,
      { $set: apiReq },
      { useFindAndModify: false, new: true },
      (err, response) => {
        if (err) {
          throw err;
        }
        res.send(response);
      });
  } catch (err) {
    logger.error(err.message);
    res.json({ msg: `Exception occurred while updating mapping:- ${err}` });
  }
};

export const delete_mappings = async (req, res) => {
  // TODO: validate adapterId and apiDefinitionId
  const { adapterId, apiDefinitionId, mappingId } = req.params;
  const query = { adapterId, apiDefinitionId, mappingId };
  try {
    mappingModel.findOneAndRemove(query, { useFindAndModify: false }, (err) => {
      if (err) {
        throw err;
      }
      res.send({ msg: 'Mapping configuration deleted successfully.' });
    });
  } catch (err) {
    res.send({ err: `Exception occurred while delete mapping:- ${err}` });
  }
};
