"use server";

import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { songs } from "@/db/schema/user";
import { db } from "@/db";
import { songSchema } from "@/types/zod";
import { auth } from "@/lib/auth";

export async function createSongAction(values: z.infer<typeof songSchema>) {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("There is no user.");
  }
  try {
    const parse = songSchema.parse({
      title: values.title,
      artist: values.artist,
      album: values.album,
      duration: values.duration,
    });

    await db.insert(songs).values({
      title: parse.title,
      artist: parse.artist,
      album: parse.album,
      duration: parse.duration,
      userId: session.user.id,
    });

    return revalidatePath("/song");
  } catch (e) {
    const error = e as ZodError;

    if (!error.isEmpty) return error.message;
  }
}
