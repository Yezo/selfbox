import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoginButtonProps = {};

export const LoginButton = ({}: LoginButtonProps) => {
  return (
    <Button asChild variant={"ghost"} className="hover:bg-transparent">
      <Link href="/login">Log in</Link>
    </Button>
  );
};
