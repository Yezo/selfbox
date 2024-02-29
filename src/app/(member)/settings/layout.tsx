import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { Navbar } from "@/components/nav/MainNavbar";
import { auth } from "@/lib/auth";
import { capitalizeEveryWord } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Paragraph } from "@/components/layout/Paragraph";

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

            <Paragraph className="font-bricolage text-sm">
              {capitalizeEveryWord(username)}
              {name && ` • ${capitalizeEveryWord(name)}`}
            </Paragraph>
          </div>
        </header>

        <div className="flex">
          <SettingsAsideNav />
          <section className="basis-4/5">{children}</section>
        </div>
      </Main>
      <Footer />
    </>
  );
}
