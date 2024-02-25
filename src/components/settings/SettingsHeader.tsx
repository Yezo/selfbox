import { Separator } from "@/components/ui/separator";

type SettingsHeaderProps = {
  title: string;
};

export const SettingsHeader = ({ title }: SettingsHeaderProps) => {
  return (
    <>
      <h2 className="font-bricolage text-xl font-semibold">{title}</h2>
      <Separator className="my-4" />
    </>
  );
};
