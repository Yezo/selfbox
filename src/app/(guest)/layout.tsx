import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type GuestPageLayoutProps = {
  children: React.ReactNode;
};

export default async function GuestPageLayout({
  children,
}: GuestPageLayoutProps) {
  //ROUTES YOU DON'T WANT EXISTING USERS TO ACCESS
  const session = await auth();

  //If the user is logged in, then redirect to user profile page
  if (session?.user) redirect(`/settings/profile`);

  return <>{children}</>;
}
