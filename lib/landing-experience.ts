"use client";

import { useCallback, useEffect, useState } from "react";

export type LandingVariant = "classic" | "experience";

const STORAGE_KEY = "sawtak:landing:variant";
const COOKIE_KEY = "sawtak_landing_variant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const EVENT_NAME = "sawtak:landing-variant";

export const LANDING_ROUTES: Record<LandingVariant, string> = {
  classic: "/",
  experience: "/experience",
};

export function landingHrefFor(variant: LandingVariant): string {
  return LANDING_ROUTES[variant];
}

export function readLandingVariant(): LandingVariant {
  if (typeof window === "undefined") return "classic";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "experience" || stored === "classic") return stored;
  } catch {
    // private mode or storage disabled
  }
  return "classic";
}

export function writeLandingVariant(variant: LandingVariant): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // ignore
  }
  try {
    document.cookie = `${COOKIE_KEY}=${variant}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent<LandingVariant>(EVENT_NAME, { detail: variant }));
}

export function useLandingVariant() {
  const [variant, setVariantState] = useState<LandingVariant>("classic");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVariantState(readLandingVariant());
    setHydrated(true);

    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<LandingVariant>).detail;
      if (detail === "classic" || detail === "experience") {
        setVariantState(detail);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === "classic" || event.newValue === "experience") {
        setVariantState(event.newValue);
      }
    };

    window.addEventListener(EVENT_NAME, onCustom as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setVariant = useCallback((next: LandingVariant) => {
    setVariantState(next);
    writeLandingVariant(next);
  }, []);

  return { variant, setVariant, hydrated };
}

export const LANDING_COOKIE_NAME = COOKIE_KEY;
