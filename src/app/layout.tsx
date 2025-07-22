import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "BrunoRGarcia Blog",
  description: "Welcome to my blog, my personal space on the internet where I share my thoughts, experiences, and projects.",
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
      </body>
    </html>
  );
}
