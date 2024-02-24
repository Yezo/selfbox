"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { generateToast } from "@/lib/utils";
import { settingsSchema, settingsSchemaType } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

type SettingsFormProps = {
  username: string;
};

export const SettingsForm = ({ username }: SettingsFormProps) => {
  const router = useRouter();
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<settingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(formData: settingsSchemaType) {
    setIsPending(true);

    try {
      //   const message = await signUpWithPassword({
      //     username: formData.username,
      //     oldPassword: formData.oldPassword,
      //     newPassword: formData.newPassword,
      //   });
      //   switch (message) {
      //     case "success":
      //       generateToast({
      //         type: "success",
      //         value: "Success!",
      //         description: "Your account was successfully created.",
      //       });
      //       router.push("/login");
      //       break;
      //     default:
      //       generateToast({
      //         type: "error",
      //         value: "Something went wrong!",
      //         description: "Please try again.",
      //       });
      //       console.error(message);
      //   }
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
                  placeholder={username}
                  {...field}
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray placeholder:opacity-[0.5] hover:bg-[#ffffff14]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="acme@example.com"
                  {...field}
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray placeholder:opacity-[0.5] hover:bg-[#ffffff14]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="**********"
                    type={passwordVisiblity ? "text" : "password"}
                    className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm transition-colors duration-300 placeholder:text-gray placeholder:opacity-[0.5] hover:bg-[#ffffff14]"
                    {...field}
                  />
                  {passwordVisiblity ? (
                    <EyeNoneIcon
                      className="-m-8 cursor-pointer text-muted-foreground"
                      onClick={() => setPasswordVisiblity(!passwordVisiblity)}
                    />
                  ) : (
                    <EyeOpenIcon
                      className="-m-8 cursor-pointer text-muted-foreground"
                      onClick={() => setPasswordVisiblity(!passwordVisiblity)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton pending={isPending}>Create account</SubmitButton>
      </form>
    </Form>
  );
};
