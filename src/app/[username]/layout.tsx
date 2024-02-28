import { FooterLogo } from "@/components/layout/FooterLogo";
import { FooterLogoDescription } from "@/components/layout/FooterLogoDescription";
import { auth } from "@/lib/auth";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      {children}
      <footer className="grid place-items-center gap-2 pb-8 pt-8">
        <FooterLogo
          url={session ? "/" : "/signup"}
          label={session ? "selfbox." : "selfbox.com/you"}
        />

        {!session && <FooterLogoDescription url="/signup" />}
      </footer>
    </>
  );
}
