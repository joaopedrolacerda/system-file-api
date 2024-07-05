import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

const dbPort = DB_PORT ? parseInt(DB_PORT, 10) : undefined;

export const AppDataSource = new DataSource({
	type: "mysql",
	host: DB_HOST,
	port: dbPort,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: true,
	logging: false,
    entities: ["src/entities/*{js,ts}"], 
    migrations: ["src/migrations/*{js,ts}"], 
    subscribers: ["src/subscribers/*{js,ts}"], 
	migrationsTableName: "migrations",
})
