import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between font-bricolage text-gray">
      <Link href="/" className="flex items-center gap-2 ">
        <Image
          src="/images/logo/selfbox-light.png"
          alt="Selfbox's logo"
          width={18}
          height={18}
          className="text-black"
        />
        <span className="font-semibold transition-colors duration-300 hover:text-white">
          selfbox.
        </span>
      </Link>

      <ul className="flex gap-8 text-sm transition-colors duration-300">
        <li className="hover:text-white">Home</li>
        <li className="hover:text-white">Pricing</li>
        <li className="hover:text-white">Changelog</li>
        <li className="hover:text-white">Terms of Service</li>
        <li className="hover:text-white">Privacy Policy</li>
        <li className="hover:text-white">Contact</li>
      </ul>
    </footer>
  );
};
