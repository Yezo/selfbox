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
      <div className="min-w-[500px] max-w-[500px] rounded border bg-neutral-900 p-4 font-bricolage">
        <p className="whitespace-pre-line font-bricolage text-sm leading-6 text-gray ">
          {children}
        </p>
      </div>
    </div>
  );
};
