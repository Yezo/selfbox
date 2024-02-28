import { cn } from "@/lib/utils";
import { UpdateIcon } from "@radix-ui/react-icons";

export type LoadingIconProps = {
  className?: string;
};

export const LoadingIcon = ({ className }: LoadingIconProps) => {
  return <UpdateIcon className={cn("h-6 w-6 animate-spin", className)} />;
};
