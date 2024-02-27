import { FormLabel } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipItemProps = {
  children: React.ReactNode;
  label: string;
};

export const TooltipItem = ({ children, label }: TooltipItemProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger type="button" className="cursor-default" tabIndex={-1}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <FormLabel className=" font-inter text-xs">{label}</FormLabel>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
