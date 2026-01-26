import { DataSource } from "typeorm";
import { config } from "./src/config/environment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: false, // Never synchronize in migrations
  logging: false,
  entities: ["src/database/entities/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  subscribers: [],
  ssl: config.env === "production" ? { rejectUnauthorized: false } : false,
});
