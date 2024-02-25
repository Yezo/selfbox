import { WorkInProgress } from "@/components/layout/WorkInProgress";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
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
      <SettingsHeader title="Email settings" />
      <WorkInProgress />
    </>
  );
}
