import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "BrunoRGarcia Blog",
  description: "Welcome to my blog, my personal space on the internet where I share my thoughts, experiences, and projects.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.gif',
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
        <GoogleTagManager gtmId="Q7Y0J397SM" />
      </body>
    </html>
  );
}
