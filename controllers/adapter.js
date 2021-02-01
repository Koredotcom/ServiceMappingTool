/* eslint-disable import/extensions */
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import adapterModel from '../datamodels/adapterSchema.js'
import apiDefinitionModel from '../datamodels/apiDefSchema.js';
import mappingModel from '../datamodels/mappingSchema.js';
import { logger } from '../logger/winston.js';

// const { v4: uuidv4 } = uuid;

export const getAllAdapter = async (req, res) => {
  try {
    adapterModel.find({}, (err, response) => {
      if (err) {
        logger.error(err);
        throw err;
      }
      res.status(200).send(response);
    });
  } catch (err) {
    logger.error(err.message);
    res.send({
      message: `Exception occurred while fetching the adapter definitions:- ${err}`,
    });
  }
};

export const get_adapter_and_apiDefinition_byId = async (req, res) => {
  const { adapterId } = req.params;
  const query = { adapterId };
  try {
    Promise.all([adapterModel.findOne(query), apiDefinitionModel.find(query)])
      .then(([adapterRes, apiDefsRes]) => {
        if (adapterRes && apiDefsRes) {
          let result = JSON.parse(JSON.stringify(adapterRes));
          result.apiDefinitions = apiDefsRes;
          return res.status(200).json(result);
        }
        logger.warn('adapterId is incorrect.');
        return res.status(200).json({ err: 'adapterId is incorrect.' });
      })
      .catch((err) => {
        logger.error(err.message);
        res.status(400).json({ err: err.message });
      });
  } catch (err) {
    logger.error(`Exception occurrred while fetching adapter details:- ${err.message}`);
    res.status(400).json({ err: 'something went wrong.' });
  }
};

export const createAdapter = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' })
  }

  const adapter = {
    name: req.body.name,
    displayName: req.body.displayName ? req.body.displayName : req.body.name,
    hostProfiles: req.body.hostProfiles,
    adapterId: uuidv4(),
    connectionType: req.body.connectionType,
    connectionMode: req.body.connectionMode,
    variables: req.body.variables
  };

  try {
    const adapterRes = new adapterModel(adapter);
    adapterRes.save((err, response) => {
      if (err) {
        throw err;
      }
      logger.info('adapter has been created.');
      return res.status(200).json(response);
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(400).json({ msg: `Exception occurred while creating adapter :- ${err}` });
  }
};

export const updateAdapter = async (req, res) => {
  const { adapterId } = req.params;
  const query = { adapterId };
  const adapter = {
    adapterId,
    name: req.body.name,
    displayName: req.body.displayName ? req.body.displayName : req.body.name,
    status: req.body.status ? req.body.status : 'in development',
    lastUpdated: new Date(),
    hostProfiles: req.body.hostProfiles,
    connectionType: req.body.connectionType,
    connectionMode: req.body.connectionMode,
    variables: req.body.variables
  };
  try {
    adapterModel.findOneAndUpdate(query, adapter, { upsert: false }, () => {
      logger.info('adapter has been updated succesfully.');
      res.status(200).json({ msg: 'Adapter updated successfully.' });
    });
  } catch (exception) {
    console.log(exception);
    res.json({ err: `Exception occurred while updating adapter definition: ${adapterId}: ${exception}` });
  }
};

export const deleteAdapter = async (req, res) => {
  const { adapterId } = req.params;
  const query = { adapterId };
  try {
    let models = [];
    models.push(adapterModel);
    models.push(apiDefinitionModel);
    models.push(mappingModel);
    models.map(async (model) => {
      await model.deleteMany(query, (err) => {
        return err;
      });
    });
    logger.info(`${adapterId} adapter has been deleted successfully.`);
    res.status(200).send({ msg: 'Adapter definition deleted successfully.' });
  } catch (err) {
    logger.error(err.message);
    res.send({ err: `Exception occurred while delete adapter definition.${err}` });
  }
};
