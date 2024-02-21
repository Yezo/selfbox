import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

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
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  bio: one(bios, {
    fields: [users.id],
    references: [bios.userId],
  }),
}));

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const songs = pgTable("Songs", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  artist: varchar("artist"),
  album: varchar("album"),
  duration: varchar("duration"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const bios = pgTable("bios", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
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
