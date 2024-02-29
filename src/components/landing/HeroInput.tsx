"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { heroInputSchemaInput, heroInputSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateToast } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export const HeroInput = () => {
  const router = useRouter();

  const form = useForm<heroInputSchemaInput>({
    resolver: zodResolver(heroInputSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(formData: heroInputSchemaInput) {
    const { username } = formData;
    try {
      router.push(
        `${username ? `/signup?username=${username.toLowerCase()}` : `/signup`}`,
      );
    } catch (error) {
      generateToast({
        type: "error",
        value: "Something went wrong!",
        description: "Please try again.",
      });
    }
  }

  return (
    <div className="my-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row-reverse items-center">
                    <Input
                      placeholder="yourname"
                      type={"text"}
                      className="flex h-12 min-w-[250px] items-center justify-center border bg-[#ffffff0f] p-4 pl-24 font-bricolage text-sm placeholder-gray transition-colors duration-300 placeholder:opacity-[0.5] hover:bg-[#ffffff14]"
                      {...field}
                    />

                    <p className="-mr-24 flex h-12 items-center justify-center pl-2 font-bricolage text-sm text-gray">
                      selfbox.me/
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className={`h-12 max-w-fit `} type="submit">
            Claim your Selfbox <ChevronRightIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};
