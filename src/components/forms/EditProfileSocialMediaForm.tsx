"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldItem } from "@/components/forms/FormFieldItem";
import { FormField, Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { useRouter } from "next/navigation";
import { updateSocialMediaLinks } from "@/db/actions/user";
import {
  BehanceIcon,
  GitHubLogoIcon,
  InstagramIcon,
  LinkedInIcon,
  PatreonIcon,
  TikTokIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/styles/icons";
import { TooltipItem } from "@/components/profile/TooltipItem";
import { OldSocialMediaType } from "@/types/types";
import {
  editProfileSocialMediaSchema,
  editProfileSocialMediaSchemaType,
} from "@/types/zod";
import {
  FormInputTextCSS,
  capitalizeEveryWord,
  generateToast,
} from "@/lib/utils";

type EditProfileSocialMediaProps = {
  username: string;
  oldSocialMedia: OldSocialMediaType;
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
      twitter: oldSocialMedia?.twitter || "",
      instagram: oldSocialMedia?.instagram || "",
      linkedin: oldSocialMedia?.linkedin || "",
      github: oldSocialMedia?.github || "",
      youtube: oldSocialMedia?.youtube || "",
      twitch: oldSocialMedia?.twitch || "",
      tiktok: oldSocialMedia?.tiktok || "",
      patreon: oldSocialMedia?.patreon || "",
      behance: oldSocialMedia?.behance || "",
    },
  });

  async function onSubmit(formData: editProfileSocialMediaSchemaType) {
    setIsPending(true);

    try {
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
                <TooltipItem label="Twitter">
                  <TwitterIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.twitter) || "@username"
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
                <TooltipItem label="Instagram">
                  <InstagramIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.instagram) ||
                    "@username"
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
                <TooltipItem label="LinkedIn">
                  <LinkedInIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="github"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="GitHub">
                  <GitHubLogoIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="youtube"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="Youtube">
                  <YoutubeIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="twitch"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="Twitch">
                  <TwitchIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="tiktok"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="TikTok">
                  <TikTokIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="patreon"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="Patreon">
                  <PatreonIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
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
          name="behance"
          render={({ field }) => (
            <FormFieldItem>
              <div className="flex gap-2">
                <TooltipItem label="Behance">
                  <BehanceIcon />
                </TooltipItem>

                <Input
                  placeholder={
                    capitalizeEveryWord(oldSocialMedia?.linkedin) || "@username"
                  }
                  {...field}
                  className={`${FormInputTextCSS}`}
                />
              </div>
            </FormFieldItem>
          )}
        />

        <SubmitButton pending={isPending}>
          {oldSocialMedia ? "Update" : "Add social platforms"}
        </SubmitButton>
      </form>
    </Form>
  );
};
