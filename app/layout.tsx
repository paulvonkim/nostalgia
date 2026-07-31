import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const chicago = localFont({
  src: "../public/fonts/ChicagoFLF.ttf",
  variable: "--font-chicago",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul Kim — Design Portfolio",
  description: "Paul Kims Product Designer (UX/UI) based in Berlin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={chicago.variable}>
      <head>
        {/* Body font (Geist) and headings/tags/buttons font (Geist Pixel,
         * Square variant — ELSH axis value 1, confirmed against Vercel's
         * geist-pixel-font repo) — loaded via the exact embed snippet
         * provided, not next/font/google, same rationale as before: match
         * the given source rather than self-host a substitute. Replaces
         * the old Google Sans embed (body) and Chicago's former headings/
         * tags/buttons role. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Pixel&family=Geist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
