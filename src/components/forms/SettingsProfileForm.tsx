"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormInputTextCSS, generateToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfileSettings } from "@/db/actions/settings";
import { useForm } from "react-hook-form";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import { FormFieldItem } from "@/components/forms/FormFieldItem";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl, Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/forms/FormSubmitButton";

type SettingsFormProps = {
  oldUsername: string;
  oldName: string | undefined | null;
  oldUserProfile: {
    userId: string;
    id: number;
    bio: string | null;
    pronouns: "Do not specify" | "They/them" | "He/him" | "She/her" | null;
    website: string | null;
  } | null;
  userId: string;
};

export const SettingsProfileForm = ({
  oldUsername,
  oldName,
  userId,
  oldUserProfile,
}: SettingsFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<settingsProfileSchemaType>({
    resolver: zodResolver(settingsProfileSchema),
    defaultValues: {
      username: "",
      bio: oldUserProfile?.bio || "",
      name: "",
      pronouns: oldUserProfile?.pronouns || "Do not specify",
      website: oldUserProfile?.website || "",
    },
  });

  async function onSubmit(formData: settingsProfileSchemaType) {
    setIsPending(true);

    try {
      const message = await updateUserProfileSettings(formData, userId);

      switch (message) {
        case "success":
          generateToast({
            type: "success",
            value: "Success!",
            description: "Your profile was successfully updated.",
          });
          form.reset(undefined, { keepDirtyValues: true });
          form.clearErrors();
          break;

        case "username-exists":
          generateToast({
            type: "warning",
            value: "This username already exists.",
            description: "Please try a different username.",
          });
          setIsPending(false);
          break;

        case "wtf":
          generateToast({
            type: "warning",
            value: "WTF",
            description: "WTF",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormFieldItem label="Username">
              <>
                <Input
                  placeholder={oldUsername}
                  {...field}
                  className={`${FormInputTextCSS}`}
                />
                {oldUserProfile?.bio}
              </>
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormFieldItem
              label="Name"
              description="Your name appears throughout Selfbox and can be removed at any
                        time."
            >
              <Input
                placeholder={oldName || "John Doe"}
                {...field}
                className={`${FormInputTextCSS}`}
              />
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormFieldItem label="Bio">
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none bg-[#ffffff0f] text-sm placeholder:text-sm placeholder:text-gray hover:bg-[#ffffff14]"
                {...field}
              />
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormFieldItem label="Pronouns">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Do not specify" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Do not specify">Do not specify</SelectItem>
                  <SelectItem value="They/them">They/them</SelectItem>
                  <SelectItem value="He/him">He/him</SelectItem>
                  <SelectItem value="She/her">She/her</SelectItem>
                </SelectContent>
              </Select>
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormFieldItem
              label="Website"
              description="This can be your own Selfbox, portfolio website, or your main social website links."
            >
              <Input
                placeholder={"https://selfbox.com"}
                {...field}
                className={`${FormInputTextCSS}`}
              />
            </FormFieldItem>
          )}
        />

        <SubmitButton pending={isPending}>Update profile</SubmitButton>
      </form>
    </Form>
  );
};
