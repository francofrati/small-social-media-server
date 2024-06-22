import { pool } from "@/db/config";
import { ChatRoomId } from "@/types";

export const getUserChatsForChatBox = async (userId: number) => {
  const { rows } = await pool.query(`select * from getUserChats(${userId})`);
  return rows;
};

export const getChatByChatRoomId = async (chatRoomId: string) => {
  const { rows } = await pool.query(`select * from getFullChat(${chatRoomId})`);
  return rows;
};
