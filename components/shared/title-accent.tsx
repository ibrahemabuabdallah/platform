import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "emerald" | "gold-light" | "gold-dark";

interface TitleAccentProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function TitleAccent({
  children,
  variant = "emerald",
  className,
}: TitleAccentProps) {
  return (
    <>
      {" "}
      <span
        className={cn(
          "title-accent",
          variant === "emerald" && "text-emerald-700",
          variant === "gold-light" &&
            "bg-gradient-to-l from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent",
          variant === "gold-dark" &&
            "bg-gradient-to-l from-gold-600 via-gold-500 to-gold-700 bg-clip-text text-transparent",
          className
        )}
      >
        {children}
      </span>
    </>
  );
}

export function TitleLineBreak({ className }: { className?: string }) {
  return <br className={cn("hidden sm:block", className)} />;
}
