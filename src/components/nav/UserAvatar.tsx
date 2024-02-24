"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstTwoLettersOfUser } from "@/lib/utils";

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
    <Avatar className={`${size === "large" ? "h-12 w-12" : "h-8 w-8"}`}>
      {image && <AvatarImage src={image} />}

      <AvatarFallback>
        <AvatarFallback
          className={`flex h-full w-full items-center justify-center bg-white font-bricolage font-semibold uppercase tracking-tighter text-black/90`}
        >
          {getFirstTwoLettersOfUser(name, username)}
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
};
