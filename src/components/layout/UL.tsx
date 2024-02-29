import { cn } from "@/lib/utils";

type ULProps = {
  className?: string;
  children: React.ReactNode;
};

export const UL = ({ className, children }: ULProps) => {
  return <ul className={cn("leading-7 text-gray", className)}>{children}</ul>;
};
