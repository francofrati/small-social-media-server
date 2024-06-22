import {
  getChatByChatRoomId,
  getUserChatsForChatBox,
} from "@/services/services.chat";
import { getUserIdByEmail } from "@/services/services.user";
import { ChatRoomId } from "@/types";
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

export const getChatController = async (
  req: Request<{ chatRoomId: string }, any>,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;

    const chat = await getChatByChatRoomId(chatRoomId);
    res.send(chat);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
