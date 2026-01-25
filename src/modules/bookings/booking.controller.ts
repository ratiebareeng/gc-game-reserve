import { Request, Response } from 'express';
import { BookingService } from './booking.service';
import { ResponseUtil } from '../../utils/response';
import { asyncHandler } from '../../middleware/error.middleware';
import { SUCCESS_MESSAGES, DEFAULT_PAGE, DEFAULT_LIMIT } from '../../config/constants';

export class BookingController {
  private bookingService = new BookingService();

  /**
   * Create a new booking
   * POST /bookings
   */
  createBooking = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const booking = await this.bookingService.createBooking(userId, req.body);

    return ResponseUtil.created(
      res,
      booking,
      SUCCESS_MESSAGES.BOOKING_CREATED
    );
  });

  /**
   * Get booking by ID
   * GET /bookings/:id
   */
  getBooking = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const booking = await this.bookingService.getBookingById(id);

    return ResponseUtil.success(res, booking);
  });

  /**
   * Get user's bookings
   * GET /bookings
   */
  getUserBookings = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const bookings = await this.bookingService.getUserBookings(req.user.userId);

    return ResponseUtil.success(res, bookings);
  });

  /**
   * Cancel a booking
   * DELETE /bookings/:id
   */
  cancelBooking = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const { id } = req.params;
    const booking = await this.bookingService.cancelBooking(id, req.user.userId);

    return ResponseUtil.success(
      res,
      booking,
      SUCCESS_MESSAGES.BOOKING_CANCELLED
    );
  });

  /**
   * Get all bookings (admin/staff only)
   * GET /admin/bookings
   */
  getAllBookings = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;

    const { bookings, total } = await this.bookingService.getAllBookings(
      page,
      limit
    );

    return ResponseUtil.paginated(res, bookings, page, limit, total);
  });

  /**
   * Check availability for a date
   * GET /bookings/availability?date=YYYY-MM-DD
   */
  checkAvailability = asyncHandler(async (req: Request, res: Response) => {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return ResponseUtil.badRequest(res, 'Date query parameter is required');
    }

    const availability = await this.bookingService.checkAvailability(date);

    return ResponseUtil.success(res, availability);
  });
}
