import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      {children}
      <footer className="grid place-items-center gap-2 pb-8 pt-8">
        <Link
          href={session ? "/" : "/signup"}
          className="flex max-w-fit items-center gap-2 rounded-full bg-white px-4 py-2 font-bricolage text-sm font-semibold text-black/90"
        >
          <Image
            src="/images/logo/patreon.png"
            alt="Selfbox's logo"
            width={18}
            height={18}
            className="text-black"
          />
          {session ? "selfbox." : "selfbox.com/you"}
        </Link>
        {!session && (
          <div className="font-bricolage text-sm">
            <Link
              href="/signup"
              className="pb-2 underline underline-offset-[3px]"
            >
              Sign up
            </Link>{" "}
            for free
          </div>
        )}
      </footer>
    </>
  );
}
