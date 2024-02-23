import { H1 } from "@/components/layout/H1";

export const HeroTitle = () => {
  return (
    <div className="space-y-4">
      <H1 className="text-5xl">
        Be yourself,
        <br /> be with Selfbox.
      </H1>
      <p className="max-w-[435px] leading-6 text-gray">
        Create your personal profile, express your interests, share your social
        links. It's your Selfbox.
      </p>
    </div>
  );
};
