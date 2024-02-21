import { LoginButton } from "@/components/layout/LoginButton";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { SignUpButton } from "@/components/layout/SignUpButton";
import { auth, signOut } from "@/lib/auth";
import { MainNav } from "@/lib/nav";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  const linkCSS = `transition-colors duration-300 hover:cursor-pointer hover:text-white`;

  return (
    <header className="container flex h-16 items-center px-24 py-12">
      <nav className="flex min-w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-bricolage text-lg font-semibold">
            selfbox.
          </Link>

          <ul className="flex gap-10 text-[0.825rem] text-gray">
            {MainNav.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  className="transition-colors duration-300 hover:cursor-pointer hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          {session && session.user ? (
            <SignOutButton
              signOut={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
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
