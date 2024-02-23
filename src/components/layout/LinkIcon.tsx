export const LinkIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-2 max-w-fit rounded border border-foreground/[.01] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-100 via-neutral-200 to-neutral-300 p-2 text-foreground/60 shadow-sm dark:border-foreground/[0.05] dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-neutral-900 dark:to-neutral-800 dark:text-slate-300 ">
      {children}
    </div>
  );
};
