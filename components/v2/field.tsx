"use client";

import { type ReactNode, useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  /** Rendered with the control's id and describedby wired up. */
  children: (props: {
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
  }) => ReactNode;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Right-aligned counter or helper shown beside the label. */
  meta?: ReactNode;
  className?: string;
}

/**
 * One field, one label, one message slot. The message area keeps its height so
 * an appearing error never shifts the fields below it — the behaviour that makes
 * inline validation feel calm rather than jumpy.
 */
export function Field({
  label,
  children,
  hint,
  error,
  optional,
  meta,
  className,
}: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-display text-[13px] font-semibold text-stone-800"
        >
          {label}
          {optional && (
            <span className="ms-1.5 font-normal text-stone-600">(اختياري)</span>
          )}
        </label>
        {meta}
      </div>

      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}

      <p
        id={messageId}
        role={error ? "alert" : undefined}
        className={cn(
          "mt-1.5 flex min-h-[1.125rem] items-start gap-1 text-[11.5px] leading-snug",
          error ? "text-red-700" : "text-stone-600"
        )}
      >
        {error && (
          <AlertCircle
            aria-hidden
            className="mt-[1px] h-3.5 w-3.5 shrink-0"
          />
        )}
        {message}
      </p>
    </div>
  );
}

/** Border treatment shared by every control that can show an error. */
export function errorRing(error?: string) {
  return error
    ? "border-red-400 focus-visible:ring-red-400"
    : undefined;
}
