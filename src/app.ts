import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/environment';
import { errorMiddleware } from './middleware/error.middleware';
import { ResponseUtil } from './utils/response';
import routes from './routes';

export const createApp = (): Application => {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: config.cors.allowedOrigins,
      credentials: true,
    })
  );

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  if (config.env === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    return ResponseUtil.success(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.env,
      version: config.apiVersion,
    });
  });

  // API version endpoint
  app.get('/version', (req: Request, res: Response) => {
    return ResponseUtil.success(res, {
      version: config.apiVersion,
      name: config.app.name,
    });
  });

  // API routes
  app.use(`/${config.apiVersion}`, routes);

  // 404 handler
  app.use('*', (req: Request, res: Response) => {
    return ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
  });

  // Error handling middleware (must be last)
  app.use(errorMiddleware);

  return app;
};
