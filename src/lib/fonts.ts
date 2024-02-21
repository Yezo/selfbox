import { Inter, Bricolage_Grotesque } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
  adjustFontFallback: false, //remove when vercel fixes "failed to find font override values" error
});
