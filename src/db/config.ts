import { Pool } from "pg";
console.log(process.env.DB_CONNECTION_STRING);
export const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});