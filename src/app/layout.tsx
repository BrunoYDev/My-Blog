import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "BrunoRGarcia Blog",
  description:
    "Welcome to my blog, my personal space on the internet where I share my thoughts, experiences, and projects.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  verification: {
    google: "ByJD-t9n4-OgzcpE08hRZseOOcMXHpMLOLkkSEZ-vzQ"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Header />
        {children}
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html>
  );
}
