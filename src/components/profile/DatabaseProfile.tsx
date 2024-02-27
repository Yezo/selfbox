import { H1 } from "@/components/layout/H1";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { getUserProfileById } from "@/db/actions/settings";
import { getUserByUsername, getUserSocialMedia } from "@/db/actions/user";
import {
  capitalizeEveryWord,
  handleSocialMediaSuffix,
  removeURLPrefixes,
} from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Url } from "next/dist/shared/lib/router/router";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/profile/SectionBlock";
import Image from "next/image";
import Link from "next/link";
import {
  socialMediaListOne,
  socialMediaListTwo,
  tvShowsList,
  moviesList,
  booksList,
} from "@/lib/temp";
import { generateSocialMediaIcon } from "@/components/profile/SessionProfile";

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
      <header className="flex min-w-full flex-col items-center justify-center gap-2">
        <UserAvatar
          image={databaseUser.image}
          name={databaseUser.name}
          username={databaseUser.username}
          size={"large"}
        />
        <div className="text-center">
          <H1> {capitalizeEveryWord(databaseUser?.name)}</H1>

          <div className="space-x-2">
            {databaseUser && (
              <Link
                href={databaseUser.username as Url}
                className="inline-flex items-center rounded-md border bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-gray transition-colors hover:bg-neutral-800 hover:text-white focus:border-2 focus:outline-none"
              >
                @
                {databaseUser &&
                  databaseUser.username &&
                  databaseUser?.username.toLowerCase()}
              </Link>
            )}

            {databaseUserProfile?.website && (
              <Link
                href={databaseUserProfile?.website as Url}
                className="inline-flex items-center rounded-md border bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-gray transition-colors hover:bg-neutral-800 hover:text-white focus:border-2 focus:outline-none"
              >
                {removeURLPrefixes(databaseUserProfile?.website)}
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="">
        <div className="space-y-12 py-8">
          {databaseUserProfile?.bio && (
            <SectionBlock title="About Me">
              {databaseUserProfile?.bio}
            </SectionBlock>
          )}

          {arrWithObjs && (
            <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
              <h2 className="font-semibold">Socials</h2>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray">
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

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Favorite TV shows</h2>
            <div className="grid grid-cols-5 gap-1 text-sm text-gray">
              {tvShowsList.map((item) => (
                <Image
                  key={item}
                  src={item}
                  alt="ye"
                  width="125"
                  height="350"
                  className="max-h-[125px] min-h-[125px] rounded border"
                />
              ))}
            </div>
          </div>

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Favorite movies</h2>
            <div className="grid grid-cols-5 gap-1 text-sm text-gray">
              {moviesList.map((item) => (
                <Image
                  key={item}
                  src={item}
                  alt="ye"
                  width="125"
                  height="350"
                  className="max-h-[125px] min-h-[125px] rounded border"
                />
              ))}
            </div>
          </div>

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Favorite books</h2>
            <div className="grid grid-cols-5 gap-1 text-sm text-gray">
              {booksList.map((item) => (
                <Image
                  key={item}
                  src={item}
                  alt="ye"
                  width="125"
                  height="350"
                  className="max-h-[125px] min-h-[125px] rounded border"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
