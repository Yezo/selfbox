import { db } from "@/db";
import { userProfile, userSocialMedia, users } from "@/db/schema/user";
import { eq, sql } from "drizzle-orm";

export const psGetUserById = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder("id")))
  .prepare("psGetUserById");

export const psGetUserByEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("psGetUserByEmail");

export const psGetUserByUsername = db
  .select()
  .from(users)
  .where(eq(users.username, sql.placeholder("username")))
  .prepare("psGetUserByUsername");

export const psGetUserSocialMedia = db
  .select()
  .from(userSocialMedia)
  .where(eq(userSocialMedia.userId, sql.placeholder("id")))
  .prepare("psGetUserSocialMedia");

export const psGetUserProfileById = db
  .select()
  .from(userProfile)
  .where(eq(userProfile.userId, sql.placeholder("id")))
  .prepare("psGetUserProfileById");
