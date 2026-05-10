import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand “AI / sparkle” mark — inline SVG (no raster), follows `text-*` / currentColor.
 */
export function AiSparkleIcon({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center text-current h-4 w-4", className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full pointer-events-none select-none"
      >
        <rect
          x="3.25"
          y="3.25"
          width="17.5"
          height="17.5"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.35"
          opacity={0.4}
        />
        <path
          d="M12 6.25 13.85 10.9 18.75 12 13.85 13.1 12 17.75 10.15 13.1 5.25 12 10.15 10.9 12 6.25z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18.75 4.75v2.15M17.67 5.82h2.15"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M5.1 17.9l.9.9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
