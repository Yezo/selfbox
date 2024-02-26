"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GearIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const searchParamsSchema = z.object({
  edit: z.optional(z.enum(["true", "false"])),
});

type SearchParams = z.TypeOf<typeof searchParamsSchema>;

type EditProfileFormsProps = {
  username: string | undefined;
};

export function EditProfileForm({ username }: EditProfileFormsProps) {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams) as SearchParams;
  const validatedSearchParams = searchParamsSchema.parse(searchParamsObject);
  const { edit } = validatedSearchParams;
  const router = useRouter();

  const onOpenChange = () => {
    if (!username) return null;
    if (username && edit === "true") {
      return router.replace(`/profile/${username.toLowerCase()}`);
    } else router.replace(`/profile/${username.toLowerCase()}?edit=true`);
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex h-7 cursor-pointer justify-end self-end rounded border bg-neutral-900 px-2 py-1 text-white hover:bg-neutral-900">
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="font-bricolage sm:max-w-[425px]">
        <UserProfileNavigation username={username!} />
        <div>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";

interface UserProfileNavigationProps {
  username: string;
}

const TABS = [
  { label: "Profile", route: "/" },
  { label: "Social Media", route: "/animelist" },
  { label: "Interests & hobbies", route: "/mangalist" },
];

export function UserProfileNavigation({
  username,
}: UserProfileNavigationProps) {
  const pathname = usePathname();
  const selectedTab =
    TABS.find((t) => t.route.includes(pathname.split("/").at(-1) || "")) ||
    TABS[0];

  return (
    <nav className="custom-scroll pointer-events-auto relative mb-2 overflow-x-auto pb-2">
      <Tabs defaultValue={selectedTab.route}>
        <TabsList aria-label="Competition Navigation">
          {TABS.map((tab) => (
            // <Link href={`/user/${username}${tab.route}`} key={tab.route}>
            <div key={tab.route}>
              <TabsTrigger value={tab.route}>{tab.label}</TabsTrigger>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
