import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function Component({ children }: Props) {
  //This layout is for routes that you want to PREVENT NON-USERS FROM SEEING and then get REDIRECTED
  const session = await auth();

  //If the user is logged in but has no username, then redirect to change username page
  if (!session?.user) redirect("/username");

  //If the user isn't logged in, then redirect to login page
  if (!session?.user) redirect("/signin");

  return <>{children}</>;
}
