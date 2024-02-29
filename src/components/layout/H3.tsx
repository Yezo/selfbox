import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type H3Props = {
  className?: string;
  children: ReactNode;
};

export const H3 = ({ className, children }: H3Props) => {
  return <h3 className={cn("font-bricolage", className)}>{children}</h3>;
};
