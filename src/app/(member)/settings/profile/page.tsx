import { SettingsProfileForm } from "@/components/forms/SettingsProfileForm";
import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { SettingsAsideNav } from "@/components/nav/SettingsAsideNav";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { Navbar } from "@/components/nav/navbar";
import { Separator } from "@/components/ui/separator";
import { getUserProfileById } from "@/db/actions/settings";
import { auth } from "@/lib/auth";
import { capitalizeEveryWord } from "@/lib/utils";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await auth();
  const userProfile = await getUserProfileById(session?.user.id);
  if (!session?.user) redirect("/signup");
  const {
    user: { username, name, image, id },
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
              {capitalizeEveryWord(username)}
              {name && ` • ${capitalizeEveryWord(name)}`}
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
              oldUsername={username}
              oldName={name}
              userId={id}
              oldUserProfile={userProfile}
            />
          </div>
        </div>
      </Main>
    </>
  );
}
