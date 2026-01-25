// User roles
export enum UserRole {
  VISITOR = 'visitor',
  STAFF = 'staff',
  ADMIN = 'admin',
}

// Booking statuses
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

// Payment statuses
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Payment methods
export enum PaymentMethod {
  CARD = 'card',
  MOBILE_MONEY = 'mobile_money',
  CASH = 'cash',
}

// Payment gateways
export enum PaymentGateway {
  DPO_PAYGATE = 'dpo_paygate',
  PAYFAST = 'payfast',
  ORANGE_MONEY = 'orange_money',
}

// Animal categories
export enum AnimalCategory {
  MAMMAL = 'mammal',
  BIRD = 'bird',
  REPTILE = 'reptile',
  AMPHIBIAN = 'amphibian',
}

// Conservation status
export enum ConservationStatus {
  LEAST_CONCERN = 'least_concern',
  NEAR_THREATENED = 'near_threatened',
  VULNERABLE = 'vulnerable',
  ENDANGERED = 'endangered',
  CRITICALLY_ENDANGERED = 'critically_endangered',
  EXTINCT_IN_WILD = 'extinct_in_wild',
  EXTINCT = 'extinct',
}

// Diet types
export enum DietType {
  HERBIVORE = 'herbivore',
  CARNIVORE = 'carnivore',
  OMNIVORE = 'omnivore',
}

// POI types
export enum POIType {
  GATE = 'gate',
  VIEWPOINT = 'viewpoint',
  PICNIC_AREA = 'picnic_area',
  WATERING_HOLE = 'watering_hole',
  BIRD_HIDE = 'bird_hide',
  RESTROOM = 'restroom',
}

// Media types
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

// Notification types
export enum NotificationType {
  BOOKING_CONFIRMED = 'booking_confirmed',
  PAYMENT_RECEIVED = 'payment_received',
  BOOKING_REMINDER = 'booking_reminder',
  BOOKING_CANCELLED = 'booking_cancelled',
  PAYMENT_FAILED = 'payment_failed',
}

// Currency
export const CURRENCY = 'BWP'; // Botswana Pula

// Activity types (default pricing - stored in DB)
export const ACTIVITY_TYPES = {
  GAME_VIEWING: {
    name: 'Game Viewing',
    pricePerPerson: 10.0,
    pricePerVehicle: 10.0,
  },
  PICNIC_BRAAI: {
    name: 'Picnic/Braai & Game Viewing',
    pricePerPerson: 15.0,
    pricePerVehicle: 10.0,
  },
};

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

// File upload limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

// Booking reference prefix
export const BOOKING_REFERENCE_PREFIX = 'GGR';

// Date/time formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// Business hours
export const BUSINESS_HOURS = {
  OPENING_TIME: '06:00',
  CLOSING_TIME: '18:00',
};

// Booking constraints
export const MIN_VISITORS = 1;
export const MAX_VISITORS = 50;
export const MIN_VEHICLES = 1;
export const MAX_VEHICLES = 20;
export const MIN_ADVANCE_BOOKING_DAYS = 0; // Same day booking allowed
export const MAX_ADVANCE_BOOKING_DAYS = 90;

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  PHONE_EXISTS: 'Phone number already exists',
  BOOKING_NOT_FOUND: 'Booking not found',
  PAYMENT_FAILED: 'Payment processing failed',
  INVALID_DATE: 'Invalid date or time',
  BOOKING_LIMIT_EXCEEDED: 'Booking limit exceeded for this date',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  BOOKING_CREATED: 'Booking created successfully',
  BOOKING_UPDATED: 'Booking updated successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
};
