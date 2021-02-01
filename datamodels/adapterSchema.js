import mongoose from 'mongoose';

const { Schema } = mongoose;

const adapter = new Schema({
  name: String,
  displayName: String,
  adapterId: String,
  version: { type: Number, default: 1.0 },
  status: { type: String, default: 'in development' },
  lastUpdated: { type: Date, default: new Date() },
  hostProfiles: [{
    name: String,
    type: { type: String },
    url: String,
    authentication: { type: { type: String } },
    host: String,
    security: [{
      type: { type: String },
    }],
  }],
  connectionTye: String,
  connectionMode: String,
  variables: [{
    title: String,
    in: String,
    value: String,
    required: String,
    description: String,
  }],
});

export default mongoose.model('adapter', adapter);
