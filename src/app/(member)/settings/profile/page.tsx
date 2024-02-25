import { SettingsProfileForm } from "@/components/forms/SettingsProfileForm";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { getUserProfileById } from "@/db/actions/settings";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await auth();
  const userProfile = await getUserProfileById(session?.user.id);
  if (!session?.user) redirect("/signup");
  const {
    user: { username, name, id },
  } = session;

  return (
    <>
      <SettingsHeader title="Public profile" />
      <SettingsProfileForm
        oldUsername={username}
        oldName={name}
        userId={id}
        oldUserProfile={userProfile}
      />
    </>
  );
}
