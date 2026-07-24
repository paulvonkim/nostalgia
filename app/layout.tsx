import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const chicago = localFont({
  src: "../public/fonts/ChicagoFLF.ttf",
  variable: "--font-chicago",
  display: "swap",
});

const gossip = localFont({
  src: "../public/fonts/Gossip-MedSquare.otf",
  variable: "--font-gossip",
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
    <html lang="en" className={`${chicago.variable} ${gossip.variable}`}>
      <head>
        {/* Body font (Google Sans) — loaded via the exact embed snippet
         * provided, not next/font/google, per explicit instruction to
         * match the given source rather than self-host a substitute. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
