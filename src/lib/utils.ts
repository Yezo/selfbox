import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstTwoLettersOfUser(
  name: string | null | undefined,
  username: string | null | undefined,
) {
  if (name) return name.slice(0, 2);
  if (!name && username) return username.slice(0, 2);
  return "??";
}

export function generateToast({
  type,
  value,
  description,
}: {
  type?: "success" | "warning" | "error" | "info" | "description";
  value?: string;
  description?: string;
}) {
  switch (type) {
    case "success":
      return toast.success(value, { description });
    case "warning":
      return toast.warning(value, { description });
    case "info":
      return toast.info(value, { description });
    case "error":
      return toast.error(value, { description });
    case "description":
      return toast.message(value, { description });
    default:
      return typeof type === "undefined" ? toast(value) : null;
  }
}
