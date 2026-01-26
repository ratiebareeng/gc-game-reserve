import { DataSource } from "typeorm";
import { config } from "./environment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: config.env === "development", // Only in development
  logging: config.env === "development",
  entities: [__dirname + "/../database/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  subscribers: [],
  ssl: config.env === "production" ? { rejectUnauthorized: false } : false,
});

export const initializeDatabase = async (): Promise<void> => {
  const maxRetries = 10;
  const retryDelay = 3000; // 3 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🔄 Attempting database connection (attempt ${attempt}/${maxRetries})...`,
      );
      await AppDataSource.initialize();
      console.log("✅ Database connection established successfully");

      if (config.env === "development") {
        console.log(
          "📊 Running in development mode - database synchronization enabled",
        );
      }
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Database connection attempt ${attempt} failed:`,
        errorMessage,
      );

      if (attempt === maxRetries) {
        console.error("💥 All database connection attempts failed");
        process.exit(1);
      }

      console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};
