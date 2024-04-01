import M_User, { User } from "@/models/models.user";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createSession } from "@/services/services.session";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loggingUser = new M_User(email, password);

    const authUserRes = await loggingUser.authenticateUser();

    if (!authUserRes.isAuthenticated)
      return res.send("Email or password was wrong!");

    const sessionToken = createSession(authUserRes.user);

    return res.send(sessionToken);
  } catch (error) {
    res.send(error);
  }
};

export const verifySessionController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.send("invalid session");
    if (!authorizationHeader.toLowerCase().includes("bearer"))
      return res.send("invalid session");
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string);

    res.send("Authenticated successfully");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.send("invalid session");
    if (!authorizationHeader.toLowerCase().includes("bearer"))
      return res.send("invalid session");
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error: any) {
    return res.status(500).send("Invalid session");
  }
};
