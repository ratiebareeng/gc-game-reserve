import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { handleValidationErrors } from '../../middleware/validation.middleware';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

/**
 * POST /auth/register
 * Register a new user
 */
router.post(
  '/register',
  AuthValidation.register(),
  handleValidationErrors,
  authController.register
);

/**
 * POST /auth/login
 * Login user
 */
router.post(
  '/login',
  AuthValidation.login(),
  handleValidationErrors,
  authController.login
);

/**
 * GET /auth/me
 * Get current user profile
 * Requires authentication
 */
router.get('/me', authenticateToken, authController.getCurrentUser);

/**
 * POST /auth/refresh-token
 * Refresh access token
 */
router.post(
  '/refresh-token',
  AuthValidation.refreshToken(),
  handleValidationErrors,
  authController.refreshToken
);

/**
 * POST /auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', authenticateToken, authController.logout);

export default router;
