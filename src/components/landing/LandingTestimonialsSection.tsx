import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const LandingTestimonialsSection = () => {
  return (
    <section>
      <h2 className="mb-4 font-bricolage text-3xl font-semibold">
        The impact of Selfbox
      </h2>

      <Separator className="mb-8 mt-4 max-w-[55px]" />
      <div className="grid grid-cols-2 gap-20">
        <div className="flex gap-4">
          <Avatar className="mt-2 rounded-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
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
            <AvatarImage src="https://github.com/shadcn.png" />
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
