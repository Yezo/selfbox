import { db, eq } from "@/db";
import { userProfile, users } from "@/db/schema/user";

export const profileQuery = db
  .select({
    id: users.id,
    name: users.name,
    avatar: users.image,
    profile: {
      id: userProfile.userId,
    },
  })
  .from(users)
  .innerJoin(userProfile, eq(users.id, userProfile.userId));
