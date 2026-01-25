import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import bookingRoutes from '../modules/bookings/booking.routes';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);

// Future routes will be added here:
// router.use('/animals', animalRoutes);
// router.use('/poi', poiRoutes);
// router.use('/payments', paymentRoutes);
// router.use('/notifications', notificationRoutes);

export default router;
