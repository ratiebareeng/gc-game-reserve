import { Router } from 'express';
import { POIController } from './poi.controller';

const router = Router();
const controller = new POIController();

// GET /api/v1/poi - Get all POIs with optional type filter
router.get('/', controller.getAllPOIs);

// GET /api/v1/poi/nearby - Get POIs near a location
router.get('/nearby', controller.getNearbyPOIs);

// GET /api/v1/poi/type/:type - Get POIs by type
router.get('/type/:type', controller.getPOIsByType);

// GET /api/v1/poi/:id - Get POI by ID
router.get('/:id', controller.getPOIById);

export default router;
