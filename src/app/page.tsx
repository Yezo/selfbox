import { Main } from "@/components/layout/Main";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { auth, signOut } from "@/lib/auth";
import { LoginButton } from "@/components/layout/LoginButton";
import { SignUpButton } from "@/components/layout/SignUpButton";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";

export default async function Home() {
  const session = await auth();
  if (session && session.user && !session?.user.username) redirect("/username");
  return (
    <>
      <Navbar />
      <Main className="flex min-h-screen flex-col items-center p-24">
        <Separator className="my-4" />
        <h1>
          {session
            ? `Hello, ${session?.user.name} with id ${session?.user.id}.`
            : "You are currently not logged in."}
        </h1>
        <Separator className="my-4" />

        <div>Username: {session?.user.username}</div>
        <div className="flex gap-2">
          {session && session.user ? (
            <SignOutButton
              signOut={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            />
          ) : (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          )}
        </div>

        <Separator className="my-4" />
      </Main>
    </>
  );
}
