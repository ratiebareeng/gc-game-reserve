import { Router } from 'express';
import { AnimalController } from './animal.controller';

const router = Router();
const controller = new AnimalController();

/**
 * @route GET /api/v1/animals
 * @desc Get all animals with optional category filter
 * @access Public
 */
router.get('/', controller.getAllAnimals);

/**
 * @route GET /api/v1/animals/featured
 * @desc Get featured animals
 * @access Public
 */
router.get('/featured', controller.getFeaturedAnimals);

/**
 * @route GET /api/v1/animals/search
 * @desc Search animals by name
 * @access Public
 */
router.get('/search', controller.searchAnimals);

/**
 * @route GET /api/v1/animals/:id
 * @desc Get animal by ID
 * @access Public
 */
router.get('/:id', controller.getAnimalById);

export default router;
