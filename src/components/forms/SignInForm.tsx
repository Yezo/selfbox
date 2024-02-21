"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPassword } from "@/db/actions/user";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { generateToast } from "@/lib/utils";
import {
  SignInWithPasswordFormInput,
  signInWithPasswordSchema,
} from "@/types/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SignInWithPasswordForm(): JSX.Element {
  const router = useRouter();
  const [passwordVisiblity, setPasswordVisiblity] = React.useState(false);

  const form = useForm<SignInWithPasswordFormInput>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignInWithPasswordFormInput) {
    try {
      const message = await signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      switch (message) {
        case "success":
          generateToast({
            type: "success",
            value: "Login successful!",
          });
          router.push("/");
          break;
        case "not-registered":
          generateToast({
            type: "warning",
            value: "There are no accounts with this email.",
            description: "Please create an account first.",
          });

          break;
        case "incorrect-provider":
          generateToast({
            type: "error",
            value: "Email is already in use.",
            description: "Try logging in with a different method.",
          });

          break;
        // case "unverified-email":
        //   generateToast({
        //     type: "warning",
        //     value: "Unverified email.",
        //     description: "Please verify your email.",
        //   });
        //   break;
        case "invalid-credentials":
          generateToast({
            type: "error",
            value: "Invalid email or password.",
          });
          break;

        default:
          generateToast({
            type: "error",
            value: "Error while signing in.",
            description: "Please try again.",
          });
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      generateToast({
        type: "error",
        value: "Something strange happened.",
        description: "Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm placeholder-gray transition-colors duration-300 placeholder:opacity-[0.5]"
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
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
                    className="flex h-11 items-center justify-center border bg-[#ffffff0f] p-4 font-bricolage text-sm placeholder-gray transition-colors duration-300 placeholder:opacity-[0.5] "
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

        <SubmitButton>Log in</SubmitButton>
      </form>
    </Form>
  );
}
