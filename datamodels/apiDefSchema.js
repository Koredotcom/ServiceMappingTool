import mongoose from 'mongoose';

const { Schema } = mongoose;

const apiDefinition = new Schema({
  adapterId: String,
  apiDefinitionId: String,
  sourceOperationId: String,
  sourceAPI: {
    category: String,
    operationId: String,
    method: String,
    path: String,
  },
  content: [{
    name: String,
    schemaId: String,
    operationId: String,
    sequenceId: String,
    dependsOn: [],
    endPoint: {
      host: String,
      port: String,
      path: String,
      protocol: String,
      'content-type': String,
      method: String,
    },
    headerParams: [{
      title: String,
      required: { type: String },
      type: { type: String },
      in: String,
      value: String,
      description: String,
    }],
    requestParams: [{
      title: String,
      required: { type: String },
      type: { type: String },
      in: String,
      value: String,
    }],
    responseParams: [{
      title: String,
      type: { type: String },
      properties: [{
        title: String,
        type: { type: String },
      },
      {
        title: String,
        type: { type: String },
      }],
    }],
    hostProfiles: [{
      name: String,
      type: { type: String },
      url: String,
      authentication: {
        type: { type: String },
      },
      host: String,
      security: [{ type: { type: String } },
      ],
    },
    ],
    errorCodes: { type: Array, default: [] },
  },
  ],
  status: { type: String, default: 'in development' },
  lastUpdated: { type: Date, default: new Date() },
  version: { type: Number, default: 1.0 },
});

export default mongoose.model('apiDefinition', apiDefinition);
