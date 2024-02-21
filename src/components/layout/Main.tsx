import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MainProps = {
  className?: string;
  children: ReactNode;
};

export const Main = ({ className, children }: MainProps) => {
  return <main className={cn("container", className)}>{children}</main>;
};
