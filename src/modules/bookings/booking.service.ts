import { AppDataSource } from '../../config/database';
import { Booking } from '../../database/entities/booking.entity';
import { ActivityType } from '../../database/entities/activity-type.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from '../../utils/errors';
import { Validators } from '../../utils/validators';
import {
  BookingStatus,
  MIN_VISITORS,
  MAX_VISITORS,
  MIN_VEHICLES,
  MAX_VEHICLES,
  MIN_ADVANCE_BOOKING_DAYS,
  MAX_ADVANCE_BOOKING_DAYS,
} from '../../config/constants';

export class BookingService {
  private bookingRepository = AppDataSource.getRepository(Booking);
  private activityTypeRepository = AppDataSource.getRepository(ActivityType);

  /**
   * Create a new booking
   */
  async createBooking(
    userId: string | undefined,
    dto: CreateBookingDto
  ): Promise<Booking> {
    // Validate activity type exists
    const activityType = await this.activityTypeRepository.findOne({
      where: { id: dto.activity_type_id, is_active: true },
    });

    if (!activityType) {
      throw new NotFoundError('Activity type not found or inactive');
    }

    // Parse and validate visit date
    const visitDate = new Date(dto.visit_date);
    if (isNaN(visitDate.getTime())) {
      throw new BadRequestError('Invalid visit date format');
    }

    // Validate date is in the future
    if (!Validators.isFutureDate(visitDate)) {
      throw new BadRequestError('Visit date must be in the future');
    }

    // Validate date is within booking range
    if (
      !Validators.isWithinBookingRange(
        visitDate,
        MIN_ADVANCE_BOOKING_DAYS,
        MAX_ADVANCE_BOOKING_DAYS
      )
    ) {
      throw new BadRequestError(
        `Bookings must be made between ${MIN_ADVANCE_BOOKING_DAYS} and ${MAX_ADVANCE_BOOKING_DAYS} days in advance`
      );
    }

    // Validate visitor count
    if (
      dto.number_of_visitors < MIN_VISITORS ||
      dto.number_of_visitors > MAX_VISITORS
    ) {
      throw new BadRequestError(
        `Number of visitors must be between ${MIN_VISITORS} and ${MAX_VISITORS}`
      );
    }

    // Validate vehicle count
    if (
      dto.number_of_vehicles < MIN_VEHICLES ||
      dto.number_of_vehicles > MAX_VEHICLES
    ) {
      throw new BadRequestError(
        `Number of vehicles must be between ${MIN_VEHICLES} and ${MAX_VEHICLES}`
      );
    }

    // Calculate fees
    const visitorFee =
      dto.number_of_visitors * Number(activityType.price_per_person);
    const vehicleFee =
      dto.number_of_vehicles * Number(activityType.price_per_vehicle);
    const totalAmount = visitorFee + vehicleFee;

    // Create booking
    const booking = this.bookingRepository.create({
      user_id: userId,
      visit_date: visitDate,
      visit_time: dto.visit_time,
      activity_type_id: dto.activity_type_id,
      number_of_visitors: dto.number_of_visitors,
      number_of_vehicles: dto.number_of_vehicles,
      visitor_fee: visitorFee,
      vehicle_fee: vehicleFee,
      total_amount: totalAmount,
      contact_name: dto.contact_name,
      contact_email: dto.contact_email,
      contact_phone: dto.contact_phone,
      special_requests: dto.special_requests,
      status: BookingStatus.PENDING,
    });

    await this.bookingRepository.save(booking);

    // Load relations for response
    return this.getBookingById(booking.id);
  }

  /**
   * Get booking by ID
   */
  async getBookingById(bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['activity_type', 'user'],
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    return booking;
  }

  /**
   * Get user's bookings
   */
  async getUserBookings(userId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user_id: userId },
      relations: ['activity_type'],
      order: { visit_date: 'DESC', created_at: 'DESC' },
    });
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string, userId: string): Promise<Booking> {
    const booking = await this.getBookingById(bookingId);

    // Check ownership
    if (booking.user_id !== userId) {
      throw new ForbiddenError('You do not have permission to cancel this booking');
    }

    // Check if booking is cancellable
    if (!booking.isCancellable()) {
      throw new BadRequestError('This booking cannot be cancelled');
    }

    // Check if booking is in the future
    if (!booking.isFutureBooking()) {
      throw new BadRequestError('Cannot cancel past bookings');
    }

    // Update status
    booking.status = BookingStatus.CANCELLED;
    await this.bookingRepository.save(booking);

    return booking;
  }

  /**
   * Get all bookings (admin/staff only)
   */
  async getAllBookings(
    page: number = 1,
    limit: number = 20
  ): Promise<{ bookings: Booking[]; total: number }> {
    const [bookings, total] = await this.bookingRepository.findAndCount({
      relations: ['activity_type', 'user'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { bookings, total };
  }

  /**
   * Check availability for a date
   */
  async checkAvailability(date: string): Promise<{ available: boolean }> {
    // This is a simplified version - you could add capacity limits here
    const visitDate = new Date(date);

    if (isNaN(visitDate.getTime())) {
      throw new BadRequestError('Invalid date format');
    }

    // For now, all future dates are available
    // In a real system, you'd check against capacity limits
    return { available: Validators.isFutureDate(visitDate) };
  }
}
