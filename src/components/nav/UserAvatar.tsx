"use client";

import { getFirstTwoLettersOfUser } from "@/lib/utils";
import Image from "next/image";

type UserAvatarProps = {
  image: string | null | undefined;
  name: string | null | undefined;
  username: string | null | undefined;
  size?: "large" | "small";
};

export const UserAvatar = ({
  image,
  name,
  username,
  size,
}: UserAvatarProps) => {
  return (
    <>
      {image ? (
        <Image
          src={image}
          alt={`${username ? `${username}'s avatar` : `${name}'s avatar`}`}
          width="72"
          height="72"
          className={`relative flex aspect-square   shrink-0 overflow-hidden rounded border object-cover ${size === "large" ? "max-h-[72px] min-h-[72px]" : "max-h-[36px] min-h-[36px]"} `}
          quality={100}
        />
      ) : (
        <div
          className={`flex aspect-square  items-center justify-center rounded bg-white font-bricolage font-semibold uppercase tracking-tighter text-black/90 ${size === "large" ? "max-h-[72px] min-h-[72px]" : "max-h-[36px] min-h-[36px]"} `}
        >
          {getFirstTwoLettersOfUser(name, username)}
        </div>
      )}
    </>
  );
};
