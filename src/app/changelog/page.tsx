import { Footer } from "@/components/layout/Footer";
import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/nav/navbar";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkIcon,
  CodeIcon,
  DrawingPinIcon,
  GlobeIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default async function ChangelogPage() {
  return (
    <>
      <Navbar />
      <Main className="mx-auto min-h-[600px] max-w-[950px] py-8 pt-20 lg:min-h-[850px]">
        <h1 className="mb-8 font-bricolage text-3xl">Changelog</h1>
        <section className="flex max-w-[850px] gap-20">
          <div className="flex gap-4">
            <div className="h-[22px] w-[2px] bg-emerald-400" />
            <div className="font-bricolage">February 1st, 2024</div>
          </div>
          <section className="flex max-w-[600px] flex-col gap-4">
            <div className="flex flex-wrap items-center gap-1">
              <ReleaseBadge />
            </div>
            <h2 className="font-bricolage text-2xl">
              Introducing "Selfbox" — the next generational link-in-bio platform
            </h2>
            <Image
              src={"/trackr.png"}
              alt={"ye"}
              width={600}
              height={450}
              className="object-cover"
              quality={100}
            />
            <p className="text-sm leading-7 text-gray">
              Today marks the initial release of Selfbox to the public. Selfbox
              is a new link-in-bio platform that aims to promote its users and
              help grow their brand. Whether they are a content creator, a
              professional, or the average hobbyist, everyone can curate their
              own Selfbox and express themselves freely.
            </p>

            <h3 className="mt-8 font-bricolage">Other updates</h3>
            <ul className="list-disc pl-[14px] text-sm leading-7 text-gray">
              <li>
                Users can create an account and log in using email, Google, or
                GitHub
              </li>
              <li>Add support for adding and editing social media links</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                non?
              </li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </section>
        </section>

        {/* <Separator className="mt-8 max-w-[850px]" /> */}
      </Main>
      <div className="container p-24">{/* <Footer /> */}</div>
    </>
  );
}

export const ImprovementBadge = () => {
  return (
    <div className="flex max-w-fit select-none items-center gap-1 self-center rounded-md border border-black/50 bg-emerald-500/10 px-2 text-[0.7rem] font-medium leading-5 text-emerald-400 shadow-sm">
      <MagicWandIcon className="h-3 w-3" />
      Improvement
    </div>
  );
};

export const ReleaseBadge = () => {
  return (
    <div className="flex max-w-fit select-none items-center gap-1 self-center rounded-md border border-black/50 bg-violet-500/10 px-2 text-[0.7rem] font-medium leading-5 text-violet-400 shadow-sm">
      <GlobeIcon className="h-3 w-3" />
      Release
    </div>
  );
};

export const UpdateBadge = () => {
  return (
    <div className="flex max-w-fit select-none items-center gap-1 self-center rounded-md border border-black/50 bg-sky-500/10 px-2 text-[0.7rem] font-medium leading-5 text-sky-400 shadow-sm">
      <DrawingPinIcon className="h-3 w-3" />
      Update
    </div>
  );
};

export const BugFixBadge = () => {
  return (
    <div className="flex max-w-fit select-none items-center gap-1 self-center rounded-md border border-black/50 bg-red-500/10 px-2 text-[0.7rem] font-medium leading-5 text-red-400 shadow-sm">
      <CodeIcon className="h-3 w-3" />
      Bug Fix
    </div>
  );
};
