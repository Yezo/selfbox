import { SettingsForm } from "@/components/forms/SettingsForm";
import { SettingsProfileForm } from "@/components/forms/SettingsProfileForm";
import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { Navbar } from "@/components/nav/navbar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/signup");

  return (
    <>
      <Navbar />
      <Main className="space-y-12 p-24">
        <header className="flex items-center gap-2">
          <UserAvatar
            image={session.user.image}
            name={session.user.name}
            username={session.user.username}
            size={"large"}
          />
          <div>
            <H1>Settings</H1>
            <p className="font-bricolage text-sm text-gray">
              {session.user.name || session.user.username}
            </p>
          </div>
        </header>

        <div className="flex">
          <SettingsAsideNav />
          <div className="basis-4/5">
            <h2 className="font-bricolage text-xl font-semibold">
              Public profile
            </h2>
            <Separator className="my-4" />
            <SettingsProfileForm
              oldUsername={session.user.username}
              oldName={session.user.name}
            />
          </div>
        </div>
      </Main>
    </>
  );
}
