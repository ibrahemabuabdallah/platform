"use client";

import { useCallback, useEffect, useState } from "react";

export type DashboardVariant = "classic" | "studio";

const STORAGE_KEY = "sawtak:dashboard:variant";
const COOKIE_KEY = "sawtak_dashboard_variant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const EVENT_NAME = "sawtak:dashboard-variant";

export const DASHBOARD_ROUTES: Record<DashboardVariant, string> = {
  classic: "/dashboard",
  studio: "/dashboard/studio",
};

export function dashboardHrefFor(variant: DashboardVariant): string {
  return DASHBOARD_ROUTES[variant];
}

export function readDashboardVariant(): DashboardVariant {
  if (typeof window === "undefined") return "classic";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "studio" || stored === "classic") return stored;
  } catch {
    // ignore — private mode or storage disabled
  }
  return "classic";
}

export function writeDashboardVariant(variant: DashboardVariant): void {
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
  window.dispatchEvent(new CustomEvent<DashboardVariant>(EVENT_NAME, { detail: variant }));
}

export function useDashboardVariant() {
  const [variant, setVariantState] = useState<DashboardVariant>("classic");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVariantState(readDashboardVariant());
    setHydrated(true);

    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<DashboardVariant>).detail;
      if (detail === "classic" || detail === "studio") {
        setVariantState(detail);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === "classic" || event.newValue === "studio") {
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

  const setVariant = useCallback((next: DashboardVariant) => {
    setVariantState(next);
    writeDashboardVariant(next);
  }, []);

  return { variant, setVariant, hydrated };
}
