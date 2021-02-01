/* eslint-disable import/extensions */
import _ from 'lodash';
import adapter_model from '../datamodels/adapterSchema.js';
import mapping_model from '../datamodels/mappingSchema.js';
import api_definition_model from '../datamodels/apiDefSchema.js';
import { logger } from '../logger/winston.js';

export default async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'adapterId is required.' });
  }

  const query = { adapterId: req.body.adapterId };
  const exclude_me = { _id: 0 };

  Promise.all([
    adapter_model.findOne(query, exclude_me),
    api_definition_model.findOne(query, exclude_me),
    mapping_model.findOne(query, exclude_me)])
    .then((result) => {
      const [adapter, api_defs, mapping] = result;

      if (!_.isEmpty(adapter) && !_.isEmpty(api_defs) && !_.isEmpty(mapping)) {
        adapter.status = 'in development';
        api_defs.status = 'in development';
        mapping.status = 'in development';

        adapter.lastUpdated = new Date();
        api_defs.lastUpdated = new Date();
        mapping.lastUpdated = new Date();

        adapter.version = adapter.version ? _.round(adapter.version + 0.1, 1) : 1.0;
        api_defs.version = api_defs.version ? _.round(api_defs.version + 0.1, 1) : 1.0;
        mapping.version = mapping.version ? _.round(mapping.version + 0.1, 1) : 1.0;

        const new_adapter_copy = new adapter_model(adapter.toObject());
        const new_api_defs_copy = new api_definition_model(api_defs.toObject());
        const new_mapping_copy = new mapping_model(mapping.toObject());

        Promise.all([new_adapter_copy.save(), new_api_defs_copy.save(), new_mapping_copy.save()])
          .then((result) => res.status(200).json({ msg: 'adapter is set to in development.' }))
          .catch((err) => {
            logger.error(err.message);
            return res.status(400).json({ err: err.message });
          });
      } else {
        logger.warn('adapterId is incorrect.');
        return res.status(200).json({ err: 'adapterId is incorrect.' });
      }
    })
    .catch((err) => {
      logger.error(err.message);
      return res.status(400).json({ err: err.message });
    });
};
