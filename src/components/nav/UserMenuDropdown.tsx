"use client";

import { UserAvatar } from "@/components/nav/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirstTwoLettersOfUser } from "@/lib/utils";
import {
  ChevronDownIcon,
  ExitIcon,
  FileTextIcon,
  GearIcon,
  GitHubLogoIcon,
  HeartFilledIcon,
  LayersIcon,
  PersonIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserMenuDropdownProps = {
  name: string | null | undefined;
  username: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
};

export const UserMenuDropdown = ({
  name,
  username,
  image,
  email,
}: UserMenuDropdownProps) => {
  return (
    <>
      <div className="flex cursor-pointer items-center justify-between gap-2 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserAvatar image={image} name={name} username={username} />
                <div className="hidden sm:block">
                  {username ? (
                    <span className="font-bricolage font-medium capitalize">
                      {username}
                    </span>
                  ) : (
                    <Skeleton className="h-[20px] w-[100px] rounded-md" />
                  )}
                </div>
              </div>
              <ChevronDownIcon className="cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 mt-4 w-40 font-bricolage ">
            <DropdownMenuLabel>
              <p className="font-bricolage">{name ? name : username}</p>
              <p className="text-xs text-gray">{email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <MenuItem url={`/${username?.toLowerCase()}`} title="profile">
                <PersonIcon />
              </MenuItem>
              <MenuItem url="/pricing" title="pricing">
                <StarIcon />
              </MenuItem>

              <MenuItem url="/changelog" title="changelog">
                <LayersIcon />
              </MenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <MenuItem
              url="https://github.com/Yezo/selfbox"
              title="GitHub"
              external={true}
            >
              <GitHubLogoIcon />
            </MenuItem>

            <MenuItem
              url="https://kevinvo.me/"
              title="Developer"
              external={true}
            >
              <HeartFilledIcon />
            </MenuItem>
            <DropdownMenuSeparator />
            <MenuItem url="/settings" title="Settings">
              <GearIcon />
            </MenuItem>

            <DropdownMenuSeparator />

            <MenuItem url="/" title="Sign Out" onClick={() => signOut()}>
              <ExitIcon />
            </MenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

const MenuItem = ({
  url,
  title,
  children,
  onClick,
  external,
}: {
  url: string;
  title: string;
  children?: React.ReactNode;
  onClick?: () => Promise<undefined>;
  external?: boolean;
}) => {
  return (
    <Link href={url} onClick={onClick} target={external ? "_blank" : "_self"}>
      <DropdownMenuItem className="group/list-item flex w-full cursor-pointer flex-row items-center justify-start gap-2 truncate rounded-sm text-sm capitalize  text-white transition-colors hover:text-foreground dark:hover:text-white">
        {children}
        <span>{title}</span>
      </DropdownMenuItem>
    </Link>
  );
};
