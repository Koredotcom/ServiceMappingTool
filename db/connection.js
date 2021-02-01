import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import { config as config_env } from 'dotenv';
import { logger } from '../logger/winston.js';

config_env();

const config = JSON.parse(await readFile(new URL('../config/config.json', import.meta.url)));

let mongo_url = 'mongodb://localhost:27017/smt'
//mongo_url = 'mongodb://shahanaz:shahanaz@localhost:27017/smt'

if (process.env.node_env === 'production') {
  mongo_url = `mongodb://${config.db.userName}:${encodeURIComponent(config.db.password)}@${config.db.host}:${config.db.port}/${config.db.dbname}`
}

const connect_to_db =  () => {
   mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    authSource: config.db.authSource
  });

  mongoose.connection.on('connected', () => {
    logger.info('connected to the db.')
  });

  mongoose.connection.on('error', (err) => {
    logger.error('db connection error :- ', err)
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('db is disconnected.');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('db has been disconnected due to app termination.');
      process.exit(0)
    });
  });
}

const connection = (req, res, next) => {
  logger.info(`making a ${req.method} api call on url ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  if (mongoose.connection.readyState === 0) {
    connect_to_db();
    next();
  } else {
    next();
  }
}

export default connection;