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
    url: "/",
    icon: <GearIcon />,
  },
  {
    name: "Change password",
    url: "/",
    icon: <LockClosedIcon />,
  },
];

export const SettingsSecondNav = [
  {
    name: "Billings and plans",
    url: "/",
    icon: <IdCardIcon />,
  },
  {
    name: "Emails",
    url: "/",
    icon: <EnvelopeClosedIcon />,
  },
  {
    name: "Notifications",
    url: "/",
    icon: <BellIcon />,
  },
];

export type SettingsFirstNavConfig = typeof SettingsFirstNav;
export type SettingsSecondNavConfig = typeof SettingsSecondNav;
export type MainNavConfig = typeof MainNav;
