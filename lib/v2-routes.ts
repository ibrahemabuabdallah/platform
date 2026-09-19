/**
 * Route map for the parallel citizen experience.
 *
 * The original pages stay untouched at their own paths and remain the design
 * source. Everything under `/v2` is the redesigned twin. The helpers below keep
 * an internal link inside whichever version the visitor is already in, so a
 * single click cannot silently drop them back into the old pages.
 */

export const V2_PREFIX = "/v2";

export interface V2RoutePair {
  /** Path of the original page. */
  original: string;
  /** Path of the redesigned twin. */
  v2: string;
  label: string;
}

export const V2_ROUTE_PAIRS: readonly V2RoutePair[] = [
  { original: "/", v2: "/v2", label: "الرئيسية" },
  { original: "/submit", v2: "/v2/submit", label: "تقديم شكوى" },
  { original: "/track", v2: "/v2/track", label: "تتبع طلب" },
] as const;

const ORIGINAL_TO_V2 = new Map(
  V2_ROUTE_PAIRS.map((pair) => [pair.original, pair.v2])
);

const V2_TO_ORIGINAL = new Map(
  V2_ROUTE_PAIRS.map((pair) => [pair.v2, pair.original])
);

/**
 * Rewrites a link so it stays inside the redesigned set. Paths with no twin
 * yet — case details, the staff dashboards — are returned untouched, which is
 * the correct destination rather than a broken `/v2/...` guess.
 */
export function v2Href(path: string): string {
  return ORIGINAL_TO_V2.get(path) ?? path;
}

/** The original counterpart of a `/v2` path, for side-by-side comparison. */
export function originalHref(path: string): string {
  return V2_TO_ORIGINAL.get(path) ?? path;
}

export function findRoutePairByV2(path: string): V2RoutePair | undefined {
  return V2_ROUTE_PAIRS.find((pair) => pair.v2 === path);
}

/** Routes that exist only in the original site, linked to as-is from `/v2`. */
export const SHARED_ROUTES = {
  caseDetail: (id: string) => `/cases/${id}`,
  cases: "/cases",
} as const;
