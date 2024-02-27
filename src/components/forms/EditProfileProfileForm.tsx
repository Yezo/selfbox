"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormInputTextCSS,
  capitalizeEveryWord,
  generateToast,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfileSettings } from "@/db/actions/settings";
import { useForm } from "react-hook-form";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import { FormFieldItem } from "@/components/forms/FormFieldItem";
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
import { useRouter } from "next/navigation";

type EditProfileProfileFormProps = {
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
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileProfileForm = ({
  oldUsername,
  oldName,
  userId,
  oldUserProfile,
  setOpen,
}: EditProfileProfileFormProps) => {
  const router = useRouter();
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
          setOpen && setOpen(false);
          router.replace(
            `/${formData.username.toLowerCase() || oldUsername.toLowerCase()}`,
          );
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormFieldItem label="Username">
              <Input
                placeholder={capitalizeEveryWord(oldUsername) || ""}
                {...field}
                className={`${FormInputTextCSS}`}
              />
            </FormFieldItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormFieldItem label="Name">
              <Input
                placeholder={capitalizeEveryWord(oldName) || "John Doe"}
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
                className={`${FormInputTextCSS} min-h-28 resize-none`}
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
            <FormFieldItem label="Website">
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
