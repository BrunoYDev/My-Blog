import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://brunorgb.vercel.app/"),
  title: {
    default: "BrunoRGB",
    template: "%s | BrunoRGB",
  },
  description:
    "Blog pessoal do Bruno R Garcia sobre game dev, a velha web e coisas aleatórias.",
  openGraph: {
    siteName: "BrunoRGB",
    type: "website",
    locale: "pt_BR",
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
    <html lang="pt-BR">
      <body className={``}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html>
  );
}
