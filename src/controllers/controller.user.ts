import { getBearerToken } from "@/utils/utils";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getUserInfoByEmail } from "@/services/services.user";

export const serveUserInfoController = async (req: Request, res: Response) => {
  try {
    const sessionToken = getBearerToken(req);
    if (!sessionToken) return res.status(500).send("Invalid session");
    const decodedToken = jwt.decode(sessionToken, {
      json: true,
    });
    if (!decodedToken) return res.status(500).send("Invalid session");
    const email = decodedToken.email;
    if (!email) return res.status(500).send("Invalid session");

    return res.send(await getUserInfoByEmail(email));
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
