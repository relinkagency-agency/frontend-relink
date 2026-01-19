import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Footer from "../shared/layouts/footer";
import "./globals.css";
import Header from "@/shared/layouts/header";

const tiemposText = localFont({
  src: [
    {
      path: "./fonts/tiempos/Test-Tiempos-Text/TestTiemposText-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-relink-text",
});

const tiemposHeadline = localFont({
  src: [
    {
      path: "./fonts/tiempos/Test-Tiempos-Headline/TestTiemposHeadline-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-relink-headline",
});

const tiemposFine = localFont({
  src: [
    {
      path: "./fonts/tiempos/Test-Tiempos-Fine/TestTiemposFine-Regular.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-relink-fine",
});

const neueHaasUnica = localFont({
  src: [
    {
      path: "./fonts/Neue-Haas-Unica-Pro/NeueHaasUnicaPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-relink-neue",
});

export const metadata: Metadata = {
  title: {
    default: "Relink Agency",
    template: "%s | Relink Agency",
  },
  description: "Brand Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tiemposText.variable} ${tiemposHeadline.variable} ${tiemposFine.variable} ${neueHaasUnica.variable}`}
    >
      <body>
        <Header />
        <main className="min-h-[70vh] ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
