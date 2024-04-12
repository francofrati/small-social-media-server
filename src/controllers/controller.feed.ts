import { pool } from "@/db/config";
import { getUserIdByEmail } from "@/services/services.user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getUserFeedController = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const sessionToken = cookies["sessiontoken"];

    const decryptedSessionToken = jwt.decode(sessionToken, { json: true });
    if (!decryptedSessionToken) return res.status(500).send("Invalid session");
    const email = decryptedSessionToken.email;
    if (!email) return res.status(500).send("Invalid session");

    const userId = await getUserIdByEmail(email);
    if (!userId) return res.status(500).send("Invalid session");
    const { rows } = await pool.query(`
        select * from userFeed(${userId})
    `);

    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};
