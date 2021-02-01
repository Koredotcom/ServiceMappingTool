/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
// import mustache from 'mustache';
import { config } from 'dotenv';
import standardObject from './standardObject.js';
import importSchema from './import.js';
import smtrouter from './router.js';
import init from './db/init.js';
// import executer from './runtime/executer.js';
import executer from './runtime/executer2.js';
import connection from './db/connection.js';


config();

const port = process.env.port || 8032;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000,
  }),
);
app.use(
  bodyParser.json({ limit: '100mb', extended: true, parameterLimit: 100000 }),
);

app.use(connection);
app.use('/smt/standard-objects', standardObject);
app.use('/smt/import', importSchema);
app.post('/smt/execute', executer);
app.use('/smt', smtrouter);
app.post('/smt/saveMetadata', init);

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
