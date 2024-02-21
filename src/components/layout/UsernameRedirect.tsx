import { auth } from "@/lib/auth";

type UsernameRedirectProps = {};

export const UsernameRedirect = async ({}: UsernameRedirectProps) => {
  const session = await auth();

  if (session?.user.id && !session?.user.username) {
  }
  return <></>;
};
