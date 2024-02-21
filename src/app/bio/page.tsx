import { BioForm } from "@/components/forms/CreateBioForm";
import { DeleteBioButton } from "@/components/forms/DeleteBioButton";
import { Main } from "@/components/layout/Main";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { bios } from "@/db/schema/user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SongPage() {
  const session = await auth();
  const data = await db.select().from(bios);

  if (!data) throw new Error("Failed to fetch data");
  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/");

  return (
    <Main className="flex min-h-screen flex-col items-center p-24">
      {data?.map((item) => (
        <div key={`song-${item.id}`} className="grid grid-cols-4 px-2 py-1">
          <div className="px-4">{item.id}</div>
          <div className="px-4">{item.bio}</div>
          <div className="px-4">{item.userId.slice(0, 10)}</div>
          <DeleteBioButton id={item.id} userId={item.userId} />
        </div>
      ))}

      <Separator className="my-4" />
      <BioForm />
    </Main>
  );
}
