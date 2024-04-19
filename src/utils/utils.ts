import { Request } from "express";
import jwt from 'jsonwebtoken'

export const getBearerToken = (req: Request) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return undefined;
  if (!authorizationHeader.toLowerCase().includes("bearer")) return undefined;
  else return authorizationHeader.split(" ")[1];
};

export const getEmailFromSessionToken = (sessionToken: string): string | undefined => {
  const decryptedSessionToken = jwt.decode(sessionToken, { json: true },);
  if (!decryptedSessionToken) return undefined;
  const email = decryptedSessionToken.email;
  if (!email) return undefined
  return email
}