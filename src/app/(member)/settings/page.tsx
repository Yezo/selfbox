import { Main } from "@/components/layout/Main";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/");

  return (
    <Main className="flex min-h-screen flex-col items-center p-24">
      Settings
    </Main>
  );
}
