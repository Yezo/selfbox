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
import { LoadingIcon } from "@/components/layout/LoadingIcon";
import { Suspense } from "react";
import { H2 } from "@/components/layout/H2";
import { Separator } from "@/components/ui/separator";

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
      <Main className="md:p-12 lg:p-24">
        <header className="flex items-center gap-4">
          <UserAvatar
            image={image}
            name={name}
            username={username}
            size={"large"}
          />

          <div>
            <H2 className="tracking-tight">Settings</H2>
            <Paragraph className="text-sm font-medium tracking-tight">
              Edit your Selfbox account
            </Paragraph>
          </div>
        </header>

        <Separator className="my-4" />

        <Suspense
          fallback={
            <div className="grid min-h-screen min-w-full place-items-center">
              <LoadingIcon />
            </div>
          }
        >
          {children}
        </Suspense>
      </Main>
      <Footer />
    </>
  );
}
