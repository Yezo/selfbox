"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GearIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { EditProfileProfileForm } from "@/components/forms/EditProfileProfileForm";
import { EditProfileSocialMediaForm } from "@/components/forms/EditProfileSocialMediaForm";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const searchParamsSchema = z.object({
  edit: z.optional(z.enum(["true", "false"])),
  profile: z.optional(z.enum(["0", "1"])),
  socials: z.optional(z.enum(["0", "1"])),
  favorites: z.optional(z.enum(["0", "1"])),
});

type SearchParams = z.TypeOf<typeof searchParamsSchema>;

type EditProfileFormsProps = {
  username: string | undefined;
  name: string | null | undefined;
  userProfile: {
    id: number;
    userId: string;
    bio: string | null;
    pronouns: "Do not specify" | "They/them" | "He/him" | "She/her" | null;
    website: string | null;
  } | null;
  userId: string | undefined;
  oldSocialMedia: {
    userId: string;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
  };
};

export function EditProfileForm({
  username,
  name,
  userProfile,
  userId,
  oldSocialMedia,
}: EditProfileFormsProps) {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams) as SearchParams;
  const validatedSearchParams = searchParamsSchema.parse(searchParamsObject);
  const { edit, profile, socials, favorites } = validatedSearchParams;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    if (open) setOpen(false);
    if (!open) setOpen(true);
    if (!username) return null;
    if (username && edit === "true") {
      return router.replace(`/${username.toLowerCase()}`);
    } else router.replace(`/${username.toLowerCase()}?edit=true&profile=1`);
  };

  const handleDialogTitle = () => {
    if (profile) return "Edit profile";
    if (socials) return "Edit social media and links";
    if (favorites) return "Edit your favorites";
    return "Edit deez";
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button
          className="flex h-7 cursor-pointer justify-end self-end rounded border bg-neutral-900 px-2 py-1 text-white hover:bg-neutral-900"
          onClick={() => setOpen(!open)}
        >
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-foreground/[.01] font-bricolage shadow-sm  sm:max-w-[425px] ">
        <UserProfileNavigation username={username!} />
        <div>
          <DialogHeader className="mb-4">
            <DialogTitle>{handleDialogTitle()}</DialogTitle>
          </DialogHeader>

          {profile && (
            <EditProfileProfileForm
              oldUsername={username!}
              oldName={name}
              oldUserProfile={userProfile}
              userId={userId!}
              setOpen={setOpen}
            />
          )}
          {socials && (
            <EditProfileSocialMediaForm
              username={username!}
              oldSocialMedia={oldSocialMedia}
              userId={userId}
              setOpen={setOpen}
            />
          )}
          {favorites && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface UserProfileNavigationProps {
  username: string;
}

const TABS = [
  { label: "Profile", route: "?edit=true&profile=1" },
  { label: "Social Media", route: "?edit=true&socials=1" },
  { label: "Favorites", route: "?edit=true&favorites=1" },
];

export function UserProfileNavigation({
  username,
}: UserProfileNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedTab =
    TABS.find((t) => t.route.includes(pathname.split("/").at(-1) || "")) ||
    TABS[0];

  const handleCock = (str: string) => {
    router.replace(str);
  };

  return (
    <nav className="custom-scroll pointer-events-auto relative mb-2 overflow-x-auto pb-2 pr-4">
      <Tabs defaultValue={selectedTab.route}>
        <TabsList aria-label="Competition Navigation">
          {TABS.map((tab) => (
            <div
              onClick={() =>
                handleCock(`${username.toLowerCase()}${tab.route}`)
              }
              key={tab.route}
            >
              <TabsTrigger value={tab.route}>{tab.label}</TabsTrigger>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
