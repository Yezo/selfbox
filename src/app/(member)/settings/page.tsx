import Link from "next/link";
import { H3 } from "@/components/layout/H3";
import { Paragraph } from "@/components/layout/Paragraph";
import {
  AccountSVGIcon,
  BillingSVGIcon,
  EmailSVGIcon,
  NotificationsSVGIcon,
  PersonSVGIcon,
} from "@/styles/icons";

export default async function SettingsPage() {
  return (
    <>
      <section className="pt-4 sm:min-h-[450px] ">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SettingsItem url="/settings/profile" heading={"Profile"}>
            <PersonSVGIcon size={20} />
          </SettingsItem>

          <SettingsItem url="/settings/account" heading={"Account"}>
            <AccountSVGIcon size={20} />
          </SettingsItem>

          <SettingsItem url="/settings/billing" heading={"Billing"}>
            <BillingSVGIcon size={20} />
          </SettingsItem>

          <SettingsItem url="/settings/emails" heading={"Emails"}>
            <EmailSVGIcon size={20} />
          </SettingsItem>

          <SettingsItem url="/settings/notifications" heading={"Notifications"}>
            <NotificationsSVGIcon size={20} />
          </SettingsItem>
        </div>
      </section>
    </>
  );
}

type SettingsItemProps = {
  children: React.ReactNode;
  url: string;
  heading: string;
};

const SettingsItem = ({ children, url, heading }: SettingsItemProps) => {
  return (
    <Link href={url}>
      <div className="flex items-center gap-4 rounded-2xl border p-4">
        <div className="flex basis-1/6 items-center justify-center">
          <div className="rounded-md bg-gray p-3">{children}</div>
        </div>
        <div className="basis-5/6 font-medium">
          <H3 className="font-bricolage">{heading}</H3>
          <Paragraph className="text-sm tracking-tight">
            View and update your {heading.toLowerCase()} settings
          </Paragraph>
        </div>
      </div>
    </Link>
  );
};
