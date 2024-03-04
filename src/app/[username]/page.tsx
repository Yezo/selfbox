import { auth } from "@/lib/auth";
import { Main } from "@/components/layout/Main";
import { SessionProfile } from "@/components/profile/SessionProfile";
import { DatabaseProfile } from "@/components/profile/DatabaseProfile";
import { Suspense } from "react";
import { LoadingIcon } from "@/components/layout/LoadingIcon";
import { getUserSocialMedia } from "@/db/actions/user";

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();
  const pathnameUsername = params.username;
  const currentSessionUsername = session?.user.username.toLowerCase();
  const currentPathnameUsername = pathnameUsername.toLowerCase();
  const checkIfUsersMatch = currentSessionUsername === currentPathnameUsername;
  const oldSocialMedia = await getUserSocialMedia({ id: session?.user.id! });

  return (
    <Main className="min-h-[600px] py-8 lg:min-h-[850px]">
      {checkIfUsersMatch ? (
        <Suspense
          fallback={
            <div className="grid min-h-screen min-w-full place-items-center">
              <LoadingIcon />
            </div>
          }
        >
          <SessionProfile oldSocialMedia={oldSocialMedia} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="grid min-h-screen min-w-full place-items-center">
              <LoadingIcon />
            </div>
          }
        >
          <DatabaseProfile pathnameUsername={pathnameUsername} />
        </Suspense>
      )}
    </Main>
  );
}
