/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  getAllAdapter,
  get_adapter_and_apiDefinition_byId,
  createAdapter,
  updateAdapter,
  deleteAdapter,
} from './controllers/adapter.js';

import {
  createApiDefinition,
  delete_apiDefinition,
  get_apiDefinition_and_mapping_byId,
  get_by_operationId,
  get_by_sourceOperationId,
  update_apiDefinition,
} from './controllers/apiDefinition.js';

import { create_mappings, delete_mappings, update_mappings } from './controllers/mapping.js';
import handle_publish from './controllers/publish.js';
import handle_upgrade from './controllers/upgrade.js';

const router = Router();

// adapter
router.get('/adapterDefinition', getAllAdapter);

router.get('/adapterDefinition/:adapterId', get_adapter_and_apiDefinition_byId);

router.post('/adapterDefinition', createAdapter);

router.put('/adapterDefinition/:adapterId', updateAdapter);

router.delete('/adapterDefinition/:adapterId', deleteAdapter);

// api definition
router.post('/adapterDefinition/:adapterId/apiDefinition', createApiDefinition);

router.get('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId', get_apiDefinition_and_mapping_byId);

router.put('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId', update_apiDefinition);

router.delete('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId', delete_apiDefinition);

router.get('/adapterDefinition/:adapterId/operation/:operationId', get_by_operationId);

router.get('/apiDefinition/operation/:operationId', get_by_sourceOperationId);

// mapping
router.post('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId/mapping', create_mappings);

router.put('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId/mapping/:mappingId', update_mappings);

router.delete('/adapterDefinition/:adapterId/apiDefinition/:apiDefinitionId/mapping/:mappingId', delete_mappings);

router.post('/publish', handle_publish);

router.post('/upgrade', handle_upgrade);

export default router;
