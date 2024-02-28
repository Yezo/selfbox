import { Button } from "@/components/ui/button";
import { LinkIcon } from "@/components/layout/LinkIcon";
import { Separator } from "@/components/ui/separator";
import {
  CaretRightIcon,
  PersonIcon,
  GlobeIcon,
  StarIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

export const LandingPrimerSection = () => {
  return (
    <section className="flex items-center gap-20">
      <Image
        src={"/images/HeroImage.png"}
        alt="Picture of something"
        className="max-h-[701px] max-w-[715px] border-r object-cover shadow-md"
        width={715}
        height={701}
        quality={100}
        priority={true}
      />
      <div className="flex-1">
        <h2 className="mb-4 font-bricolage text-3xl font-semibold">
          What is Selfbox?
        </h2>

        <Separator className="mb-8 mt-4 max-w-[55px]" />
        <p className="mb-4 max-w-[625px] leading-7 tracking-[-.011em] text-gray">
          Selfbox is the next generational link-in-bio platform for content
          creators, professionals, and the average hobbyist.
        </p>
        <p className="mb-4 max-w-[625px] leading-7 tracking-[-.011em] text-gray">
          Claim your handle, store and manage the links related to your brand,
          and showcase your interests and hobbies for the world to see.
        </p>

        <Button asChild className="mb-24 mr-4 mt-4 h-10">
          <Link href="/">
            Learn more <CaretRightIcon />
          </Link>
        </Button>

        <Button asChild className="mb-24 mt-4 h-10" variant={"ghost"}>
          <Link href="/">
            Contact <CaretRightIcon className="text-sky-300" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
