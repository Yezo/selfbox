import { H2 } from "@/components/layout/H2";
import { Separator } from "@/components/ui/separator";

type SettingsHeaderProps = {
  title: string;
};

export const SettingsHeader = ({ title }: SettingsHeaderProps) => {
  return (
    <>
      <H2>{title}</H2>
      <Separator className="my-4" />
    </>
  );
};
