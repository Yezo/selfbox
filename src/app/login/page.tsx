import { SignInWithPasswordForm } from "@/components/forms/SignInForm";
import { SignUpWithPasswordForm } from "@/components/forms/SignUpForm";
import { H1 } from "@/components/layout/H1";
import { H2 } from "@/components/layout/H2";
import { OrSeparator } from "@/components/layout/OrSeparator";
import { SignInButtonWithProvider } from "@/components/layout/SignInButtonProvider";
import { Main } from "@/components/layout/Main";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();
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

        <H1>Welcome back,</H1>

        <H2 className="mb-8">
          Don't have an account yet?
          <Link href="/signup" className="text-cyan-300">
            Sign up.
          </Link>
        </H2>

        <SignInWithPasswordForm />

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
