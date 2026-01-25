import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: any[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return this.success(res, data, message, 201);
  }

  static error(
    res: Response,
    error: string,
    statusCode: number = 500,
    errors?: any[]
  ): Response {
    const response: ApiResponse = {
      success: false,
      error,
      errors,
    };
    return res.status(statusCode).json(response);
  }

  static badRequest(res: Response, error: string, errors?: any[]): Response {
    return this.error(res, error, 400, errors);
  }

  static unauthorized(res: Response, error: string = 'Unauthorized'): Response {
    return this.error(res, error, 401);
  }

  static forbidden(res: Response, error: string = 'Forbidden'): Response {
    return this.error(res, error, 403);
  }

  static notFound(res: Response, error: string = 'Not found'): Response {
    return this.error(res, error, 404);
  }

  static validationError(res: Response, errors: any[]): Response {
    return this.error(res, 'Validation failed', 422, errors);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): Response {
    const response: ApiResponse<T[]> = {
      success: true,
      data,
      message,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
    return res.status(200).json(response);
  }
}
