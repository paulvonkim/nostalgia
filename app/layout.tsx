import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";

const chicago = localFont({
  src: "../public/fonts/ChicagoFLF.ttf",
  variable: "--font-chicago",
  display: "swap",
});

const gossip = localFont({
  src: "../public/fonts/Gossip-MedSquare.woff2",
  variable: "--font-gossip",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul Kim — Design Portfolio",
  description:
    "Design Portfolio — a skeuomorphic homage to Mac OS 7 and Photoshop 1.0.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chicago.variable} ${inter.variable} ${gossip.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
