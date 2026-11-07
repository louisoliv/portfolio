"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type AutoRedirectNoticeProps = {
  text: string;
  linkLabel: string;
  // force3d: skips the device check, see SceneClient
  cockpitHref: string;
};

// Shown on the classic page when the cockpit sent the visitor here because
// their device looked too modest for the 3D scene. Lets them try anyway.
export const AutoRedirectNotice = ({ text, linkLabel, cockpitHref }: AutoRedirectNoticeProps) => {
  const searchParams = useSearchParams();
  if (!searchParams.has("auto")) return null;

  return (
    <p className="border-b border-border/60 bg-muted/30 px-4 py-2 text-center text-xs text-muted-foreground">
      {text}{" "}
      <Link href={cockpitHref} className="font-medium text-foreground underline underline-offset-2">
        {linkLabel}
      </Link>
    </p>
  );
};
