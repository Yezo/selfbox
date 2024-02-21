"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { createSongAction } from "@/db/actions/insertSong";
import { SubmitButton } from "@/components/forms/FormSubmitButton";
import { songSchema } from "@/types/zod";
import { generateToast } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SongForm() {
  // Zod schema
  const form = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      duration: "",
    },
  });

  // Takes the form values and executes a server action for inserting
  // a song into the database and resets the form if successful
  async function onSubmit(values: z.infer<typeof songSchema>) {
    try {
      await createSongAction(values);
      generateToast({
        type: "success",
        value: "You successfully added a song.",
      });
      form.reset();
      form.clearErrors();
    } catch (error) {
      generateToast({
        type: "error",
        value: "There was an error adding a song.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>artist</FormLabel>
              <FormControl>
                <Input placeholder="artist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormItem>
              <FormLabel>album</FormLabel>
              <FormControl>
                <Input placeholder="album" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>duration</FormLabel>
              <FormControl>
                <Input placeholder="duration" {...field} />
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
