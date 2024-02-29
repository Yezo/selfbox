import { H1 } from "@/components/layout/H1";
import { Paragraph } from "@/components/layout/Paragraph";

export const HeroTitle = () => {
  return (
    <div className="space-y-4">
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
