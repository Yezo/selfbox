"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { updateUsernameSchema } from "@/types/zod";
import { generateToast } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserUsername } from "@/db/actions/user";
import router from "next/router";

export function UpdateUsernameForm({ id }: { id: string | undefined }) {
  // Zod schema
  const form = useForm<z.infer<typeof updateUsernameSchema>>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  // Takes the form values and executes a server action for inserting
  // a bio into the database and resets the form if successful
  async function onSubmit(values: z.infer<typeof updateUsernameSchema>) {
    try {
      if (id) {
        const message = await updateUserUsername(id, values.username);

        switch (message) {
          case "success":
            generateToast({
              type: "success",
              value: "Username successfully updated.",
            });
            form.reset({});
            form.clearErrors();
            break;
          case "duplicate":
            generateToast({
              type: "warning",
              value: "This username is already in use.",
              description: "Please choose a different username.",
            });

            break;

          case "not-found":
            generateToast({
              type: "error",
              value: "This user does not exist.",
            });
            break;

          default:
            generateToast({
              type: "error",
              value: "Error while updating username.",
              description: "Please try again.",
            });
        }
      }
    } catch (error) {
      console.log(error);
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
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>Submit</SubmitButton>
      </form>
    </Form>
  );
}
