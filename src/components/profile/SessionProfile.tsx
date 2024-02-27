import { getUserProfileById } from "@/db/actions/settings";
import { auth } from "@/lib/auth";
import { UserAvatar } from "@/components/nav/UserAvatar";
import { SectionBlock } from "@/components/profile/SectionBlock";
import { H1 } from "@/components/layout/H1";
import { capitalizeEveryWord, removeURLPrefixes } from "@/lib/utils";
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

type SessionProfileProps = {
  oldSocialMedia: OldSocialMediaType;
};

export const SessionProfile = async ({
  oldSocialMedia,
}: SessionProfileProps) => {
  const session = await auth();
  const userProfile = await getUserProfileById(session?.user.id);

  return (
    <>
      <div className="flex min-w-[500px] max-w-[500px]">
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

              <p className="font-bricolage text-sm text-gray">
                Full Stack Developer
              </p>

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
            <EditProfileForm
              username={session?.user.username}
              name={session?.user.name}
              userProfile={userProfile}
              userId={session?.user.id}
              oldSocialMedia={oldSocialMedia}
            />
          </div>
        </div>
      </div>

      <section className="">
        <div className="space-y-12 py-8">
          <SectionBlock title="About Me">{userProfile?.bio}</SectionBlock>

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Socials 1</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray">
              {socialMediaListOne.map((item) => (
                <Link
                  key={item}
                  href={item}
                  className="flex items-center gap-2 rounded border bg-neutral-900 p-2 font-semibold transition-colors duration-300 hover:bg-neutral-800 hover:font-bold hover:text-white"
                >
                  {item} <ArrowTopRightIcon />
                </Link>
              ))}
            </div>
          </div>

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Socials 2</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray">
              {socialMediaListTwo.map((item) => (
                <Link
                  key={item}
                  href={item}
                  className="flex items-center gap-2 rounded border bg-neutral-900 p-2 font-semibold transition-colors duration-300 hover:bg-neutral-800 hover:font-bold hover:text-white"
                >
                  {item} <ArrowTopRightIcon />
                </Link>
              ))}
            </div>
          </div>

          <div className="min-w-[500px] max-w-[500px] space-y-2 font-bricolage">
            <h2 className="font-semibold">Favorite TV shows</h2>
            <div className="grid grid-cols-5 gap-4 text-sm text-gray">
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
            <div className="grid grid-cols-5 gap-4 text-sm text-gray">
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
            <div className="grid grid-cols-5 gap-4 text-sm text-gray">
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
