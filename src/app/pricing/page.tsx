import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/nav/navbar";
import Image from "next/image";

export default async function PricingPage() {
  return (
    <>
      <Navbar />
      <Main className="grid min-h-[600px] place-items-center py-8 lg:min-h-[850px]">
        <section className="flex flex-col items-center justify-center gap-2 pb-40">
          <Image
            src="/images/logo/selfbox-light.png"
            alt="Selfbox's logo"
            width={100}
            height={100}
            className="text-black"
          />
          <div className="font-bricolage text-2xl">It's free.</div>
        </section>
      </Main>
    </>
  );
}
