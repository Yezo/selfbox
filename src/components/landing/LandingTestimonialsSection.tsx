import { LandingSeparator } from "@/components/landing/LandingSeparator";
import { Badge } from "@/components/layout/Badge";
import { H2 } from "@/components/layout/H2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlobeIcon } from "@radix-ui/react-icons";

export const LandingTestimonialsSection = () => {
  return (
    <section className="space-y-4">
      <Badge className="bg-sky-500/10 text-sky-400">
        <GlobeIcon className="h-3 w-3" /> Join the community
      </Badge>

      <H2>The impact of Selfbox</H2>

      <LandingSeparator />

      <div className="grid gap-20 md:grid-cols-2">
        <div className="flex gap-4">
          <Avatar className="mt-2 rounded-sm">
            <AvatarImage src="/images/testimonial-avatar-1.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <blockquote className="min-h-[125px]">
              <p className="text-sm leading-6 ">
                “Selfbox completely changed my life and increased my online
                presence by over 9000%. Millions of users were clicking on my
                Selfbox and checking out all of my other social media. After my
                Selfbox got viral, I ended up on national TV and even took a
                selfie with Taylor Swift at the Superbowl.”
              </p>
            </blockquote>
            <cite className="flex flex-col font-bricolage text-sm not-italic text-gray">
              <span className="font-semibold">Kevin Vo</span>
              <span>CEO, Selfbox</span>
            </cite>
          </div>
        </div>

        <div className="flex gap-4">
          <Avatar className="mt-2 rounded-sm">
            <AvatarImage src="/images/testimonial-avatar-2.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <blockquote className="min-h-[125px]">
              <p className="text-sm leading-6 ">
                “Not longer after creating my account, I subsequently got a
                girlfriend, won the Lotto MAX, and now drive around LA in a
                sportscar whose name I can't even pronounce. Selfbox? For the
                blind, they are the vision. For the hungry, they are the chef.
                For the thirsty, they are the water. If Selfbox has one fan, it
                is me. If Selfbox has no fans, I do not exist. Thank you
                Selfbox.”
              </p>
            </blockquote>
            <cite className="flex flex-col font-bricolage text-sm not-italic text-gray">
              <span className="font-semibold">Vevin Ko</span>
              <span>Kevin Vo's friend</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};
