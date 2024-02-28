import { LoginButton } from "@/components/layout/LoginButton";
import { SignUpButton } from "@/components/layout/SignUpButton";
import { auth } from "@/lib/auth";
import { MainNav } from "@/lib/nav";
import { UserMenuDropdown } from "@/components/nav/UserMenuDropdown";
import Link from "next/link";
import Image from "next/image";

export const Navbar = async () => {
  const session = await auth();

  //This navbar component does not refresh with the new session data
  //when a user signs in so long as this component exists in the root layout for whatever reason
  //Temporary fix: put the navbar in every page until bug is fixed
  return (
    <header className="container flex h-16 items-center px-24 py-12">
      <nav className="flex min-w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/selfbox-light.png"
              alt="Selfbox's logo"
              width={18}
              height={18}
              className="text-black"
            />
            <Link href="/" className="font-bricolage text-lg font-semibold">
              selfbox.
            </Link>
          </div>

          <ul className="flex gap-10 text-sm  text-gray">
            {MainNav.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  className="font-bricolage transition-colors duration-300 hover:cursor-pointer hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          {session && session.user ? (
            <UserMenuDropdown
              name={session.user.name}
              username={session.user.username}
              image={session.user.image}
              email={session.user.email}
            />
          ) : (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
