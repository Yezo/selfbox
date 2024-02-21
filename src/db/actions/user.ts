"use server";

import { db, eq } from "@/db";
import { User, users } from "@/db/schema/user";
import bcryptjs from "bcryptjs";
import { unstable_noStore as noStore } from "next/cache";
import {
  SignInWithPasswordFormInput,
  SignUpWithPasswordFormInput,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
} from "@/types/zod";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

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

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput,
): Promise<"invalid-input" | "exists" | "success" | "error"> {
  //Validate the user's input
  const validatedInput = signUpWithPasswordSchema.safeParse(rawInput);

  //If invalidated, return an error on the client side
  if (!validatedInput.success) return "invalid-input";

  try {
    //Check if the input's email exists in the database
    const user = await getUserByEmail(validatedInput.data.email);
    if (user) return "exists";

    //Encrypt the password
    const password = await bcryptjs.hash(validatedInput.data.password, 10);

    //Insert a new user into the database
    const newUserResponse = await db.insert(users).values({
      id: crypto.randomUUID(),
      email: validatedInput.data.email,
      password,
    });

    //If inserting a user failed, return an error
    if (!newUserResponse) return "error";

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
  }
}
