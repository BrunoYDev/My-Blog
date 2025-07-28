import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "BrunoRGarcia Blog",
  description:
    "Welcome to my blog, my personal space on the internet where I share my thoughts, experiences, and projects.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
        ></script>
        <script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', '${process.env.GTM_ID}');
          `}
        </script>
      </head>
      <body className={``}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
            height={"0"}
            width={"0"}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        {children}
      </body>
    </html>
  );
}
