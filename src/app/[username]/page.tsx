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
  const oldSocialMedia = await getUserSocialMedia(session?.user.id!);
  //Either the current user is logged in or logged out
  //If they are logged out, they have no session, and can view any profile
  //If they are logged in, they have a session, and can view any profile
  //ifLoggedIn, ifHasSession, showEditProfileButton
  //ifLoggedIn, ifHasSession, ifViewOtherProfile, hideEditProfileButton
  return (
    <Main className="grid place-items-center py-8">
      {checkIfUsersMatch ? (
        <Suspense fallback=<LoadingIcon />>
          <SessionProfile oldSocialMedia={oldSocialMedia} />
        </Suspense>
      ) : (
        <Suspense fallback=<LoadingIcon />>
          <DatabaseProfile pathnameUsername={pathnameUsername} />
        </Suspense>
      )}
    </Main>
  );
}
