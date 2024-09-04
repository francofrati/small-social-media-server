import {
  getChatByChatRoomId,
  getUserChatsForChatBox,
  sendMessage,
} from "@/services/services.chat";
import {
  getUserIdByEmail,
  getUserIdByUsername,
} from "@/services/services.user";
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

export const sendMessageController = async (
  req: Request<
    { chatRoomId: string },
    any,
    { receiverUsername: string; content: string }
  >,
  res: Response
) => {
  try {
    const sessionToken = req.cookies["sessiontoken"];

    const userEmail = getEmailFromSessionToken(sessionToken);

    if (!userEmail) throw Error("Invalid user");

    const senderId = await getUserIdByEmail(userEmail);

    const { chatRoomId } = req.params;
    const { receiverUsername, content } = req.body;

    const receiverId = await getUserIdByUsername(receiverUsername);

    await sendMessage(chatRoomId, senderId, receiverId, content);

    res.send("ok");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
