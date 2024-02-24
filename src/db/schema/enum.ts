import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const userPronounsEnum = pgEnum("user_pronouns", [
  "Do not specify",
  "They/them",
  "He/him",
  "She/her",
]);
