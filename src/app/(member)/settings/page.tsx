import { SettingsForm } from "@/components/forms/SettingsForm";
import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { Navbar } from "@/components/nav/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/signup");
  if (session.user) redirect("/settings/profile");
  const {
    user: { username, name, image },
  } = session;

  return (
    <>
      <Navbar />
      <Main className="space-y-12 p-24">
        <header className="flex items-center gap-2">
          <UserAvatar
            image={image}
            name={name}
            username={username}
            size={"large"}
          />
          <div>
            <H1>Settings</H1>
            <p className="font-bricolage text-sm text-gray">
              {name || username}
            </p>
          </div>
        </header>

        <div className="flex">
          <SettingsAsideNav />
          <div className="basis-4/5">
            <SettingsForm username={username} />
          </div>
        </div>
      </Main>
    </>
  );
}
