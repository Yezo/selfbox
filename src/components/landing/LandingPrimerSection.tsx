import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CaretRightIcon, ComponentInstanceIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/layout/Badge";
import { Paragraph } from "@/components/layout/Paragraph";
import { LandingSeparator } from "@/components/landing/LandingSeparator";
import { H2 } from "@/components/layout/H2";

export const LandingPrimerSection = () => {
  return (
    <section className="flex flex-col-reverse gap-20 xl:flex-row xl:items-center">
      <Image
        src={"/images/hero.png"}
        alt="Picture of something"
        className="object-cover shadow-md xl:max-h-[701px] xl:max-w-[715px]"
        width={715}
        height={701}
        quality={100}
        priority={true}
      />
      <div className="flex-1 space-y-4">
        <Badge className="bg-teal-500/10 text-teal-400">
          <ComponentInstanceIcon className="h-3 w-3" /> Our Identity
        </Badge>

        <H2>What is Selfbox?</H2>

        <LandingSeparator />

        <Paragraph className="max-w-[625px]">
          Selfbox is the next generational link-in-bio platform for content
          creators, professionals, and the average hobbyist.
        </Paragraph>

        <Paragraph className="max-w-[625px]">
          Claim your handle, store and manage the links related to your brand,
          and showcase your interests and hobbies for the world to see.
        </Paragraph>

        <Button asChild className="mb-24 mr-4 mt-4 h-10">
          <Link href="/">
            Learn more <CaretRightIcon />
          </Link>
        </Button>

        <Button
          asChild
          className="mb-24 mt-4 h-10 hover:bg-transparent"
          variant={"ghost"}
        >
          <Link href="/">
            Contact <CaretRightIcon className="text-sky-300" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
