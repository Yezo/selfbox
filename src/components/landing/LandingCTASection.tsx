import { Cobe } from "@/components/layout/Cobe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LandingCTASection = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="mb-4 max-w-[450px]  text-center font-bricolage text-5xl font-semibold">
        Personalize your Selfbox today
      </h2>

      <Button asChild>
        <Link href="/signup">Get started for free</Link>
      </Button>
      <Cobe />
    </section>
  );
};
