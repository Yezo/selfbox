import { Badge } from "@/components/layout/Badge";
import { cn } from "@/lib/utils";
import { CodeIcon } from "@radix-ui/react-icons";

type BugFixBadgeProps = {
  className?: string;
};

export const BugFixBadge = ({ className }: BugFixBadgeProps) => {
  return (
    <Badge className={cn("bg-red-500/10 text-red-400", className)}>
      <CodeIcon className="h-3 w-3" /> Bug Fix
    </Badge>
  );
};
