import { Main } from "@/components/layout/Main";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { HeroTitle } from "@/components/landing/HeroTitle";
import { HeroInput } from "@/components/landing/HeroInput";
import { LandingPrimerSection } from "@/components/landing/LandingPrimerSection";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  const session = await auth();
  if (session && session.user && !session?.user.username) redirect("/username");

  return (
    <>
      <Navbar />
      <Main className="space-y-52 p-24">
        <section className="min-h-[450px]">
          <HeroTitle />
          <HeroInput />
        </section>

        <LandingPrimerSection />
        <LandingPricingSection />
        <LandingTestimonialsSection />
        <LandingCTASection />
        <Footer />
      </Main>
    </>
  );
}
