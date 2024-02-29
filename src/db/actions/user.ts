"use server";

// CREATE AN ARRAY THAT HAS ALL THE ROUTES ON THE WEBSITE
// MAKE SURE USERS CANNOT MAKE USERNAMES WITH SAME NAME AS ROUTES
// OR ELSE IT WILL CAUSE A ROUTING CONFLICT

import { db, eq, ilike } from "@/db";
import { User, userSocialMedia, users } from "@/db/schema/user";
import bcryptjs from "bcryptjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  SignInWithPasswordFormInput,
  SignUpWithPasswordFormInput,
  editProfileSocialMediaSchema,
  editProfileSocialMediaSchemaType,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
} from "@/types/zod";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import {
  DatabaseError,
  INVALID_USERNAMES,
  OldSocialMediaType,
} from "@/types/types";

export async function checkUserExistsById(userId: string): Promise<boolean> {
  noStore();
  try {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    const userExists = user ? true : false;
    return userExists;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by id");
  }
}

export async function getUserById(id: string): Promise<User | null> {
  noStore();
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by id");
  }
}

export async function updateUserUsername(
  id: string,
  newUsername: string,
): Promise<"not-found" | "success" | "duplicate" | null> {
  noStore();
  try {
    //Check and find a user that matches id
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return "not-found";

    //Check if the new username is already in use
    const [dupeUsername] = await db
      .select()
      .from(users)
      .where(ilike(users.username, newUsername));
    if (dupeUsername) return "duplicate";

    //Check if new username matches with an invalid username
    const isInvalid = INVALID_USERNAMES.map((username) =>
      username.toLowerCase(),
    ).includes(newUsername.toLowerCase());
    if (isInvalid) return "duplicate";

    //Update the current user with their new username
    const updatedUser = await db
      .update(users)
      .set({ username: newUsername })
      .where(eq(users.id, id));

    revalidatePath("/username");
    return updatedUser ? "success" : null;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating username");
  }
}

export async function updateUserFullName(
  id: string,
  newFullName: string,
): Promise<"not-found" | "success" | null> {
  noStore();
  try {
    //Check and find a user that matches id
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return "not-found";

    //Update the current user with their new full name
    const updatedUser = await db
      .update(users)
      .set({ name: newFullName })
      .where(eq(users.id, id));

    revalidatePath("/username");
    return updatedUser ? "success" : null;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating name");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  noStore();
  try {
    //Check and find a user that matches emails
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  } catch (error) {
    throw new Error("Error getting user by email");
  }
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  noStore();
  try {
    //Check and find a user that matches emails
    const [user] = await db
      .select()
      .from(users)
      .where(ilike(users.username, username));
    return user || null;
  } catch (error) {
    throw new Error("Error getting user by username");
  }
}

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput,
): Promise<
  "invalid-input" | "username-exists" | "email-exists" | "success" | "error"
> {
  //Validate the user's input
  const validatedInput = signUpWithPasswordSchema.safeParse(rawInput);

  //If invalidated, return an error on the client side
  if (!validatedInput.success) return "invalid-input";

  try {
    //Check if the input's user exists in the database
    const username = await getUserByUsername(validatedInput.data.username);
    if (username) return "username-exists";

    //Check if new username matches with an invalid username
    const isInvalid = INVALID_USERNAMES.map((username) =>
      username.toLowerCase(),
    ).includes(validatedInput.data.username.toLowerCase());
    if (isInvalid) return "username-exists";

    //Check if the input's email exists in the database
    const user = await getUserByEmail(validatedInput.data.email);
    if (user) return "email-exists";

    //Encrypt the password
    const password = await bcryptjs.hash(validatedInput.data.password, 10);

    //Insert a new user into the database
    const newUserResponse: any = await db.insert(users).values({
      id: crypto.randomUUID(),
      email: validatedInput.data.email,
      username: validatedInput.data.username,
      password,
    });

    //If inserting a user failed, return an error
    if (!newUserResponse) return "error";
    revalidatePath("/");
    return newUserResponse ? "success" : "error";
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

export async function signInWithPassword(
  rawInput: SignInWithPasswordFormInput,
): Promise<
  | "invalid-input"
  | "invalid-credentials"
  | "not-registered"
  | "incorrect-provider"
  | "success"
> {
  const validatedInput = signInWithPasswordSchema.safeParse(rawInput);
  if (!validatedInput.success) return "invalid-input";

  const existingUser = await getUserByEmail(validatedInput.data.email);
  if (!existingUser) return "not-registered";

  if (!existingUser.email || !existingUser.password)
    return "incorrect-provider";

  // if (!existingUser.emailVerified) return "unverified-email";

  try {
    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    });
    revalidatePath("/");

    return "success";
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid-credentials";
        default:
          throw error;
      }
    } else {
      throw error;
    }
  } finally {
    revalidatePath("/");
  }
}

