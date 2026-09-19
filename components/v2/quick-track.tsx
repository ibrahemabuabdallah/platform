"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { normalizeRef, validateRef } from "@/hooks/use-track-lookup";

/**
 * Tracking is one of the two reasons a citizen opens this site, so it starts
 * here rather than behind a navigation item. The reference is validated before
 * the jump, which means a typo is answered on this page instead of producing an
 * empty result on the next one.
 */
export function QuickTrack({ className }: { className?: string }) {
  const router = useRouter();
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = validateRef(value);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    router.push(`/v2/track?ref=${encodeURIComponent(normalizeRef(value))}`);
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className={cn(
        // Solid, not glass: the form sits over moving footage and has to stay
        // readable on every frame of it.
        "rounded-2xl border border-white/15 bg-[#fbf9f5] p-4 shadow-soft-lg sm:p-5",
        className
      )}
    >
      <label
        htmlFor={inputId}
        className="font-display text-sm font-bold text-stone-900"
      >
        عندك رقم مرجعي؟ تابع شكواك من هنا
      </label>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Hash
            aria-hidden
            className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
          />
          <Input
            id={inputId}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            placeholder="REF-2026-00482"
            dir="ltr"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-12 pe-10 text-center font-mono tracking-[0.12em]",
              error && "border-red-400 focus-visible:ring-red-400"
            )}
          />
        </div>
        <Button type="submit" size="lg" className="sm:w-auto">
          <span>تابع الشكوى</span>
          <ArrowLeft aria-hidden className="h-4 w-4" />
        </Button>
      </div>

      <p
        id={errorId}
        role={error ? "alert" : undefined}
        className={cn(
          "mt-2 text-xs leading-relaxed",
          error ? "text-red-700" : "text-stone-600"
        )}
      >
        {error ?? "الرقم وصلك في رسالة عند التقديم، بصيغة REF ثم السنة ثم خمسة أرقام."}
      </p>
    </form>
  );
}
