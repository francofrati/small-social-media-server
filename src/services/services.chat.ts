import { pool } from "@/db/config";

export const getUserChatsForChatBox = async (userId: number) => {
  const { rows } = await pool.query(`select * from getUserChats(${userId})`);
  return rows;
};
