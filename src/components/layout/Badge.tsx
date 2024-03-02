import { cn } from "@/lib/utils";

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
};

export const Badge = ({ className, children }: BadgeProps) => {
  return (
    <div
      className={cn(
        "flex max-w-fit select-none items-center gap-1 self-center rounded-md bg-slate-500/10 px-2 text-[0.7rem] font-medium leading-5 text-slate-400 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
