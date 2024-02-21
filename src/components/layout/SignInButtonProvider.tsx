"use client";

import { Button } from "@/components/ui/button";
import { generateToast } from "@/lib/utils";
import { GithubIcon, GoogleIcon } from "@/styles/icons";
import { signIn } from "next-auth/react";

type SignInButtonWithProviderProps = {
  provider: string;
  username: string | undefined;
};

export function SignInButtonWithProvider({
  provider,
  username,
}: SignInButtonWithProviderProps) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleClick = async () => {
    const signInOptions = username
      ? { callbackUrl: "/username" }
      : { callbackUrl: "/username" };

    try {
      await signIn(provider, signInOptions);
    } catch (error) {
      generateToast({
        type: "error",
        value: "Something went wrong.",
      });
      throw new Error(`Error signing in with ${provider}`);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="flex h-11 w-full items-center justify-center border p-5 font-bricolage text-sm transition-colors duration-300"
    >
      {provider === "google" && <GoogleIcon />}
      {provider === "github" && <GithubIcon />}
      <span className="ml-4">{capitalizeFirstLetter(provider)}</span>
    </Button>
  );
}
