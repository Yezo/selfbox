import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type H1Props = {
  className?: string;
  children: ReactNode;
};

export const H1 = ({ className, children }: H1Props) => {
  return (
    <h1 className={cn("font-bricolage text-2xl font-bold", className)}>
      {children}
    </h1>
  );
};
