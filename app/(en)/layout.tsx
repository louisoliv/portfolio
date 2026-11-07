import type { Metadata } from "next";
import { RootHtml } from "../_components/RootHtml";
import { METADATA_BASE } from "../_data/metadata";

export const metadata: Metadata = { metadataBase: METADATA_BASE };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
