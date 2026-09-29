import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "DRAMIX — Stream the World's Dramas in Full HD",
  description:
    "Stream top trending Pakistani, Turkish, Indian, and Korean drama series and latest episodes in breathtaking high definition.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col justify-between antialiased selection:bg-red-600 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}