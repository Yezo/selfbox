import { BugFixBadge } from "@/components/layout/BugFixBadge";
import { H2 } from "@/components/layout/H2";
import { H3 } from "@/components/layout/H3";
import { ImprovementBadge } from "@/components/layout/ImprovementBadge";
import { Paragraph } from "@/components/layout/Paragraph";
import { ReleaseBadge } from "@/components/layout/ReleaseBadge";
import { UL } from "@/components/layout/UL";
import { UpdateBadge } from "@/components/layout/UpdateBadge";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ChangelogSectionProps = {
  className?: string;
  children?: React.ReactNode;
  badgeTypes: ("release" | "update" | "improvement" | "bugfix")[];
  date: string;
  mainTitle: string;
  mainDescription: string;
  subTitle?: string;
  subDescription?: string;
  bulletItems?: string[];
  imageURL?: string;
  imageAltDescription?: string;
};

export const ChangelogSection = ({
  className,
  children,
  badgeTypes,
  date,
  imageURL,
  imageAltDescription,
  mainTitle,
  mainDescription,
  subTitle,
  subDescription,
  bulletItems,
}: ChangelogSectionProps) => {
  const hasReleaseBadge = badgeTypes.filter((item) => item === "release");
  const hasUpdateBadge = badgeTypes.filter((item) => item === "update");
  const hasBugFixBadge = badgeTypes.filter((item) => item === "bugfix");
  const hasImprovementBadge = badgeTypes.filter(
    (item) => item === "improvement",
  );

  console.log(badgeTypes);
  return (
    <div
      className={cn(
        "flex max-w-[850px] flex-col gap-8 md:flex-row md:gap-20",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="h-[22px] w-[2px] bg-emerald-400" />
        <div className="font-bricolage">{date}</div>
      </div>
      {hasBugFixBadge}
      <section className="flex max-w-[600px] flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1">
          {hasReleaseBadge && <ReleaseBadge />}
          {hasUpdateBadge && <UpdateBadge />}
          {hasBugFixBadge && <BugFixBadge />}
          {hasImprovementBadge && <ImprovementBadge />}
        </div>
        <H2 className="font-bricolage">{mainTitle}</H2>
        {imageURL && imageAltDescription && (
          <Image
            src={imageURL}
            alt={imageAltDescription}
            width={600}
            height={450}
            className="object-cover"
            quality={100}
          />
        )}
        <Paragraph>{mainDescription}</Paragraph>

        {subTitle && subDescription && (
          <Paragraph className="mt-4">{subDescription}</Paragraph>
        )}

        {bulletItems && (
          <>
            <H3 className="mt-8">Other updates</H3>
            <UL className="list-disc pl-[14px]">
              {bulletItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </UL>
          </>
        )}

        {children && children}
      </section>
    </div>
  );
};
