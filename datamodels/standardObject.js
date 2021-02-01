import mongoose from 'mongoose';

const { Schema } = mongoose;

const standardObject = new Schema({
  category: String,
  metaInfo: Object,
});

export default mongoose.model('standardObject', standardObject);
