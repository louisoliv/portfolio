import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Section = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) => {
  return (
    <section className={cn("max-w-4xl px-4 m-auto", className)} {...props}>
      {children}
    </section>
  );
};
