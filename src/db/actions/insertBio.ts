"use server";

import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { bios } from "@/db/schema/user";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { bioSchema } from "@/types/zod";

export async function createBioAction(values: z.infer<typeof bioSchema>) {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("There is no user.");
  }

  try {
    const parse = bioSchema.parse({
      bio: values.bio,
    });

    await db.insert(bios).values({
      bio: parse.bio,
      userId: session.user.id,
    });

    return revalidatePath("/bio");
  } catch (e) {
    const error = e as ZodError;

    if (!error.isEmpty) return error.message;
  }
}
