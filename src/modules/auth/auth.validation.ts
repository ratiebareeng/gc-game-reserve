import { body, ValidationChain } from 'express-validator';

export class AuthValidation {
  static register(): ValidationChain[] {
    return [
      body('email')
        .trim()
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
      body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
      body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 100 })
        .withMessage('First name must not exceed 100 characters'),
      body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 100 })
        .withMessage('Last name must not exceed 100 characters'),
      body('phone_number')
        .optional()
        .trim()
        .matches(/^(\+267|267)?[0-9]{8}$/)
        .withMessage('Invalid phone number format'),
    ];
  }

  static login(): ValidationChain[] {
    return [
      body('email')
        .trim()
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
      body('password').notEmpty().withMessage('Password is required'),
    ];
  }

  static refreshToken(): ValidationChain[] {
    return [
      body('refreshToken').notEmpty().withMessage('Refresh token is required'),
    ];
  }
}
