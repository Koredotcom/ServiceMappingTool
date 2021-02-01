/* eslint-disable import/extensions */
import _ from 'lodash';
import standardObjModel from '../datamodels/standardObject.js';
import { logger } from '../logger/winston.js';

export default function (req, res) {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ err: 'request body is required.' });
  }

  const { category, metaInfo } = req.body;
  const solutionObj = { category, metaInfo };
  try {
    const standardModelRes = new standardObjModel(solutionObj);
    standardModelRes.save((err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  } catch (err) {
    logger.error(err.message);
    res.json({ msg: `Exception occurred while creating adapter:- ${err}` });
  }
}
