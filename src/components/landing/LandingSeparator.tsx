import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type LandingSeparatorProps = {
  className?: string;
};

export const LandingSeparator = ({ className }: LandingSeparatorProps) => {
  return <Separator className={cn("max-w-[75px]", className)} />;
};
