import { Badge } from "@/components/layout/Badge";
import { cn } from "@/lib/utils";
import { MagicWandIcon } from "@radix-ui/react-icons";

type ImprovementBadgeProps = {
  className?: string;
};

export const ImprovementBadge = ({ className }: ImprovementBadgeProps) => {
  return (
    <Badge className={cn("bg-emerald-500/10 text-emerald-400", className)}>
      <MagicWandIcon className="h-3 w-3" /> Improvement
    </Badge>
  );
};
