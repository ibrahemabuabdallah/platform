import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PLATFORM_NAME, PLATFORM_TAGLINE } from "@/lib/constants";

interface LogoProps {
  variant?: "default" | "light" | "compact";
  className?: string;
  showText?: boolean;
  href?: string;
}

export function Logo({
  variant = "default",
  className,
  showText = true,
  href = "/",
}: LogoProps) {
  const isLight = variant === "light";
  const isCompact = variant === "compact";

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-xl overflow-hidden",
          isCompact ? "h-9 w-9" : "h-11 w-11"
        )}
      >
        <Image
          src="/logo.png"
          alt={PLATFORM_NAME}
          width={64}
          height={64}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      {showText && !isCompact && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-base font-extrabold tracking-tight",
              isLight ? "text-white" : "text-stone-900"
            )}
          >
            {PLATFORM_NAME}
          </span>
          <span
            className={cn(
              "text-[11px] font-medium",
              isLight ? "text-white/60" : "text-stone-500"
            )}
          >
            {PLATFORM_TAGLINE}
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={PLATFORM_NAME} className="shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
