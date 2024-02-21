import { Button } from "@/components/ui/button";
import Link from "next/link";

type SignUpButtonProps = {};

export const SignUpButton = ({}: SignUpButtonProps) => {
  return (
    <Button asChild>
      <Link href="/signup">Get started</Link>
    </Button>
  );
};
