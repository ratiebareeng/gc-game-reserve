import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import bookingRoutes from '../modules/bookings/booking.routes';
import activityTypeRoutes from '../modules/activity-types/activity-type.routes';
import animalRoutes from '../modules/animals/animal.routes';
import poiRoutes from '../modules/poi/poi.routes';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/activity-types', activityTypeRoutes);
router.use('/animals', animalRoutes);
router.use('/poi', poiRoutes);

// Future routes will be added here:
// router.use('/payments', paymentRoutes);
// router.use('/notifications', notificationRoutes);

export default router;
