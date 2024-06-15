import { getUserChatsForChatBox } from "@/services/services.chat";
import { getUserIdByEmail } from "@/services/services.user";
import { getEmailFromSessionToken } from "@/utils/utils";
import { Request, Response } from "express";

export const getUserChatsController = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies["sessiontoken"];

    const userEmail = getEmailFromSessionToken(sessionToken);

    if (!userEmail) throw Error("Invalid user");

    const userId = await getUserIdByEmail(userEmail);

    const chats = await getUserChatsForChatBox(userId);

    res.send(chats);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
