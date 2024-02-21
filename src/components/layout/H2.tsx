import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type H2Props = {
  className?: string;
  children: ReactNode;
};

export const H2 = ({ className, children }: H2Props) => {
  return (
    <h2
      className={cn(
        "flex gap-1 font-bricolage tracking-tight text-gray",
        className,
      )}
    >
      {children}
    </h2>
  );
};
