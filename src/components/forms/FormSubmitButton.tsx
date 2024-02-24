"use client";

import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

export const SubmitButton = ({
  children,
  pending,
}: {
  children: ReactNode;
  pending: boolean;
}) => {
  return (
    <Button
      type="submit"
      className={twMerge(
        "disabled my-2 flex h-11 min-w-full items-center justify-center gap-2 border p-5 font-bricolage text-sm transition-colors duration-300 placeholder:opacity-[0.5] ",
        pending && "cursor-not-allowed ",
      )}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <UpdateIcon className="animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
