import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormInputTextCSS =
  "flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray  hover:bg-[#ffffff14]";

export function getFirstTwoLettersOfUser(
  name: string | null | undefined,
  username: string | null | undefined,
) {
  //Check if the username exists,
  if (username) return username.slice(0, 2);
  if (!username && name) return name.slice(0, 2);
  return "??";
}

export function capitalizeEveryWord(str: string | null | undefined) {
  // This function is needed for capitalizing placeholder text on forms
  // Check if str is null or undefined
  if (str === null || str === undefined) {
    return str;
  }

  // Split the string into an array of words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a string
  const result = capitalizedWords.join(" ");

  return result;
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

const IS_SERVER = typeof window === "undefined";
export default function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : window.location.origin;
  return new URL(path, baseURL).toString();
}
