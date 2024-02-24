"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { generateToast } from "@/lib/utils";
import { signUpWithPassword } from "@/db/actions/user";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  SignUpWithPasswordFormInput,
  signUpWithPasswordSchema,
} from "@/types/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type SignUpWithPasswordFormProps = {
  tempUsername: string | undefined;
};

export function SignUpWithPasswordForm({
  tempUsername,
}: SignUpWithPasswordFormProps) {
  const router = useRouter();
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SignUpWithPasswordFormInput>({
    resolver: zodResolver(signUpWithPasswordSchema),
    defaultValues: {
      username: tempUsername || "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignUpWithPasswordFormInput) {
    setIsPending(true);

    try {
      const message = await signUpWithPassword({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      switch (message) {
        case "success":
          generateToast({
            type: "success",
            value: "Success!",
            description: "Your account was successfully created.",
          });
          form.reset();
          form.clearErrors();
          router.push("/login");
          break;

        case "username-exists":
          generateToast({
            type: "warning",
            value: "This username already exists.",
            description: "Please try a different username.",
          });
          setIsPending(false);
          break;

        case "email-exists":
          generateToast({
            type: "warning",
            value: "User with this email address already exists.",
            description: "If this is you, please sign in instead.",
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
      }
    } catch (error) {
      generateToast({
        type: "error",
        value: "Something went wrong!",
        description: "Please try again.",
      });
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Selfbox"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
}
