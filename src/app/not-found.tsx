"use client";

import { usePathname } from "next/navigation";
import { FooterLogo } from "@/components/layout/FooterLogo";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const pathname = usePathname();

  function handlePathname(inputString: string) {
    // Count the occurrences of "/"
    const slashCount = (inputString.match(/\//g) || []).length;

    // Check the count and process accordingly
    if (slashCount === 1) {
      // Remove the "/" and return the modified string
      return inputString.replace("/", "");
    } else if (slashCount > 1) {
      // Return null if there are multiple "/"
      return null;
    } else {
      // Return the original string if there is no "/"
      return inputString;
    }
  }

  const newPathname = handlePathname(pathname);
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-[650px] flex-col justify-between py-8">
        <div>
          <div className="mb-12 mt-36 flex items-center justify-center ">
            <Image
              src={"/images/logo/selfbox-light.png"}
              alt="Selfbox's logo"
              width="100"
              height="100"
            />
          </div>
          <div className="mb-6 flex flex-col items-center gap-1 ">
            <AvailableBadge />
            <MainLink path={newPathname?.toLowerCase()}></MainLink>
          </div>
          <Description path={newPathname?.toLowerCase()} />
        </div>

        <div className="grid place-items-center ">
          <FooterLogo url={"/"} label={"selfbox."} />
        </div>
      </main>
    </>
  );
}

const AvailableBadge = () => {
  return (
    <div className="flex max-w-fit select-none items-center self-center rounded-md border border-black/50 bg-emerald-500/10 px-3 text-[0.7rem] font-medium leading-5 text-emerald-400 shadow-sm">
      Available!
    </div>
  );
};

const MainLink = ({ path }: { path: string | undefined }) => {
  return (
    <Link
      href={`${path ? `/signup?username=${path?.toLowerCase()}` : `/signup`}`}
      className="group relative inline-block cursor-pointer rounded-md bg-slate-800 p-px text-xs font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900"
    >
      <span className="absolute inset-0  overflow-hidden rounded-md">
        <span className="absolute inset-0 rounded-md bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative z-10 flex items-center space-x-2 rounded-md bg-zinc-950 px-4 py-2 font-bricolage text-lg">
        <span className="text-gray">
          selfbox.com/
          <span className="text-white">{path}</span>
        </span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-yellow-400/0 via-yellow-400/90 to-yellow-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </Link>
  );
};

const Description = ({ path }: { path: string | undefined }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 md:flex-row">
      <p className="text-gray">
        <span className=" text-white">@{path}</span> could be yours —{" "}
      </p>
      <Link
        href={`/signup?username=${path}`}
        className=" font-semibold text-white underline underline-offset-4"
      >
        create your Selfbox now.
      </Link>{" "}
    </div>
  );
};
