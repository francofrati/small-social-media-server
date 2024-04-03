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
    select u."firstName", u."lastName", u."profileImg" from "UserEmail" ue 
    left join "UserFollower" uf on uf."followedId" = ue."userId" 
    left join "User" u on u."id" = uf."userId"
    where ue."email" = '${email}'
    `
  )
  return rows
}

export const getUserFolloweds = async (email: string) => {
  const { rows } = await pool.query(
    `
    select u."firstName", u."lastName", u."profileImg" from "UserEmail" ue 
    right join "UserFollower" uf on uf."userId" = ue."userId" 
    left join "User" u on u."id" = uf."followedId"
    where ue."email" = '${email}'
    `
  )
  return rows
}

export const getFollowRequests = async (email: string) => {
  const { rows } = await pool.query(
    `
    select u."firstName", u."lastName", u."profileImg",uf."id" from "UserEmail" ue 
    right join "UserFollow" uf on uf."followedId" = ue."userId" 
    left join "User" u on u."id" = uf."followerId"
    where ue."email" = '${email}'
    `
  )
  return rows
}