import { Router, Request, Response, NextFunction } from 'express';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import { handleValidationErrors } from '../../middleware/validation.middleware';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();
const bookingController = new BookingController();

/**
 * GET /bookings/availability
 * Check availability for a date (public)
 */
router.get(
  '/availability',
  BookingValidation.checkAvailability(),
  handleValidationErrors,
  bookingController.checkAvailability
);

/**
 * POST /bookings
 * Create a new booking (optional auth - guests can book)
 */
router.post(
  '/',
  // Make authentication optional for guest bookings
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      return authenticateToken(req, res, next);
    }
    next();
  },
  BookingValidation.createBooking(),
  handleValidationErrors,
  bookingController.createBooking
);

/**
 * GET /bookings
 * Get user's bookings (requires auth)
 */
router.get('/', authenticateToken, bookingController.getUserBookings);

/**
 * GET /bookings/:id
 * Get booking by ID (requires auth)
 */
router.get('/:id', authenticateToken, bookingController.getBooking);

/**
 * DELETE /bookings/:id
 * Cancel a booking (requires auth)
 */
router.delete('/:id', authenticateToken, bookingController.cancelBooking);

export default router;
