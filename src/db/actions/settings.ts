"use server";

import { db, eq } from "@/db";
import { UserProfileType, userProfile } from "@/db/schema/user";
import { DatabaseError } from "@/types/types";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import {
  checkUserExistsById,
  getUserByUsername,
  updateUserFullName,
  updateUserUsername,
} from "@/db/actions/user";

export async function getUserProfileById(
  userId: string | undefined,
): Promise<UserProfileType | null> {
  noStore();
  try {
    if (userId) {
      const [profile] = await db
        .select()
        .from(userProfile)
        .where(eq(userProfile.userId, userId));
      revalidatePath("/settings/profile");
      return profile || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by id");
  }
}

export async function insertUserBio(
  userId: string,
  newBio: string,
): Promise<DatabaseError> {
  noStore();
  try {
    // Check if the user already has an existing bio
    const [existingBio] = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId));

    // If the user already has a bio, return "exists"
    if (existingBio) return "exists";

    // If the user doesn't have an existing bio, insert the new one
    await db.insert(userProfile).values({
      bio: newBio,
      userId: userId,
    });

    // Return "success" after successful insertion
    return "success";
  } catch (error) {
    throw new Error("Error inserting user bio");
  }
}

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
    const existingUser = await checkUserExistsById(userId);
    if (!existingUser) return "user-doesnt-exist";

    // Check if the user inputted a new username
    if (username !== undefined && username.length > 0) {
      const newUsernameAlreadyExists = await getUserByUsername(username);
      if (newUsernameAlreadyExists) return "username-exists";
      else await updateUserUsername(userId, username);
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
