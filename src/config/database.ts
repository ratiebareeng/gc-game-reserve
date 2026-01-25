import { DataSource } from 'typeorm';
import { config } from './environment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: config.env === 'development', // Only in development
  logging: config.env === 'development',
  entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  subscribers: [],
  ssl: config.env === 'production' ? { rejectUnauthorized: false } : false,
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');

    if (config.env === 'development') {
      console.log('📊 Running in development mode - database synchronization enabled');
    }
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  }
};
