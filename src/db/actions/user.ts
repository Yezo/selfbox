"use server";

import bcryptjs from "bcryptjs";
import { db, eq, ilike } from "@/db";
import { User, userSocialMedia, users } from "@/db/schema/user";
import { utapi } from "@/app/api/uploadthing/route";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import {
  DatabaseError,
  INVALID_USERNAMES,
  OldSocialMediaType,
} from "@/types/types";
import {
  GetUserByEmailInput,
  GetUserByIdInput,
  GetUserByUsernameInput,
  GetUserProfileByIdInput,
  GetUserSocialMediaInput,
  SignInWithPasswordFormInput,
  SignUpWithPasswordFormInput,
  editProfileSocialMediaSchema,
  editProfileSocialMediaSchemaType,
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByUsernameSchema,
  getUserProfileByIdSchema,
  getUserSocialMediaSchema,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
} from "@/types/zod";
import {
  psGetUserByEmail,
  psGetUserById,
  psGetUserByUsername,
  psGetUserProfileById,
  psGetUserSocialMedia,
} from "@/db/prepared/statements";

export async function getUserById(
  rawData: GetUserByIdInput,
): Promise<User | null> {
  try {
    const validatedData = getUserByIdSchema.safeParse(rawData);
    if (!validatedData.success) return null;

    noStore();
    const [user] = await psGetUserById.execute({ id: validatedData.data.id });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by id");
  }
}

export async function getUserByEmail(
  rawData: GetUserByEmailInput,
): Promise<User | null> {
  try {
    const validatedData = getUserByEmailSchema.safeParse(rawData);
    if (!validatedData.success) return null;

    noStore();
    const [user] = await psGetUserByEmail.execute({
      email: validatedData.data.email,
    });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by email");
  }
}

export async function getUserByUsername(
  rawData: GetUserByUsernameInput,
): Promise<User | null> {
  try {
    const validatedData = getUserByUsernameSchema.safeParse(rawData);
    if (!validatedData.success) return null;

    noStore();
    const [user] = await psGetUserByUsername.execute({
      username: validatedData.data.username,
    });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by username");
  }
}

export async function getUserSocialMedia(rawData: GetUserSocialMediaInput) {
  try {
    const validatedData = getUserSocialMediaSchema.safeParse(rawData);
    if (!validatedData.success) return null;

    noStore();
    const [user] = await psGetUserSocialMedia.execute({
      id: validatedData.data.id,
    });

    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user social media links");
  }
}

export async function getUserProfileById(rawData: GetUserProfileByIdInput) {
  try {
    const validatedData = getUserProfileByIdSchema.safeParse(rawData);
    if (!validatedData.success) return null;

    noStore();

    const [user] = await psGetUserProfileById.execute({
      id: validatedData.data.id,
    });

    revalidatePath("/settings/profile");

    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user's profile by id");
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

export async function signUpWithPassword(
  rawData: SignUpWithPasswordFormInput,
): Promise<
  "invalid-input" | "username-exists" | "email-exists" | "success" | "error"
> {
  //Validate the user's input
  const validatedData = signUpWithPasswordSchema.safeParse(rawData);

  //If invalidated, return an error on the client side
  if (!validatedData.success) return "invalid-input";

  try {
    //Check if the input's user exists in the database
    const username = await getUserByUsername({
      username: validatedData.data.username,
    });
    if (username) return "username-exists";

    //Check if new username matches with an invalid username
    const isInvalid = INVALID_USERNAMES.map((username) =>
      username.toLowerCase(),
    ).includes(validatedData.data.username.toLowerCase());
    if (isInvalid) return "username-exists";

    //Check if the input's email exists in the database
    const user = await getUserByEmail({ email: validatedData.data.email });
    if (user) return "email-exists";

    //Encrypt the password
    const password = await bcryptjs.hash(validatedData.data.password, 10);

    //Insert a new user into the database
    const newUserResponse: any = await db.insert(users).values({
      id: crypto.randomUUID(),
      email: validatedData.data.email,
      username: validatedData.data.username,
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
  rawData: SignInWithPasswordFormInput,
): Promise<
  | "invalid-input"
  | "invalid-credentials"
  | "not-registered"
  | "incorrect-provider"
  | "success"
> {
  const validatedData = signInWithPasswordSchema.safeParse(rawData);
  if (!validatedData.success) return "invalid-input";

  const existingUser = await getUserByEmail({
    email: validatedData.data.email,
  });
  if (!existingUser) return "not-registered";

  if (!existingUser.email || !existingUser.password)
    return "incorrect-provider";

  // if (!existingUser.emailVerified) return "unverified-email";

  try {
    await signIn("credentials", {
      email: validatedData.data.email,
      password: validatedData.data.password,
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

export async function insertSocialMedia(
  rawData: editProfileSocialMediaSchemaType,
  userId: string,
) {
  noStore();
  //Validate form data
  const validatedData = editProfileSocialMediaSchema.safeParse(rawData);
  if (!validatedData.success) return "invalid-input";
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
  } = validatedData.data;

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
    const validatedData = editProfileSocialMediaSchema.safeParse(rawInput);
    if (!validatedData.success) return "invalid-input";
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
    } = validatedData.data;

    // Check if the user already has an existing social media profile
    const userHasSocials = await getUserSocialMedia({ id: userId });

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

export async function updateUserAvatar(
  imageURL: string,
  userId: string,
): Promise<"not-found" | "success" | null> {
  noStore();
  try {
    //Check and find a user that matches id
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return "not-found";

    //Update user with new avatar
    const updatedUser = await db
      .update(users)
      .set({ image: imageURL })
      .where(eq(users.id, userId));

    revalidatePath("/settings/profile");
    return updatedUser ? "success" : null;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user avatar");
  }
}

export async function deleteOldAvatar(
  oldImageURL: string | null | undefined,
): Promise<"not-found" | "success" | null> {
  noStore();

  function removeSubstring(inputString: string) {
    const substringToRemove = "https://utfs.io/f/";
    const resultString = inputString.replace(substringToRemove, "");
    return resultString;
  }

  try {
    const deleteFile = async (key: string) => {
      await utapi.deleteFiles(key);
    };

    if (oldImageURL && oldImageURL !== undefined && oldImageURL.length > 0) {
      const deleteOld = deleteFile(removeSubstring(oldImageURL));
      if (!deleteOld) return null;
    }
    return "success";
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user avatar");
  }
}
