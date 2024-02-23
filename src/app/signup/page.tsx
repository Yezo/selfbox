import { SignUpWithPasswordForm } from "@/components/forms/SignUpForm";
import { H1 } from "@/components/layout/H1";
import { H2 } from "@/components/layout/H2";
import { OrSeparator } from "@/components/layout/OrSeparator";
import { SignInButtonWithProvider } from "@/components/layout/SignInButtonProvider";
import { Main } from "@/components/layout/Main";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { auth } from "@/lib/auth";
import Link from "next/link";

type SearchQueryPageProps = {
  searchParams: { username: string };
};

export default async function SignUpPage({
  searchParams,
}: SearchQueryPageProps) {
  const session = await auth();
  const tempUsername = searchParams.username;

  return (
    <Main className="grid min-h-screen place-items-center pb-40">
      <section className="w-[450px]">
        <Link
          href="/"
          className="mb-12 flex items-center gap-1 text-xs text-gray"
        >
          <CaretLeftIcon className="h-4" />
          Back to website
        </Link>

        <H1>Sign up</H1>

        <H2 className="mb-8">
          Already have an account?
          <Link href="/login" className="text-cyan-300">
            Log in.
          </Link>
        </H2>

        <SignUpWithPasswordForm tempUsername={tempUsername} />

        <OrSeparator />

        <div className="flex items-center gap-2">
          <SignInButtonWithProvider
            provider={"google"}
            username={session?.user.username}
          />
          <SignInButtonWithProvider
            provider={"github"}
            username={session?.user.username}
          />
        </div>
      </section>
    </Main>
  );
}
