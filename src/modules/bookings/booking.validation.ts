import { body, query, ValidationChain } from "express-validator";
import {
  MAX_VEHICLES,
  MAX_VISITORS,
  MIN_VEHICLES,
  MIN_VISITORS,
} from "../../config/constants";

export class BookingValidation {
  static createBooking(): ValidationChain[] {
    return [
      body("visit_date")
        .notEmpty()
        .withMessage("Visit date is required")
        .isDate()
        .withMessage("Invalid date format (use YYYY-MM-DD)"),
      body("visit_time")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Invalid time format (use HH:mm)"),
      body("activity_type_id")
        .isInt({ min: 1 })
        .withMessage("Valid activity type ID is required"),
      body("number_of_visitors")
        .isInt({ min: MIN_VISITORS, max: MAX_VISITORS })
        .withMessage(
          `Number of visitors must be between ${MIN_VISITORS} and ${MAX_VISITORS}`,
        ),
      body("number_of_vehicles")
        .isInt({ min: MIN_VEHICLES, max: MAX_VEHICLES })
        .withMessage(
          `Number of vehicles must be between ${MIN_VEHICLES} and ${MAX_VEHICLES}`,
        ),
      body("contact_name")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage("Contact name must not exceed 200 characters"),
      body("contact_email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),
      // body('contact_phone')
      //   .optional()
      //   .trim()
      //   .matches(/^(\+267|267)?[0-9]{8}$/)
      //   .withMessage('Invalid phone number format'),
      // body('special_requests')
      //   .optional()
      //   .trim()
      //   .isLength({ max: 1000 })
      //   .withMessage('Special requests must not exceed 1000 characters'),
    ];
  }

  static checkAvailability(): ValidationChain[] {
    return [
      query("date")
        .notEmpty()
        .withMessage("Date query parameter is required")
        .isDate()
        .withMessage("Invalid date format (use YYYY-MM-DD)"),
    ];
  }
}
