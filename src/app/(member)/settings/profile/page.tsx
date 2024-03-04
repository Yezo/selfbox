import { SettingsProfileForm } from "@/components/forms/SettingsProfileForm";
import { LoadingIcon } from "@/components/layout/LoadingIcon";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CustomUploadButton } from "@/components/ui/uploadthing/CustomUploadButton";
import { H2 } from "@/components/layout/H2";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { getUserProfileById } from "@/db/actions/user";
import Image from "next/image";

export default async function SettingsProfilePage() {
  const session = await auth();
  const userProfile = await getUserProfileById(session?.user.id);
  if (!session?.user) redirect("/signup");
  const {
    user: { username, name, id },
  } = session;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <SettingsAsideNav />

        <div className="basis-4/5">
          <div className="flex flex-col-reverse md:flex-row">
            {session && userProfile ? (
              <div className="basis-3/5">
                <H2 className="mb-4 tracking-tight">Public profile</H2>
                <SettingsProfileForm
                  oldUsername={username}
                  oldName={name}
                  userId={id}
                  oldUserProfile={userProfile}
                />
              </div>
            ) : (
              <div className="grid h-[400px] min-w-full place-items-center">
                <LoadingIcon />
              </div>
            )}
            <div className="mb-8 flex basis-2/5 flex-col gap-4 md:items-center">
              <div className="font-bricolage font-medium">User avatar</div>
              {session?.user.image && (
                <Image
                  src={`${session?.user.image}` ?? ""}
                  alt="ye"
                  width={135}
                  height={135}
                  quality={100}
                  className=" aspect-square rounded-md object-cover"
                />
              )}

              <CustomUploadButton
                userId={session?.user.id}
                oldImageURL={session?.user.image}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
