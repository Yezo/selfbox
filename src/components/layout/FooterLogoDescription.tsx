import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type FooterLogoDescriptionProps = {
  className?: string;
  url: string;
};

export const FooterLogoDescription = ({
  className,
  url,
}: FooterLogoDescriptionProps) => {
  return (
    <div className="font-bricolage text-sm">
      <Link
        href={url}
        className={cn("pb-2 underline underline-offset-[3px]", className)}
      >
        Sign up
      </Link>{" "}
      for free
    </div>
  );
};