export async function getUserSocialMedia(userId: string) {
  noStore();
  try {
    const [userHasSocialMediaLinks] = await db
      .select()
      .from(userSocialMedia)
      .where(eq(userSocialMedia.userId, userId));

    return userHasSocialMediaLinks || null;
  } catch (error) {
    throw new Error("Error getting user's social media links");
  }
}

export async function insertSocialMedia(
  rawInput: editProfileSocialMediaSchemaType,
  userId: string,
) {
  noStore();
  //Validate form data
  const validatedInput = editProfileSocialMediaSchema.safeParse(rawInput);
  if (!validatedInput.success) return "invalid-input";
  const {
    twitter,
    instagram,
    linkedin,
    github,
    youtube,
    twitch,
    tiktok,
    patreon,
    behance,
  } = validatedInput.data;

  try {
    const test = await db.insert(userSocialMedia).values({
      userId: userId,
      twitter: twitter || "",
      instagram: instagram || "",
      linkedin: linkedin || "",
      github: github || "",
      youtube: youtube || "",
      twitch: twitch || "",
      tiktok: tiktok || "",
      patreon: patreon || "",
      behance: behance || "",
    });
    return "success" || null;
  } catch (error) {
    throw new Error("Error getting user's social media links");
  }
}

export async function updateSocialMediaLinks(
  rawInput: editProfileSocialMediaSchemaType,
  oldSocialMedia: OldSocialMediaType,
  userId: string,
  username: string,
): Promise<DatabaseError> {
  try {
    //Validate form data
    const validatedInput = editProfileSocialMediaSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";
    const {
      twitter,
      instagram,
      linkedin,
      github,
      youtube,
      twitch,
      tiktok,
      patreon,
      behance,
    } = validatedInput.data;

    // Check if the user already has an existing social media profile
    const userHasSocials = await getUserSocialMedia(userId);

    // If the user doesn't have social media links, insert the new one
    if (!userHasSocials) {
      const test = await insertSocialMedia(
        {
          twitter: twitter,
          instagram: instagram,
          linkedin: linkedin,
          github: github,
          youtube: youtube,
          twitch: twitch,
          tiktok: tiktok,
          patreon: patreon,
          behance: behance,
        },
        userId,
      );
      if (!test) return "not-found";
    }

    //If the user already has social media links, update with new ones
    await db
      .update(userSocialMedia)
      .set({
        twitter: twitter || "",
        instagram: instagram || "",
        linkedin: linkedin || "",
        github: github || "",
        youtube: youtube || "",
        twitch: twitch || "",
        tiktok: tiktok || "",
        patreon: patreon || "",
        behance: behance || "",
      })
      .where(eq(userSocialMedia.userId, userId));

    // Return "success" after successful insertion
    revalidatePath(`/${username}`);
    return "success";
  } catch (error) {
    throw new Error("Error updating user social media links");
  }
}
