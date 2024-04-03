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
      return res.status(401).send("Email or password was wrong!");

    const sessionToken = createSession(authUserRes.user);
    res.set('Access-Control-Allow-Credentials', 'true')
    res.set('Set-Cookie', `sessiontoken=${sessionToken}; HttpOnly; Path=/`)

    return res.send('Authenticated');
  } catch (error) {
    res.send(error);
  }
};

export const verifySessionController = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    const sessionToken = cookies["sessiontoken"]

    if (!sessionToken) throw Error('Missing param')

    jwt.verify(sessionToken, process.env.JWT_SECRET as string);

    res.send('authorized');
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
    const cookies = req.cookies;

    const sessionToken = cookies["sessiontoken"]

    if (!sessionToken) throw Error('Missing param')

    jwt.verify(sessionToken, process.env.JWT_SECRET as string);

    next();
  } catch (error: any) {
    return res.status(500).send("Invalid session");
  }
};
