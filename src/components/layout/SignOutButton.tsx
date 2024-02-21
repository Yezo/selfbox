"use client";

import { Button } from "@/components/ui/button";

type SignOutButtonProps = {
  signOut: () => void;
};

export const SignOutButton = ({ signOut }: SignOutButtonProps) => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
};
