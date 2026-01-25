import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: process.env.API_VERSION || 'v1',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'gaborone_reserve',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-secret-key-in-production',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },

  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  },

  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@gaboronereserve.bw',
  },

  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },

  aws: {
    region: process.env.AWS_REGION || 'af-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || 'gaborone-reserve-media',
  },

  payment: {
    dpo: {
      companyToken: process.env.DPO_COMPANY_TOKEN || '',
      serviceType: process.env.DPO_SERVICE_TYPE || '',
      paymentUrl: process.env.DPO_PAYMENT_URL || 'https://secure.paygate.co.bw/payweb3/process.trans',
      queryUrl: process.env.DPO_QUERY_URL || 'https://secure.paygate.co.bw/payweb3/query.trans',
    },
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  app: {
    name: process.env.APP_NAME || 'Gaborone Game Reserve',
    url: process.env.APP_URL || 'https://gaboronereserve.bw',
    frontendUrl: process.env.FRONTEND_URL || 'https://app.gaboronereserve.bw',
  },
};

// Validate required environment variables in production
if (config.env === 'production') {
  const requiredEnvVars = [
    'JWT_SECRET',
    'DB_PASSWORD',
    'SMTP_USER',
    'SMTP_PASSWORD',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    console.error(
      '❌ Missing required environment variables:',
      missingEnvVars.join(', ')
    );
    process.exit(1);
  }
}
