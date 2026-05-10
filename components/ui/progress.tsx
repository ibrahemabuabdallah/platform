"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
}

function ProgressIndicator({ value }: ProgressIndicatorProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${Math.min(100, Math.max(0, value))}%`;
    }
  }, [value]);

  return (
    <ProgressPrimitive.Indicator
      ref={ref}
      className="h-full bg-gradient-to-l from-emerald-600 to-emerald-700 transition-[width] duration-500 ease-out"
    />
  );
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-stone-200",
      className
    )}
    {...props}
  >
    <ProgressIndicator value={value ?? 0} />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
