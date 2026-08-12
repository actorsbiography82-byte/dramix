import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DRAMIX - Watch Latest Drama Series & Episodes",
  description: "Stream the latest high-quality drama series and episodes on DRAMIX. Enjoy a premium, seamless video player experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

