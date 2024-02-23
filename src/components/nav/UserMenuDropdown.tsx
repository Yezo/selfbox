"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArchiveIcon,
  ChevronDownIcon,
  ExitIcon,
  FileTextIcon,
  GearIcon,
  GitHubLogoIcon,
  HeartFilledIcon,
  LayersIcon,
  PersonIcon,
  StarFilledIcon,
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
  function getFirstTwoLettersOfUser() {
    if (name) return name.slice(0, 2);
    if (!name && username) return username.slice(0, 2);
    return "??";
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {image && <AvatarImage src={image} />}

                  <AvatarFallback>
                    <AvatarFallback className="flex h-full w-full items-center justify-center bg-sky-300 font-bricolage font-semibold uppercase tracking-tighter text-black/90">
                      {getFirstTwoLettersOfUser()}
                    </AvatarFallback>
                  </AvatarFallback>
                </Avatar>
                <div>
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
          <DropdownMenuContent className="mt-4 w-40 font-bricolage">
            <DropdownMenuLabel>
              <p className="font-bricolage">{name ? name : username}</p>
              <p className="text-xs text-gray">{email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <MenuItem url="/profile" title="profile">
                <PersonIcon />
              </MenuItem>
              <MenuItem url="/pricing" title="pricing">
                <StarIcon />
              </MenuItem>
              <MenuItem url="/blog" title="blog">
                <FileTextIcon />
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
            <MenuItem url="/settings" title="Settings" external={true}>
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
