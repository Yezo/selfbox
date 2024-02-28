import { getUserProfileById } from "@/db/actions/settings";
import { auth } from "@/lib/auth";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { SectionBlock } from "@/components/profile/SectionBlock";
import { H1 } from "@/components/layout/H1";
import {
  capitalizeEveryWord,
  handleSocialMediaSuffix,
  removeURLPrefixes,
} from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Url } from "next/dist/shared/lib/router/router";
import { EditProfileForm } from "@/components/forms/EditProfile";
import { OldSocialMediaType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import {
  socialMediaListOne,
  socialMediaListTwo,
  tvShowsList,
  moviesList,
  booksList,
} from "@/lib/temp";
import { getUserSocialMedia } from "@/db/actions/user";
import {
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
  GitHubLogoIcon,
  TwitchIcon,
  TikTokIcon,
  PatreonIcon,
  BehanceIcon,
} from "@/styles/icons";
import { Suspense } from "react";
import { LoadingIcon } from "@/components/layout/LoadingIcon";

type SessionProfileProps = {
  oldSocialMedia: OldSocialMediaType;
};
export function generateSocialMediaIcon(website: string) {
  if (website === "twitter") return <TwitterIcon size="small" />;
  if (website === "instagram") return <InstagramIcon size="small" />;
  if (website === "linkedin") return <LinkedInIcon size="small" />;
  if (website === "github") return <GitHubLogoIcon size="small" />;
  if (website === "youtube") return <YoutubeIcon size="small" />;
  if (website === "twitch") return <TwitchIcon size="small" />;
  if (website === "tiktok") return <TikTokIcon size="small" />;
  if (website === "patreon") return <PatreonIcon size="small" />;
  if (website === "behance") return <BehanceIcon size="small" />;
}

export const SessionProfile = async ({
  oldSocialMedia,
}: SessionProfileProps) => {
  const session = await auth();
  const userProfile = await getUserProfileById(session?.user.id);
  const userSocialMedia = await getUserSocialMedia(session?.user.id!);
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
      <header className="grid place-items-center">
        <header className="flex min-w-[500px] max-w-[500px] self-center">
          <div className="basis-1/5"></div>
          <div className="basis-4/5">
            <div className="flex flex-col items-center justify-center">
              <UserAvatar
                image={session?.user.image}
                name={session?.user.name}
                username={session?.user.username}
                size={"large"}
              />
              <div className="text-center">
                <H1> {capitalizeEveryWord(session?.user.name)}</H1>

                {userProfile?.website && (
                  <div className="space-x-2">
                    <Link
                      href={userProfile.website as Url}
                      className="inline-flex items-center rounded-md border bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-gray transition-colors hover:bg-neutral-800 hover:text-white focus:border-2 focus:outline-none"
                    >
                      @{session?.user.username.toLowerCase()}
                    </Link>

                    <Link
                      href={userProfile.website as Url}
                      className="inline-flex items-center rounded-md border bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-gray transition-colors hover:bg-neutral-800 hover:text-white focus:border-2 focus:outline-none"
                    >
                      {removeURLPrefixes(userProfile.website)}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="basis-1/5 items-end">
            <div className="flex justify-end">
              <Suspense fallback={<LoadingIcon />}>
                <EditProfileForm
                  username={session?.user.username}
                  name={session?.user.name}
                  userProfile={userProfile}
                  userId={session?.user.id}
                  oldSocialMedia={oldSocialMedia}
                />
              </Suspense>
            </div>
          </div>
        </header>
      </header>

      <section className="grid place-items-center">
        <div className="space-y-12 py-8">
          <SectionBlock title="About Me">{userProfile?.bio}</SectionBlock>

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
          {/* 
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
          </div> */}
        </div>
      </section>
    </>
  );
};
