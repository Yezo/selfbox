import { SongForm } from "@/components/forms/CreateSongForm";
import { DeleteSongButton } from "@/components/forms/DeleteSongButton";
import { Main } from "@/components/layout/Main";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { songs } from "@/db/schema/user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SongPage() {
  const session = await auth();
  const data = await db.select().from(songs);

  if (!data) throw new Error("Failed to fetch data");
  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/");

  return (
    <Main className="flex min-h-screen flex-col items-center  p-24">
      {data?.map((item) => (
        <div key={`song-${item.id}`} className="grid grid-cols-7 px-2 py-1">
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.artist}</div>
          <div>{item.album}</div>
          <div>{item.duration}</div>
          <div>{item.userId}</div>
          <DeleteSongButton id={item.id} userId={item.userId} />
        </div>
      ))}

      <Separator className="my-4" />
      <SongForm />
    </Main>
  );
}
