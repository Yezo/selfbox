import Link from "next/link";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mt-12 grid place-items-center">
        <Link href="/" className="font-bricolage text-2xl font-semibold">
          selfbox.
        </Link>
      </header>

      {children}
    </>
  );
}
