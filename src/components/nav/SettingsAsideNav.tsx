"use client";

import { Separator } from "@/components/ui/separator";
import { SettingsFirstNav, SettingsSecondNav } from "@/lib/nav";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SettingsAsideNav = () => {
  const pathname = usePathname();
  return (
    <aside className="basis-1/5  pl-0 sm:pr-12">
      <ul className="space-y-1">
        {SettingsFirstNav.map(({ name, url, icon }) => (
          <ListItem key={name} url={url} pathname={pathname}>
            {icon}
            {name}
          </ListItem>
        ))}
      </ul>

      <Separator className="my-4" />

      <ul className="space-y-1">
        {SettingsSecondNav.map(({ name, url, icon }) => (
          <ListItem key={name} url={url} pathname={pathname}>
            {icon}
            {name}
          </ListItem>
        ))}
      </ul>

      <Separator className="my-4" />
    </aside>
  );
};

const ListItem = ({
  url,
  children,
  pathname,
}: {
  pathname: string;
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <li
      className={`rounded-sm p-1.5 text-sm text-gray transition-colors duration-300 hover:bg-gray/10 hover:text-white ${pathname === url && "bg-gray/10 font-semibold text-white"}`}
    >
      <Link href={url} className="flex items-center gap-2">
        {children}
      </Link>
    </li>
  );
};
