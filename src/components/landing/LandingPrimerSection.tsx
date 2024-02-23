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
    <section className="flex gap-20">
      <Image
        src={"/images/hero.webp"}
        alt="Picture of something"
        className="flex-1 object-cover"
        width={600}
        height={600}
        quality={100}
        priority={true}
      />
      <div className="flex-1">
        <h2 className="mb-4 font-bricolage text-3xl font-semibold">
          What is Selfbox?
        </h2>

        <Separator className="mb-8 mt-4 max-w-[55px]" />
        <p className="mb-4 max-w-[625px] leading-7 tracking-[-.011em] text-gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          tempora natus nemo, alias eveniet odio sint dolores modi veritatis
          voluptate reprehenderit non rerum temporibus mollitia officia
          molestias necessitatibus nam nihil quasi. Minima repellat deserunt,
          pariatur magni unde quia at quibusdam fugiat magnam enim doloremque
          praesentium recusandae, illo facilis laudantium distinctio quo
          quisquam sequi blanditiis maxime vitae dolor quis esse.
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

        <div className="grid grid-cols-2 gap-8">
          <div>
            <LinkIcon>
              <PersonIcon />
            </LinkIcon>

            <h3 className="font-bricolage font-semibold">Personal profile</h3>
            <p className="text-sm text-gray">
              Curate everything and anything about yourself all in one place.
            </p>
          </div>

          <div>
            <LinkIcon>
              <GlobeIcon />
            </LinkIcon>
            <h3 className="font-bricolage font-semibold">Links and media</h3>
            <p className="text-sm text-gray">
              Set your social media and personal links and watch the clicks roll
              in.
            </p>
          </div>

          <div>
            <LinkIcon>
              <StarIcon />
            </LinkIcon>
            <h3 className="font-bricolage font-semibold">
              Interests and favorites
            </h3>
            <p className="text-sm text-gray">
              Display your favorite activities for the world to see what's
              piquing your interests these days.
            </p>
          </div>

          <div>
            <LinkIcon>
              <BackpackIcon />
            </LinkIcon>
            <h3 className="font-bricolage font-semibold">
              Professional? Hobbyist?
            </h3>
            <p className="text-sm text-gray">
              Selfbox works both as a professional portfolio or an online
              portfolio for social media phenoms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
