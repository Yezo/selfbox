"use server";

import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { bios } from "@/db/schema/user";
import { and, db, eq } from "@/db";
import { auth } from "@/lib/auth";
import { deleteBioSchema } from "@/types/zod";

export async function deleteBioAction(values: z.infer<typeof deleteBioSchema>) {
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
    const parse = deleteBioSchema.parse({
      id: values.id,
      userId: values.userId,
    });

    //Delete any items in database BIOS where item values match existing records
    await db
      .delete(bios)
      .where(and(eq(bios.id, parse.id), eq(bios.userId, session.user.id)));

    //Revalidate the cache
    return revalidatePath("/bio");
  } catch (e) {
    const error = e as ZodError;
    if (!error.isEmpty) return error.message;
  }
}
