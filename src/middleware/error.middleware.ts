import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { ResponseUtil } from '../utils/response';
import { config } from '../config/environment';

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle operational errors
  if (err instanceof ValidationError) {
    return ResponseUtil.validationError(res, err.errors);
  }

  if (err instanceof AppError && err.isOperational) {
    return ResponseUtil.error(res, err.message, err.statusCode);
  }

  // Handle specific error types
  if (err.name === 'JsonWebTokenError') {
    return ResponseUtil.unauthorized(res, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return ResponseUtil.unauthorized(res, 'Token expired');
  }

  if (err.name === 'ValidationError') {
    return ResponseUtil.badRequest(res, 'Validation failed');
  }

  // Default error response
  const message =
    config.env === 'development'
      ? err.message
      : 'Internal server error';

  return ResponseUtil.error(res, message, 500);
};

// Async error wrapper to catch errors in async route handlers
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
