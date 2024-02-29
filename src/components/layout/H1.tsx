import { cn } from "@/lib/utils";

type H1Props = {
  className?: string;
  children: React.ReactNode;
};

export const H1 = ({ className, children }: H1Props) => {
  return (
    <h1 className={cn("font-bricolage text-5xl font-medium", className)}>
      {children}
    </h1>
  );
};
