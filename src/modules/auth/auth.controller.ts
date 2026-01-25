import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ResponseUtil } from '../../utils/response';
import { asyncHandler } from '../../middleware/error.middleware';
import { SUCCESS_MESSAGES } from '../../config/constants';

export class AuthController {
  private authService = new AuthService();

  /**
   * Register a new user
   * POST /auth/register
   */
  register = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.register(
      req.body
    );

    // Remove password hash from response
    const { password_hash, ...userResponse } = user;

    return ResponseUtil.created(
      res,
      {
        user: userResponse,
        accessToken,
        refreshToken,
      },
      SUCCESS_MESSAGES.REGISTER_SUCCESS
    );
  });

  /**
   * Login user
   * POST /auth/login
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.login(
      req.body
    );

    // Remove password hash from response
    const { password_hash, ...userResponse } = user;

    return ResponseUtil.success(
      res,
      {
        user: userResponse,
        accessToken,
        refreshToken,
      },
      SUCCESS_MESSAGES.LOGIN_SUCCESS
    );
  });

  /**
   * Get current user profile
   * GET /auth/me
   */
  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const user = await this.authService.getUserById(req.user.userId);

    // Remove password hash from response
    const { password_hash, ...userResponse } = user;

    return ResponseUtil.success(res, userResponse);
  });

  /**
   * Refresh access token
   * POST /auth/refresh-token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return ResponseUtil.badRequest(res, 'Refresh token required');
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    return ResponseUtil.success(res, tokens);
  });

  /**
   * Logout (client-side token removal)
   * POST /auth/logout
   */
  logout = asyncHandler(async (req: Request, res: Response) => {
    // In a JWT system, logout is typically handled client-side
    // by removing the tokens. We can add token blacklisting here if needed.
    return ResponseUtil.success(res, null, 'Logged out successfully');
  });
}
