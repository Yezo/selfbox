import { db, eq } from "@/db";
import { profiles, users } from "@/db/schema/user";

export const profileQuery = db
  .select({
    id: users.id,
    name: users.name,
    avatar: users.image,
    profile: {
      id: profiles.userId,
      bio: profiles.bio,
    },
  })
  .from(users)
  .innerJoin(profiles, eq(users.id, profiles.userId));
