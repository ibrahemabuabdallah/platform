import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Arabic (Egypt) labels with Latin (0–9) digits across the platform */
export const PLATFORM_LOCALE = "ar-EG";

const platformNumbering = { numberingSystem: "latn" } as const;

export function formatLocaleNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(PLATFORM_LOCALE, {
    ...platformNumbering,
    ...options,
  }).format(value);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRef(year: number, num: number): string {
  return `REF-${year}-${num.toString().padStart(5, "0")}`;
}

export function formatDateAr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(PLATFORM_LOCALE, {
    ...platformNumbering,
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatDateTimeAr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(PLATFORM_LOCALE, {
    ...platformNumbering,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function timeAgoAr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) return `منذ ${months} ${months === 1 ? "شهر" : "أشهر"}`;
  if (days > 0) return `منذ ${days} ${days === 1 ? "يوم" : "أيام"}`;
  if (hours > 0) return `منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`;
  if (minutes > 0)
    return `منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`;
  return "الآن";
}

export function formatNumber(num: number): string {
  return formatLocaleNumber(num);
}

export function generateRef(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 99000) + 1000;
  return formatRef(year, num);
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
