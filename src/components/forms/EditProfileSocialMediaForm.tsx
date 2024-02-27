"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormInputTextCSS,
  capitalizeEveryWord,
  generateToast,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editProfileSocialMediaSchema,
  editProfileSocialMediaSchemaType,
} from "@/types/zod";
import { FormFieldItem } from "@/components/forms/FormFieldItem";
import { FormField, Form, FormLabel } from "@/components/ui/form";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { useRouter } from "next/navigation";
import { getUserSocialMedia, updateSocialMediaLinks } from "@/db/actions/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EditProfileSocialMediaProps = {
  username: string;
  oldSocialMedia: {
    userId: string;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
  };
  userId: string | undefined;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileSocialMediaForm = ({
  username,
  userId,
  setOpen,
  oldSocialMedia,
}: EditProfileSocialMediaProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<editProfileSocialMediaSchemaType>({
    resolver: zodResolver(editProfileSocialMediaSchema),
    defaultValues: {
      twitter: oldSocialMedia.twitter || "",
      instagram: oldSocialMedia.instagram || "",
      linkedin: oldSocialMedia.linkedin || "",
    },
  });

  async function onSubmit(formData: editProfileSocialMediaSchemaType) {
    setIsPending(true);

    try {
      const oldSocialMedia = await getUserSocialMedia(userId!);
      const message = await updateSocialMediaLinks(
        formData,
        oldSocialMedia,
        userId!,
        username,
      );

      switch (message) {
        case "success":
          generateToast({
            type: "success",
            value: "Success!",
            description: "Your profile was successfully updated.",
          });
          form.reset(undefined, { keepDirtyValues: true });
          form.clearErrors();
          setOpen && setOpen(false);
          router.replace(`/${username.toLowerCase()}`);
          break;

        case "invalid-input":
          generateToast({
            type: "warning",
            value: "The input is invalid",
            description: "Please try inputting something else.",
          });
          setIsPending(false);
          break;

        default:
          generateToast({
            type: "error",
            value: "Something went wrong!",
            description: "Please try again.",
          });
          setIsPending(false);
          console.error(message);
      }
    } catch (error) {
      generateToast({
        type: "error",
        value: "Something went wrong!",
        description: "Please try again.",
      });
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="grid min-h-11 min-w-11 place-items-center rounded-md  bg-sky-800 p-2 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <FormLabel className=" font-inter text-xs">
                        Twitter
                      </FormLabel>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia.twitter) || "@username"
                  }
                  {...field}
                  className={`${FormInputTextCSS}`}
                />
              </div>
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="grid min-h-11 min-w-11 place-items-center rounded-md  bg-sky-800 p-2 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <FormLabel className=" font-inter text-xs">
                        Instagram
                      </FormLabel>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia.instagram) || "@username"
                  }
                  {...field}
                  className={`${FormInputTextCSS}`}
                />
              </div>
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="grid min-h-11 min-w-11 place-items-center rounded-md  bg-sky-800 p-2 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <FormLabel className=" font-inter text-xs">
                        Linkedin
                      </FormLabel>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia.linkedin) || "@username"
                  }
                  {...field}
                  className={`${FormInputTextCSS}`}
                />
              </div>
            </FormFieldItem>
          )}
        />

        <SubmitButton pending={isPending}>Update</SubmitButton>
      </form>
    </Form>
  );
};
