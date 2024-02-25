import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function MemberPageLayout({ children }: Props) {
  //ROUTES YOU DON'T WANT GUEST USERS TO ACCESS
  const session = await auth();

  //If the user isn't logged in, then redirect to login page
  if (!session?.user) redirect("/login");

  //If the user is logged in but has no username, then redirect to change username page
  if (!session?.user.username) redirect("/username");

  return <>{children}</>;
}
