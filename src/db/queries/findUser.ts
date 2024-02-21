import { db, eq } from "@/db";
import { users } from "@/db/schema/user";

export const userQuery = db.select().from(users);
