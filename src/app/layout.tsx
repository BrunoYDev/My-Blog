import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://brunorgarciablog.vercel.app"),
  title: {
    default: "BrunoRGarcia Blog",
    template: "%s | BrunoRGarcia Blog",
  },
  description:
    "Bruno R Garcia's personal blog about game dev, the old web, and random stuff.",
  openGraph: {
    siteName: "BrunoRGarcia Blog",
    type: "website",
    locale: "en_US",
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
        <Footer />
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html>
  );
}
