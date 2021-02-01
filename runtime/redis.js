/* eslint-disable import/extensions */
import redis from 'redis';
import { readFile } from 'fs/promises';
import { config as config_env } from 'dotenv';
import api_definition_model from '../datamodels/apiDefSchema.js';
import api_mapping_model from '../datamodels/mappingSchema.js';
import { logger } from '../logger/winston.js';

config_env();
const config = JSON.parse(await readFile(new URL('../config/config.json', import.meta.url)));

const redis_client = redis.createClient();

if (process.env.node_env === 'production') {
    redis_client.auth('kore123', (err, ok) => {
        if (err) {
            throw err;
        }
        logger.info('redis is running.');
    });
}

export const cache_me = (key, data) => {
    const expiry_time = config.redis.expiryTime;
    redis_client.setex(key, expiry_time, JSON.stringify(data));
};

export const fetch_configuration = (key, query, callback) => {
    redis_client.get(key, (err, result) => {
        if (err) {
            logger.error(`error occurred while fetching config from redis:- ${err.message}`);
            throw err;
        }
        if (result) {
            logger.info('fetching configuration from redis.');
            callback(null, JSON.parse(result));
        } else {
            logger.info('no configuration found in redis. querying db.');
            logger.info(`query:- ${JSON.stringify(query)}`);
            Promise.all([
                api_definition_model.findOne(query),
                api_mapping_model.findOne(query),
            ])
                .then(async ([api_defs, mapping]) => {
                    let data = JSON.parse(JSON.stringify(api_defs));
                    data.mappings = mapping;
                    cache_me(key, data);
                    callback(null, data);
                })
                .catch((err) => {
                    logger.error(err.message);
                    callback({ message: err.message }, null);
                });
        }
    });
};
