"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReloadIcon, ResetIcon } from "@radix-ui/react-icons";
import { ErrorIcon } from "@/styles/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const handleGoBackOnePage = () => router.back();

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <ErrorIcon />
        <h2 className="font-bricolage font-semibold tracking-tight">
          Oh dear, it appears something went wrong.
        </h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => reset()}>
            <ReloadIcon className="mr-2 h-4 w-4" /> Try again
          </Button>

          <Button onClick={handleGoBackOnePage} variant="secondary">
            <ResetIcon className="mr-2 h-4 w-4" /> Home
          </Button>
        </div>
      </div>
    </main>
  );
}
