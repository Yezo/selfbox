import {
  AccountSVGIcon,
  BillingSVGIcon,
  EmailSVGIcon,
  NotificationsSVGIcon,
  PersonSVGIcon,
} from "@/styles/icons";

export const MainNav = [
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Changelog",
    url: "/changelog",
  },
];

export const SettingsFirstNav = [
  {
    name: "Public profile",
    url: "/settings/profile",
    icon: <PersonSVGIcon size={16} />,
  },
  {
    name: "Account",
    url: "/settings/account",
    icon: <AccountSVGIcon size={16} />,
  },
];

export const SettingsSecondNav = [
  {
    name: "Billings and plans",
    url: "/settings/billing",
    icon: <BillingSVGIcon size={16} />,
  },
  {
    name: "Emails",
    url: "/settings/email",
    icon: <EmailSVGIcon size={16} />,
  },
  {
    name: "Notifications",
    url: "/settings/notifications",
    icon: <NotificationsSVGIcon size={16} />,
  },
];

export const FooterNav = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Changelog",
    url: "/changelog",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

export type SettingsFirstNavConfig = typeof SettingsFirstNav;
export type SettingsSecondNavConfig = typeof SettingsSecondNav;
export type MainNavConfig = typeof MainNav;
export type FooterNavConfig = typeof FooterNav;
