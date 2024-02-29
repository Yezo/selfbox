import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { Navbar } from "@/components/nav/Navbar";
import { auth } from "@/lib/auth";
import { capitalizeEveryWord } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signup");
  const {
    user: { username, name, image },
  } = session;

  return (
    <>
      <Navbar />
      <Main className="space-y-12 p-24">
        <header className="flex items-center gap-4">
          <UserAvatar
            image={image}
            name={name}
            username={username}
            size={"large"}
          />
          <div>
            <H1>Settings</H1>

            <p className="font-bricolage text-sm text-gray">
              {capitalizeEveryWord(username)}
              {name && ` • ${capitalizeEveryWord(name)}`}
            </p>
          </div>
        </header>

        <div className="flex">
          <SettingsAsideNav />
          <section className="basis-4/5">{children}</section>
        </div>
      </Main>
    </>
  );
}
