/* eslint-disable import/extensions */
import { Router } from 'express';
import Document from './parser/document.js';
import standardObjModel from './datamodels/standardObject.js';

const router = Router();

router.get('/:category/metaInfo', async (req, res) => {
  const query = { category: req.params.category };
  try {
    standardObjModel
      .findOne(query, async (err, data) => {
        if (err) {
          throw err;
        }
        if (!data) {
          res.send({});
        }
        const doc = new Document(data.metaInfo);
        const metainfo = await doc.getMetaInfo(true, true);
        res.send(metainfo);
      });
  } catch (exception) {
    console.log(exception);
    res.send({ msg: `Exception while reading standard object information:- ${exception}` });
  }
});

export default router;
