"use server";

import { db, eq, ilike } from "@/db";
import { User, users } from "@/db/schema/user";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { signIn } from "@/lib/auth";
import bcryptjs from "bcryptjs";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import {
  checkUserExistsById,
  getUserByUsername,
  updateUserFullName,
  updateUserUsername,
} from "@/db/actions/user";

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
> {
  //Validate the user's input
  const validatedInput = settingsProfileSchema.safeParse(rawInput);

  //If invalidated, return an error on the client side
  if (!validatedInput.success) return "invalid-input";

  const { username, name } = validatedInput.data;
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
      await updateUserFullName(userId, name);
    }

    //Finally, revalidate the path
    revalidatePath("/settings/profile");
    return "success";
  } catch (error) {
    throw new Error("There was an error.");
  }
}
