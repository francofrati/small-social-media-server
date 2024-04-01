import { Request } from "express";

export const getBearerToken = (req: Request) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return undefined;
  if (!authorizationHeader.toLowerCase().includes("bearer")) return undefined;
  else return authorizationHeader.split(" ")[1];
};
