import { SettingsProfileForm } from "@/components/forms/SettingsProfileForm";
import { LoadingIcon } from "@/components/layout/LoadingIcon";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { getUserProfileById } from "@/db/actions/settings";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
      <Suspense
        fallback={
          <div className="grid min-h-screen min-w-full place-items-center">
            <LoadingIcon />
          </div>
        }
      >
        <SettingsProfileForm
          oldUsername={username}
          oldName={name}
          userId={id}
          oldUserProfile={userProfile}
        />
      </Suspense>
    </>
  );
}
