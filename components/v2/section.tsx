import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "cream" | "emerald";

interface SectionProps {
  id?: string;
  tone?: Tone;
  spacing?: "regular" | "tight" | "loose";
  className?: string;
  children: ReactNode;
  /** A soft emerald wash, placed once per section at most. */
  glow?: "start" | "end" | "none";
}

export function Section({
  id,
  tone = "white",
  spacing = "regular",
  className,
  glow = "none",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "white" && "bg-white",
        tone === "cream" && "bg-[#faf7f2]",
        tone === "emerald" && "hero-gradient text-white",
        spacing === "tight" && "py-14 lg:py-16",
        spacing === "regular" && "py-20 lg:py-24",
        spacing === "loose" && "py-24 lg:py-32",
        className
      )}
    >
      {glow !== "none" && tone !== "emerald" && (
        <div
          aria-hidden
          className={cn(
            "aurora-soft-emerald pointer-events-none absolute -top-48 h-[70%] w-[55%]",
            glow === "start" ? "end-[-12%]" : "start-[-12%]"
          )}
        />
      )}
      <div className="container relative">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Rendered as an h2 by default; the landing hero owns the single h1. */
  as?: "h1" | "h2";
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  /** A quiet counterpart placed opposite the heading on wide screens. */
  aside?: ReactNode;
  className?: string;
}

/**
 * Heading block for the redesigned pages. No eyebrow label and no section
 * number: the heading carries its own weight, and the lede does the rest.
 */
export function SectionHeading({
  as: Tag = "h2",
  title,
  lede,
  align = "start",
  tone = "light",
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        aside
          ? "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          : align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && !aside && "mx-auto",
          aside && "flex-1"
        )}
      >
        <Tag
          className={cn(
            "text-balance font-display font-extrabold leading-[1.15] tracking-[-0.02em]",
            Tag === "h1"
              ? "text-3xl sm:text-4xl lg:text-5xl"
              : "text-2xl sm:text-3xl lg:text-[2.5rem]",
            tone === "light" ? "text-stone-900" : "text-white"
          )}
        >
          {title}
        </Tag>
        {lede && (
          <p
            className={cn(
              "mt-4 max-w-prose text-[0.95rem] leading-relaxed sm:text-base",
              tone === "light" ? "text-stone-600" : "text-emerald-50/85"
            )}
          >
            {lede}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

/** The gold hairline used between major blocks, matching the original world. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("editorial-rule-gold w-full", className)}
    />
  );
}
