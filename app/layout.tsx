import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R19_N16",
  description: "Demo app for the React19 & Next.js 16 course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body
        className="antialiased min-h-dvh bg-base-100 text-base-content font-sans"
      >
        {children}
      </body>
    </html>
  );
}
