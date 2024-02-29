import { Badge } from "@/components/layout/Badge";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";

type AvailableBadgeProps = {
  className?: string;
};

export const AvailableBadge = ({ className }: AvailableBadgeProps) => {
  return (
    <Badge className={cn("bg-green-500/10 text-green-400", className)}>
      <CheckIcon className="h-3 w-3" /> Available!
    </Badge>
  );
};
