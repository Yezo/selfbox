import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircledIcon, ComponentInstanceIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/layout/Badge";
import { LandingSeparator } from "@/components/landing/LandingSeparator";
import { H2 } from "@/components/layout/H2";

export const LandingPricingSection = () => {
  return (
    <section className="space-y-4">
      <div className="mx-auto grid place-items-center gap-4">
        <Badge className="bg-indigo-500/10 text-indigo-400">
          <ComponentInstanceIcon className="h-3 w-3" /> Join the community
        </Badge>

        <H2>Selfbox Pricing</H2>

        <LandingSeparator />
      </div>

      <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="font-bricolage">Hobby</CardTitle>
              <CardDescription>Free for hobby use</CardDescription>
            </div>
            <div className="flex items-center">
              <span className="font-bricolage text-2xl font-bold">$0</span>
              <span className="text-xs text-gray">/month</span>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <ul className="space-y-4 pt-6">
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Free to make a Selfbox account
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Display up to 20 social media links
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Display up to 50 interests and hobbies
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="font-bricolage">Pro</CardTitle>
              <CardDescription>
                For professionals and businesses
              </CardDescription>
            </div>
            <div className="flex items-center">
              <span className="font-bricolage text-2xl font-bold">$0</span>
              <span className="text-xs text-gray">/month</span>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <ul className="space-y-4 pt-6">
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                It's still free to make a Selfbox account
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                You can still display up to 20 social media links
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Display up to 50 interests and hobbies for free
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Display up to 50 interests and hobbies for free
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="font-bricolage">Premium</CardTitle>
              <CardDescription>For supporting the developer</CardDescription>
            </div>
            <div className="flex items-center">
              <span className="font-bricolage text-2xl font-bold">$0</span>
              <span className="text-xs text-gray">/month</span>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <ul className="space-y-4 pt-6">
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Everything is free
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                If you want to support this project's developer
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircledIcon />
                Then here's a link
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
