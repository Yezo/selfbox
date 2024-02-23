"use client";

import { Input } from "@/components/ui/input";
import { generateToast } from "@/lib/utils";
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={oldUsername}
                  {...field}
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray  hover:bg-[#ffffff14]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={oldName || "Enter your name"}
                  {...field}
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray  hover:bg-[#ffffff14]"
                />
              </FormControl>
              <FormDescription>
                Your name appears throughout Selfbox and can be removed at any
                time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none bg-[#ffffff0f] text-sm placeholder:text-sm placeholder:text-gray hover:bg-[#ffffff14] "
                    {...field}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
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
              <FormDescription>
                Don't see yor pronoun here? Suggest a new one{" "}
                <Link
                  href="/"
                  className="underline transition-colors duration-300 hover:text-white"
                >
                  here
                </Link>{" "}
                and we'll get it added.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder={"https://selfbox.com"}
                  {...field}
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray  hover:bg-[#ffffff14]"
                />
              </FormControl>
              <FormDescription>
                This can be your own Selfbox, portfolio website, or your main
                social media site.
              </FormDescription>
              <FormMessage />
            </FormItem>
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
