import { H1 } from "@/components/layout/H1";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { getUserProfileById } from "@/db/actions/settings";
import { getUserByUsername, getUserSocialMedia } from "@/db/actions/user";
import {
  capitalizeEveryWord,
  handleSocialMediaSuffix,
  removeURLPrefixes,
} from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/profile/SectionBlock";
import Link from "next/link";
import { generateSocialMediaIcon } from "@/components/profile/SessionProfile";
import { Badge } from "@/components/layout/Badge";

type DatabaseProfileProps = {
  pathnameUsername: string;
};

export const DatabaseProfile = async ({
  pathnameUsername,
}: DatabaseProfileProps) => {
  const databaseUser = await getUserByUsername(pathnameUsername);
  const databaseUserProfile = await getUserProfileById(databaseUser?.id);
  if (!databaseUser) notFound();
  const userSocialMedia = await getUserSocialMedia(databaseUser.id);
  const arrWithObjs =
    userSocialMedia &&
    Object.entries(userSocialMedia)
      .filter(
        ([key, value]) =>
          value !== "" &&
          value !== undefined &&
          value !== null &&
          key !== "userId",
      )
      .map(([key, value]) => ({ [key]: value }));

  return (
    <>
      <header className="flex min-w-full flex-col items-center justify-center gap-4">
        <UserAvatar
          image={databaseUser.image}
          name={databaseUser.name}
          username={databaseUser.username}
          size={"large"}
        />
        <div className="text-center">
          <H1 className="text-3xl">
            {capitalizeEveryWord(databaseUser?.name)}
          </H1>

          <div className="flex items-center gap-2">
            {databaseUser.username && (
              <Link href={`/${databaseUser.username as Url}`}>
                <Badge>
                  @
                  {databaseUser &&
                    databaseUser.username &&
                    databaseUser?.username.toLowerCase()}
                </Badge>
              </Link>
            )}

            {databaseUserProfile?.website && (
              <Link href={databaseUserProfile?.website as Url}>
                <Badge>{removeURLPrefixes(databaseUserProfile?.website)}</Badge>
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="grid place-items-center">
        <div className="space-y-12 py-8">
          {databaseUserProfile?.bio && (
            <SectionBlock title="About Me">
              {databaseUserProfile?.bio}
            </SectionBlock>
          )}

          {arrWithObjs && (
            <div className="min-w-full space-y-2 font-bricolage md:min-w-[500px] md:max-w-[500px]">
              <h2 className="font-semibold">Socials</h2>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray md:grid-cols-2">
                {arrWithObjs.map((item) => {
                  const [key, value] = Object.entries(item)[0];
                  return (
                    <Link
                      key={key}
                      href={handleSocialMediaSuffix(key, value!)}
                      className="flex items-center gap-2 rounded border bg-neutral-900 p-2 font-semibold capitalize transition-colors duration-300 hover:bg-neutral-800  hover:text-white"
                      target="_blank"
                    >
                      <div className="">{generateSocialMediaIcon(key)}</div>
                      {key}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
