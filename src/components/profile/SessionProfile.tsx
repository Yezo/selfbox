import Link from "next/link";
import { Suspense } from "react";
import { LoadingIcon } from "@/components/layout/LoadingIcon";
import { Badge } from "@/components/layout/Badge";
import { auth } from "@/lib/auth";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { SectionBlock } from "@/components/profile/SectionBlock";
import { H1 } from "@/components/layout/H1";
import { Url } from "next/dist/shared/lib/router/router";
import { EditProfileForm } from "@/components/forms/EditProfile";
import { OldSocialMediaType } from "@/types/types";
import { getUserProfileById, getUserSocialMedia } from "@/db/actions/user";
import {
  capitalizeEveryWord,
  handleSocialMediaSuffix,
  removeURLPrefixes,
} from "@/lib/utils";
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
      <header className="grid place-items-center ">
        <header className="flex min-w-full self-center pb-8 md:min-w-[500px] md:max-w-[500px]">
          <div className="basis-1/5"></div>
          <div className="basis-4/5">
            <div className="flex flex-col items-center justify-center gap-4">
              <UserAvatar
                image={session?.user.image}
                name={session?.user.name}
                username={session?.user.username}
                size={"large"}
              />
              <div className="text-center">
                <H1 className="text-3xl">
                  {capitalizeEveryWord(session?.user.name)}
                </H1>

                <div className="flex items-center gap-2">
                  {session?.user.username && (
                    <Link href={`/${session?.user.username}`}>
                      <Badge>@{session?.user.username.toLowerCase()}</Badge>
                    </Link>
                  )}

                  {userProfile?.website && (
                    <Link href={userProfile.website as Url}>
                      <Badge>{removeURLPrefixes(userProfile.website)}</Badge>
                    </Link>
                  )}
                </div>
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
        <div className="flex min-w-full flex-col gap-12 self-center md:min-w-[500px] md:max-w-[500px]">
          <SectionBlock title="About Me">{userProfile?.bio}</SectionBlock>

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
