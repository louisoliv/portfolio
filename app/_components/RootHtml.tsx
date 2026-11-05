import { Anek_Tamil } from "next/font/google";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import type { Lang } from "../_data/i18n";

const AnekTamil = Anek_Tamil({
  subsets: ["latin"],
  variable: "--font-caption",
});

// Each language has its own root layout (app/(fr), app/(en)), so that
// the <html lang> attribute is right in the HTML sent by the server
export const RootHtml = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => {
  return (
    <html lang={lang} className="h-full">
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
};
