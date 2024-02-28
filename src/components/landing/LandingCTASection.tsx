import { Cobe } from "@/components/layout/Cobe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export const LandingCTASection = () => {
  return (
    <section className="flex min-h-[400px]  flex-col items-center justify-center">
      <Image
        src="/images/logo/selfbox-light.png"
        alt="Selfbox's logo"
        width={100}
        height={100}
        className="mb-4 text-black"
        quality={100}
      />
      <h2 className="mb-4 max-w-[450px]  text-center font-bricolage text-5xl font-semibold">
        Personalize your Selfbox today
      </h2>

      <Button asChild>
        <Link href="/signup">Get started for free</Link>
      </Button>
    </section>
  );
};
