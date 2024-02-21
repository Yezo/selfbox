export const OrSeparator = () => {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="h-[1px] w-full bg-border"></div>
      <div className="min-w-fit font-bricolage text-xs font-semibold uppercase tracking-tight text-gray">
        or continue with
      </div>
      <div className="h-[1px] w-full bg-border"></div>
    </div>
  );
};
