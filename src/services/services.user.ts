import { pool } from "@/db/config";

export const getUserInfoByEmail = async (email: string) => {
  const { rows } = await pool.query(
    `select u."firstName", u."lastName", u."profileImg", u."birthDate", ue."email" from "UserEmail" ue left join "User" u on ue."userId"=u."id" where ue."email"='${email}'`
  );
  const userInfo = rows[0];
  return userInfo;
};

export const getUserFollowers = async (email: string) => {
  const { rows } = await pool.query(
    `
    select u."firstName", u."lastName", u."profileImg", u."username" from "UserEmail" ue 
    left join "UserFollower" uf on uf."followedId" = ue."userId" 
    left join "User" u on u."id" = uf."userId"
    where ue."email" = '${email}'
    `
  );
  return rows;
};

export const getUserFolloweds = async (email: string) => {
  const { rows } = await pool.query(
    `
    select u."firstName", u."lastName", u."profileImg", u."username" from "UserEmail" ue 
    right join "UserFollower" uf on uf."userId" = ue."userId" 
    left join "User" u on u."id" = uf."followedId"
    where ue."email" = '${email}'
    `
  );
  return rows;
};

export const getFollowRequests = async (email: string) => {
  const { rows } = await pool.query(
    `
    select u."firstName", u."lastName", u."profileImg",uf."id" from "UserEmail" ue 
    right join "UserFollow" uf on uf."followedId" = ue."userId" 
    left join "User" u on u."id" = uf."followerId"
    where ue."email" = '${email}'
    `
  );
  return rows;
};

export const getUserIdByEmail = async (email: string) => {
  const { rows } = await pool.query(`
    select u."id" from "UserEmail" ue
    left join "User" u on u."id" = ue."userId"
    where ue."email" = '${email}'
  `);
  return rows.length ? rows[0].id : undefined;
};
