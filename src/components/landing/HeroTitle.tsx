import { Badge } from "@/components/layout/Badge";
import { H1 } from "@/components/layout/H1";
import { Paragraph } from "@/components/layout/Paragraph";
import { DrawingPinIcon } from "@radix-ui/react-icons";

export const HeroTitle = () => {
  return (
    <div className="space-y-4">
      <Badge className="bg-rose-500/10 text-rose-400">
        <DrawingPinIcon className="h-3 w-3" /> Selfbox 1.0 just launched!
      </Badge>
      <H1>
        Be yourself,
        <br /> be with Selfbox.
      </H1>
      <Paragraph className="max-w-[435px]">
        Create your personal profile, express your interests, share your social
        links. It's your Selfbox.
      </Paragraph>
    </div>
  );
};
