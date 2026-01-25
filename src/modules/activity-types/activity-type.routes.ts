import { Router } from 'express';
import { ActivityTypeController } from './activity-type.controller';

const router = Router();
const controller = new ActivityTypeController();

/**
 * @route GET /api/v1/activity-types
 * @desc Get all activity types
 * @access Public
 */
router.get('/', controller.getAllActivityTypes);

/**
 * @route GET /api/v1/activity-types/:id
 * @desc Get activity type by ID
 * @access Public
 */
router.get('/:id', controller.getActivityTypeById);

export default router;
