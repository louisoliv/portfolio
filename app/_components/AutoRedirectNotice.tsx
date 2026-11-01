"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Shown on the classic page when the cockpit sent the visitor here because
// their device looked too modest for the 3D scene. Lets them try anyway.
export const AutoRedirectNotice = () => {
  const searchParams = useSearchParams();
  if (!searchParams.has("auto")) return null;

  return (
    <p className="border-b border-border/60 bg-muted/30 px-4 py-2 text-center text-xs text-muted-foreground">
      Tu vois la version classique car ton appareil risque d&apos;avoir du mal à afficher le cockpit 3D.{" "}
      {/* force3d: skips the device check, see SceneClient */}
      <Link href="/?force3d=1" className="font-medium text-foreground underline underline-offset-2">
        Essayer quand même le cockpit
      </Link>
    </p>
  );
};
