import type { DefaultSession } from "next-auth";

export type UserRole = "user" | "admin";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  username: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
