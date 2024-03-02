import { Main } from "@/components/layout/Main";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/nav/MainNavbar";
import { HeroTitle } from "@/components/landing/HeroTitle";
import { HeroInput } from "@/components/landing/HeroInput";
import { LandingPrimerSection } from "@/components/landing/LandingPrimerSection";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { Footer } from "@/components/layout/Footer";
import { Cobe } from "@/components/layout/Cobe";

export default async function Home() {
  const session = await auth();
  if (session && session.user && !session?.user.username) redirect("/username");

  return (
    <>
      <Navbar />
      <Main className="space-y-52 md:p-12 lg:p-24">
        <section className="flex flex-col items-center gap-20 md:flex-row md:gap-0 ">
          <section className="relative">
            <div className="absolute inset-x-0 -z-10 m-auto h-80 max-w-lg rounded-full bg-gradient-to-tr from-teal-400 via-rose-400 to-rose-400 opacity-20 blur-[200px] "></div>
            <div className="relative mx-auto max-w-screen-xl gap-12  md:px-8">
              <div className="mx-auto max-w-4xl space-y-5 ">
                <HeroTitle />
                <HeroInput />
              </div>
            </div>
          </section>
          <Cobe />
        </section>

        <LandingPrimerSection />
        <LandingPricingSection />
        <LandingTestimonialsSection />
        <LandingCTASection />
      </Main>
      <Footer />
    </>
  );
}
