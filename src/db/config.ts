import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export const dbLoginFunction = (email: string, password: string) =>
  `login('${email}','${password}')`;
