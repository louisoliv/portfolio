import type { Metadata } from "next";
import { Anek_Tamil } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

const AnekTamil = Anek_Tamil({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
  title: "Louis OLIVIER ",
  description: "Online portfolio with React, Next and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          AnekTamil.variable,
          "font-sans h-full bg background text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
}
