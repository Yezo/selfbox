import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { userRoleEnum, userPronounsEnum } from "@/db/schema/enum";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  username: text("username").unique(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: userRoleEnum("user").default("user"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  userProfile: one(userProfile, {
    fields: [users.id],
    references: [userProfile.userId],
  }),
  userSocialMedia: one(userSocialMedia, {
    fields: [users.id],
    references: [userSocialMedia.userId],
  }),
}));

export const userProfile = pgTable("userProfile", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  bio: varchar("bio", { length: 256 }),
  pronouns: userPronounsEnum("pronouns").default("Do not specify"),
  website: varchar("website", { length: 50 }),
});

export const userSocialMedia = pgTable("userSocialMedia", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id),
  twitter: varchar("twitter", { length: 30 }),
  instagram: varchar("instagram", { length: 30 }),
  linkedin: varchar("linkedin", { length: 30 }),
  github: varchar("github", { length: 30 }),
  youtube: varchar("youtube", { length: 30 }),
  twitch: varchar("twitch", { length: 30 }),
  tiktok: varchar("tiktok", { length: 30 }),
  patreon: varchar("patreon", { length: 30 }),
  behance: varchar("behance", { length: 30 }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export type User = typeof users.$inferSelect;
export type UserProfileType = typeof userProfile.$inferSelect;
