export const SectionBlock = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: String;
}) => {
  return (
    <div className="space-y-2 font-bricolage">
      <h2 className="font-semibold">{title}</h2>
      <div className="min-h-20 min-w-full rounded border bg-neutral-900 px-4 py-2 font-bricolage md:min-w-[500px] md:max-w-[500px] ">
        <p className="whitespace-pre-line font-bricolage text-sm leading-6 text-gray ">
          {children}
        </p>
      </div>
    </div>
  );
};
