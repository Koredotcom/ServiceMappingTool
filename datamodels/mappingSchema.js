import mongoose from 'mongoose';

const { Schema } = mongoose;

const mappings = new Schema({
  adapterId: String,
  apiDefinitionId: String,
  mappingId: String,
  sourceOperationId: String,
  targetAPI: [{
    schemaId: String,
    operationId: String,
    path: String,
    headerParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
    requestParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
    responseParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
  }],
  sourceAPI: {
    category: String,
    operationId: String,
    method: String,
    path: String,
    responseParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
    headerParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
    requestParams: [{
      key: String,
      type: { type: String },
      value: String,
      targetApiIndex: String,
    }],
  },
  status: { type: String, default: 'in development' },
  lastUpdated: { type: Date, default: new Date() },
  version: { type: Number, default: 1.0 },
});

export default mongoose.model('mappings', mappings);
