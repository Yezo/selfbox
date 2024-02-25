import { WrenchIcon } from "@/styles/icons";

export const WorkInProgress = () => {
  return (
    <section className="grid min-h-[500px] min-w-full place-items-center rounded-md bg-neutral-900">
      <div className="flex flex-col items-center gap-1 font-bricolage text-sm font-semibold">
        <WrenchIcon />
        <div>This is a work in progress.</div>
      </div>
    </section>
  );
};
