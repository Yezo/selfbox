"use server";

import { db, eq } from "@/db";
import { userProfile } from "@/db/schema/user";
import { DatabaseError } from "@/types/types";
import { revalidatePath } from "next/cache";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import {
  getUserById,
  getUserByUsername,
  updateUserFullName,
  updateUserUsername,
} from "@/db/actions/user";

export async function updateUserProfile(
  userId: string,
  newBio?: string,
  newPronouns?: "Do not specify" | "They/them" | "He/him" | "She/her",
  newWebsite?: string,
): Promise<DatabaseError> {
  try {
    //Check if the user has an existing userProfile
    const [existingUserProfile] = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId));

    //If userProfile doesn't already exist, insert a new userProfile
    if (!existingUserProfile) {
      await db.insert(userProfile).values({
        bio: newBio,
        userId: userId,
        website: newWebsite,
        pronouns: newPronouns,
      });
    }

    //If userProfile already exists, update fields
    if (newBio !== undefined) {
      await db
        .update(userProfile)
        .set({ bio: newBio })
        .where(eq(userProfile.userId, userId));
    }

    if (newPronouns !== undefined && newPronouns.length > 0) {
      await db
        .update(userProfile)
        .set({ pronouns: newPronouns })
        .where(eq(userProfile.userId, userId));
    }

    if (newWebsite !== undefined) {
      await db
        .update(userProfile)
        .set({ website: newWebsite })
        .where(eq(userProfile.userId, userId));
    }

    return "success";
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile");
  }
}

export async function updateUserProfileSettings(
  rawInput: settingsProfileSchemaType,
  userId: string,
): Promise<
  | "invalid-input"
  | "user-doesnt-exist"
  | "username-exists"
  | "email-exists"
  | "success"
  | "error"
  | "wtf"
> {
  //Validate the user's input
  const validatedInput = settingsProfileSchema.safeParse(rawInput);

  //If invalidated, return an error on the client side
  if (!validatedInput.success) return "invalid-input";

  const { username, name, bio, pronouns, website } = validatedInput.data;
  try {
    //Check if there is a user that matches user ids
    const existingUser = await getUserById(userId);
    if (!existingUser) return "user-doesnt-exist";

    // Check if the user inputted a new username
    if (username !== undefined && username.length > 0) {
      const newUsernameAlreadyExists = await getUserByUsername(username);
      if (newUsernameAlreadyExists) return "username-exists";
      const updatedUsername = await updateUserUsername(userId, username);
      if (updatedUsername === "duplicate") return "username-exists";
    }

    //Check if the user inputted a new name
    if (name !== undefined && name.length > 0) {
      const updatedUserFullName = await updateUserFullName(userId, name);
      if (!updatedUserFullName) return "error";
    }

    //Check if the user inputted new fields for userProfile
    if (bio || pronouns || website) {
      const updatedUserProfile = await updateUserProfile(
        userId,
        bio,
        pronouns,
        website,
      );
      if (!updatedUserProfile) return "wtf";
    }

    //Finally, revalidate the path
    revalidatePath("/settings/profile");
    return "success";
  } catch (error) {
    throw new Error("There was an error.");
  }
}
