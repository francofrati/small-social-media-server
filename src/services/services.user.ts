import { pool } from "@/db/config";

export const getUserInfoByEmail = async (email: string) => {
  const { rows } = await pool.query(
    `select u."firstName", u."lastName", u."birthDate", ue."email" from "UserEmail" ue left join "User" u on ue."userId"=u."id" where ue."email"='${email}'`
  );
  const userInfo = rows[0];
  return userInfo;
};
