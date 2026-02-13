import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalLoader } from "./global-loader";
import { Suspense } from "react";

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
  openGraph: {
    title: "Relink Agency",
    description: "Brand Agency",
    url: "https://relinkagency.com",
    siteName: "Relink Agency",
    images: [
      {
        url: "https://relinkagency.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Relink Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
      <SpeedInsights />
      <body>
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}