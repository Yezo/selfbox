import { UpdateUsernameForm } from "@/components/forms/UpdateUsername";
import { Main } from "@/components/layout/Main";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TestUsernamePage() {
  const session = await auth();
  //If there is no user session or if user already has a username, redirect home
  if (session?.user.username || !session) redirect("/");
  const {
    user: { username, id },
  } = session;

  return (
    <Main className="flex min-h-screen flex-col items-center  p-24">
      Change your username buddy.
      <div>Username: {username}</div>
      <Separator className="my-4" />
      <UpdateUsernameForm id={id} />
    </Main>
  );
}
