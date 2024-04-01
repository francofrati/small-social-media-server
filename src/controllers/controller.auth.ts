import { pool } from "@/db/config";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const query = await pool.query(
      `select * from login('${email}', '${password}')`
    );
    res.send(query);
  } catch (error) {
    res.send(error);
  }
};
