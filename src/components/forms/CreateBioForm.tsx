"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { createBioAction } from "@/db/actions/insertBio";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { bioSchema } from "@/types/zod";
import { generateToast } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function BioForm() {
  // Zod schema
  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: "",
    },
  });

  // Takes the form values and executes a server action for inserting
  // a bio into the database and resets the form if successful
  async function onSubmit(values: z.infer<typeof bioSchema>) {
    try {
      await createBioAction(values);
      generateToast({
        type: "success",
        value: "You successfully added a bio.",
      });
      form.reset({});
      form.clearErrors();
    } catch (error) {
      generateToast({
        type: "error",
        value: "There was an error adding a bio.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="bio" {...field} />
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
