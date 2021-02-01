/* eslint-disable import/extensions */
import _ from 'lodash';
import adapter_model from '../datamodels/adapterSchema.js';
import mapping_model from '../datamodels/mappingSchema.js';
import api_definition_model from '../datamodels/apiDefSchema.js';
import { logger } from '../logger/winston.js';

export default async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'adapterId is required' });
  }

  _.each(req.body, (obj, ind) => {
    const fetch_query = { $and: [{ adapterId: obj.adapterId }, { status: 'in development' }] };
    const delete_query = { $and: [{ adapterId: obj.adapterId }, { status: 'published' }] };

    Promise.all([adapter_model.findOne(fetch_query),
      api_definition_model.findOne(fetch_query),
      mapping_model.findOne(fetch_query),
      adapter_model.deleteOne(delete_query),
      api_definition_model.deleteOne(delete_query),
      mapping_model.deleteOne(delete_query)])
      .then(async (result) => {
        const [adapter, api_defs, mappings] = result;

        if (!_.isEmpty(adapter) && !_.isEmpty(api_defs) && !_.isEmpty(mappings)) {
          // updating adapter
          adapter.status = 'published';
          adapter.lastUpdated = new Date();
          adapter.version = adapter.version ? _.round(adapter.version + 0.1, 1) : 1.0;
          await adapter.save();

          // updating apiDefinition
          api_defs.status = 'published';
          api_defs.lastUpdated = new Date();
          api_defs.version = api_defs.version ? _.round(api_defs.version + 0.1, 1) : 1.0;
          await api_defs.save();

          // updating mappings
          mappings.status = 'published';
          mappings.lastUpdated = new Date();
          mappings.version = mappings.version ? _.round(mappings.version + 0.1, 1) : 1.0;
          await mappings.save();

          if (req.body.length === ind + 1) {
            logger.info('adapter has been successfully published.');
            return res.status(200).json({ msg: 'adapter has been successfully published.' });
          }
        } else {
          logger.info(`adapter id ${obj.adapterId} is incorrect.`);
          return res.status(200).json({ msg: `adapter id ${obj.adapterId} is incorrect.` });
        }
      })
      .catch((err) => {
        logger.error(err.message);
        return res.status(400).json({ err: err.message });
      });
  });
};
