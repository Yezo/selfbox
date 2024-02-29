import { SelfboxLogo } from "@/components/layout/SelfboxLogo";
import { FooterNav } from "@/lib/nav";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-12 font-bricolage text-gray ">
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0 md:px-12 lg:px-24 ">
        <SelfboxLogo type="dark" />

        <ul className="flex gap-8 text-sm transition-colors duration-300">
          {FooterNav.map((item) => (
            <li key={item.name} className="hover:text-white">
              <Link href={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
