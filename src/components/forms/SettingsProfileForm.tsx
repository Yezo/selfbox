"use client";

import { Input } from "@/components/ui/input";
import { FormInputTextCSS, generateToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { settingsProfileSchema, settingsProfileSchemaType } from "@/types/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FormFieldItem } from "@/components/forms/FormFieldItem";

type SettingsFormProps = {
  oldUsername: string;
  oldName: string | undefined | null;
};

export const SettingsProfileForm = ({
  oldUsername,
  oldName,
}: SettingsFormProps) => {
  const router = useRouter();

  const form = useForm<settingsProfileSchemaType>({
    resolver: zodResolver(settingsProfileSchema),
    defaultValues: {
      username: "",
      bio: "",
      name: "",
      pronouns: "Don't specify",
      website: "",
    },
  });

  async function onSubmit(formData: settingsProfileSchemaType) {
    const { username, bio, pronouns, name, website } = formData;
    try {
      generateToast({
        type: "success",
        value: `Username: ${username}`,
        description: `Bio: ${bio} | Pronouns: ${pronouns} | Name: ${name} | Website: ${website}`,
      });
    } catch (error) {
      generateToast({
        type: "error",
        value: "Something went wrong!",
        description: "Please try again.",
      });
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
              <Input
                placeholder={oldUsername}
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
                    <SelectValue placeholder="Don't specify" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Don't specify">Don't specify</SelectItem>
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

        <Button
          type="submit"
          className={
            "disabled my-2 flex h-11 max-w-fit items-center justify-center gap-2 border p-5 font-bricolage text-sm transition-colors duration-300 placeholder:opacity-[0.5]"
          }
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
};
