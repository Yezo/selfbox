import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SelfboxLogo } from "@/components/layout/SelfboxLogo";
import { MainNav } from "@/lib/nav";
import { LoginButton } from "@/components/layout/LoginButton";
import { SignUpButton } from "@/components/layout/SignUpButton";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileNavDropdownProps = {
  className?: string;
};

export const MobileNavDropdown = ({ className }: MobileNavDropdownProps) => {
  return (
    <Sheet>
      <SheetTrigger className="rounded-md bg-neutral-900 p-2 md:hidden">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="h-[400px] border-b ">
        <SheetHeader className="mt-8">
          <SheetTitle>
            <SelfboxLogo type="dark" />
          </SheetTitle>
          <SheetDescription className="flex min-h-full flex-col justify-between gap-4 pt-12 text-left">
            {MainNav.map(({ name, url }) => (
              <Link
                href={url}
                key={name}
                className="transition-colors duration-300 hover:text-white"
              >
                {name}
              </Link>
            ))}

            <LoginButton />
            <SignUpButton />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
