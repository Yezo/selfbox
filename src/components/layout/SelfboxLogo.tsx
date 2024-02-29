import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SelfboxLogoProps = {
  className?: string;
  type: "dark" | "light";
};

export const SelfboxLogo = ({ className, type }: SelfboxLogoProps) => {
  return (
    <div
      className={cn(
        `font-bricolage text-lg font-medium text-[#f7f7f8] 
        ${type === "dark" && "text-[#f7f7f8]"}
        ${type === "light" && "text-[#0e0e0e]"}`,
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={`/images/logo/${type === "dark" ? "selfbox-light" : "selfbox-dark"}.png`}
          alt="Selfbox's logo"
          width={18}
          height={18}
          className="object-cover"
          quality={100}
        />
        selfbox.
      </Link>
    </div>
  );
};
