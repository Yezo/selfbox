import { H1 } from "@/components/layout/H1";
import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/nav/Navbar";
import { Separator } from "@/components/ui/separator";
import { ChangelogSection } from "@/components/changelog/ChangelogSection";
import { Footer } from "@/components/layout/Footer";

export default async function ChangelogPage() {
  return (
    <>
      <Navbar />
      <Main className="mx-auto min-h-[600px] max-w-[950px] py-8 pt-20 lg:min-h-[850px]">
        <H1 className="mb-20">Changelog</H1>

        <Separator className="my-16 max-w-[850px]" />

        <ChangelogSection
          date="February 29th, 2024"
          imageURL="/images/hero.png"
          imageAltDescription="The main landing page of Selfbox"
          badgeTypes={["update", "release"]}
          mainTitle={`Introducing \"Selfbox\" — the next generational link-in-bio platform`}
          mainDescription="Today marks the initial release of Selfbox to the public. Selfbox
          is a new link-in-bio platform that aims to promote its users and
          help grow their brand. Whether they are a content creator, a
          professional, or the average hobbyist, everyone can curate their
          own Selfbox and express themselves freely."
          bulletItems={[
            "Users can create an account and log in using email, Google, or GitHub",
            "Add support for adding and editing social media links",
            "Added a changelog to help users be kept up to date",
          ]}
        />

        <Separator className="my-16 max-w-[850px]" />
      </Main>

      <Footer />
    </>
  );
}
