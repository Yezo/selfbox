import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type FooterLogoProps = {
  className?: string;
  url: string;
  label: string;
};

export const FooterLogo = ({ className, url, label }: FooterLogoProps) => {
  return (
    <Link
      href={url}
      className={cn(
        "flex max-w-fit items-center gap-2 rounded-full bg-white px-4 py-2 font-bricolage text-sm font-semibold text-black/90",
        className,
      )}
    >
      <Image
        src="/images/logo/selfbox.png"
        alt="Selfbox's logo"
        width={18}
        height={18}
        className="text-black"
      />
      {label}
    </Link>
  );
};
