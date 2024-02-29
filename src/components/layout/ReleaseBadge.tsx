import { Badge } from "@/components/layout/Badge";
import { cn } from "@/lib/utils";
import { CodeIcon } from "@radix-ui/react-icons";

type ReleaseBadgeProps = {
  className?: string;
};

export const ReleaseBadge = ({ className }: ReleaseBadgeProps) => {
  return (
    <Badge className={cn("bg-violet-500/10 text-violet-400", className)}>
      <CodeIcon className="h-3 w-3" /> Release
    </Badge>
  );
};
