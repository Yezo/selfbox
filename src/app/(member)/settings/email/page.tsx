import { H2 } from "@/components/layout/H2";
import { WorkInProgress } from "@/components/layout/WorkInProgress";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsEmailPage() {
  const session = await auth();
  if (!session?.user) redirect("/signup");
  const {
    user: { username, name, image, id },
  } = session;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <SettingsAsideNav />

        <div className="basis-4/5">
          <div className="flex flex-col">
            <H2 className="mb-4 tracking-tight">Emails</H2>
            <WorkInProgress />
          </div>
        </div>
      </div>
    </>
  );
}
