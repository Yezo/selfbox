import {
  BellIcon,
  EnvelopeClosedIcon,
  GearIcon,
  IdCardIcon,
  LockClosedIcon,
  PaperPlaneIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

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
    icon: <PersonIcon />,
  },
  {
    name: "Account",
    url: "/settings/account",
    icon: <GearIcon />,
  },
  {
    name: "Change password",
    url: "/settings/password",
    icon: <LockClosedIcon />,
  },
];

export const SettingsSecondNav = [
  {
    name: "Billings and plans",
    url: "/settings/billing",
    icon: <IdCardIcon />,
  },
  {
    name: "Emails",
    url: "/settings/email",
    icon: <EnvelopeClosedIcon />,
  },
  {
    name: "Notifications",
    url: "/settings/notifications",
    icon: <BellIcon />,
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
