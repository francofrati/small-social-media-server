import { User } from "@/models/models.user";
import jwt from "jsonwebtoken";

export const createSession = (user: User) => {
  const sessionToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "3d",
    }
  );

  return sessionToken;
};
