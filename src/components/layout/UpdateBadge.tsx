import { Badge } from "@/components/layout/Badge";
import { cn } from "@/lib/utils";
import { DrawingPinIcon } from "@radix-ui/react-icons";

type UpdateBadgeProps = {
  className?: string;
};

export const UpdateBadge = ({ className }: UpdateBadgeProps) => {
  return (
    <Badge className={cn("bg-sky-500/10 text-sky-400", className)}>
      <DrawingPinIcon className="h-3 w-3" /> Update
    </Badge>
  );
};
