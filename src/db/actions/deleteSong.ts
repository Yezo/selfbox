"use server";

import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { songs } from "@/db/schema/user";
import { and, db, eq } from "@/db";
import { auth } from "@/lib/auth";
import { deleteSongSchema } from "@/types/zod";

export async function deleteSongAction(
  values: z.infer<typeof deleteSongSchema>,
) {
  const session = await auth();

  //If there is no session, prevent user from interacting
  if (!session?.user.id) {
    throw new Error("There is no user.");
  }

  //Prevent user from interaction if the userId linked to the item does not match the current session.user.id (aka user A from deleting user B's information)
  if (values.userId !== session.user.id)
    throw new Error(
      "The current user cannot delete another user's information.",
    );

  try {
    //Validate types
    const parse = deleteSongSchema.parse({
      id: values.id,
      userId: values.userId,
    });

    //Delete any items in database SONGS where item values match existing records
    await db
      .delete(songs)
      .where(and(eq(songs.id, parse.id), eq(songs.userId, parse.userId)));

    //Revalidate the cache
    return revalidatePath("/bio");
  } catch (e) {
    const error = e as ZodError;

    if (!error.isEmpty) return error.message;
  }
}
