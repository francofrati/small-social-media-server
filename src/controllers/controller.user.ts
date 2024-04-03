import { getBearerToken } from "@/utils/utils";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getFollowRequests, getUserFolloweds, getUserFollowers, getUserInfoByEmail } from "@/services/services.user";

export const serveUserInfoController = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies.sessiontoken
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

export const serveUserContactsController = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies.sessiontoken
    const decodedToken = jwt.decode(sessionToken, {
      json: true,
    });
    if (!decodedToken) return res.status(500).send("Invalid session");
    const followers = await getUserFollowers(decodedToken.email)
    const followeds = await getUserFolloweds(decodedToken.email)
    const followRequests = await getFollowRequests(decodedToken.email)
    res.send({ followers, followeds, followRequests })
  } catch (error) {
    res.send(error)
  }
}
