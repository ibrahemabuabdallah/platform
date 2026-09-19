"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cases } from "@/data/cases";
import { branches } from "@/data/branches";
import { coordinators } from "@/data/coordinators";
import type { Case } from "@/types";

export const SAMPLE_REFS = [
  "REF-2026-00482",
  "REF-2026-00483",
  "REF-2026-00488",
] as const;

/** Simulated round-trip so the loading state is real rather than decorative. */
const LOOKUP_DELAY_MS = 600;

const REF_SHAPE = /^REF-\d{4}-\d{5}$/;

export type TrackResult = Case | null | "not_found";

export function normalizeRef(value: string): string {
  return value.trim().toUpperCase();
}

/** A malformed reference is answered before any lookup is attempted. */
export function validateRef(value: string): string | null {
  const ref = normalizeRef(value);
  if (!ref) return "أدخل الرقم المرجعي أولاً.";
  if (!REF_SHAPE.test(ref)) {
    return "الصيغة المتوقعة REF ثم السنة ثم خمسة أرقام، مثال REF-2026-00482.";
  }
  return null;
}

export interface UseTrackLookupOptions {
  /**
   * When set, successful lookups are remembered under this localStorage key so
   * a returning citizen can reopen a reference without retyping it.
   */
  historyKey?: string;
  /** How many recent references to keep. */
  historyLimit?: number;
  /**
   * Check the reference shape before looking it up, so a malformed entry is
   * answered as a format problem instead of as a missing case. Opt-in, because
   * the original page reports every miss the same way.
   */
  validateFormat?: boolean;
}

export function useTrackLookup(options: UseTrackLookupOptions = {}) {
  const { historyKey, historyLimit = 4, validateFormat = false } = options;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TrackResult>(null);
  const [loading, setLoading] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [searchedRef, setSearchedRef] = useState("");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRestored = useRef(false);

  /**
   * The current query is mirrored into a ref so `search` keeps a stable
   * identity. Without this, every keystroke produces a new `search`, and any
   * effect that calls it re-runs and cancels the lookup it just started.
   */
  const queryRef = useRef(query);
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  /* -- recent references ------------------------------------------------- */

  useEffect(() => {
    if (!historyKey || hasRestored.current) return;
    hasRestored.current = true;
    try {
      const raw = window.localStorage.getItem(historyKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setHistory(
          parsed.filter((v): v is string => typeof v === "string").slice(0, historyLimit)
        );
      }
    } catch {
      // An unreadable history is simply an empty one.
    }
  }, [historyKey, historyLimit]);

  const remember = useCallback(
    (ref: string) => {
      if (!historyKey) return;
      setHistory((prev) => {
        const next = [ref, ...prev.filter((r) => r !== ref)].slice(
          0,
          historyLimit
        );
        try {
          window.localStorage.setItem(historyKey, JSON.stringify(next));
        } catch {
          // Keep it in memory for this session.
        }
        return next;
      });
    },
    [historyKey, historyLimit]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (!historyKey) return;
    try {
      window.localStorage.removeItem(historyKey);
    } catch {
      // Nothing to recover from.
    }
  }, [historyKey]);

  /* -- lookup ------------------------------------------------------------ */

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  /**
   * `silent` suppresses toasts for presentations that already show the outcome
   * inline, so the citizen is not told the same thing twice.
   */
  const search = useCallback(
    (refValue?: string, opts: { silent?: boolean } = {}) => {
      const raw = refValue ?? queryRef.current;
      const ref = normalizeRef(raw);

      if (!ref) {
        setFormatError("أدخل الرقم المرجعي أولاً.");
        if (!opts.silent) toast.error("الرجاء إدخال الرقم المرجعي");
        return;
      }

      if (validateFormat) {
        const message = validateRef(ref);
        if (message) {
          setFormatError(message);
          setResult(null);
          setSearchedRef("");
          if (!opts.silent) toast.error(message);
          return;
        }
      }

      setFormatError(null);
      setLoading(true);
      setResult(null);
      setSearchedRef(ref);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const found = cases.find((c) => c.ref === ref);
        setResult(found || "not_found");
        setLoading(false);
        if (found) {
          remember(ref);
          if (!opts.silent) toast.success("تم العثور على القضية");
        }
      }, LOOKUP_DELAY_MS);
    },
    [remember, validateFormat]
  );

  const searchRef = useCallback(
    (ref: string, opts?: { silent?: boolean }) => {
      setQuery(ref);
      search(ref, opts);
    },
    [search]
  );

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setQuery("");
    setResult(null);
    setLoading(false);
    setFormatError(null);
    setSearchedRef("");
  }, []);

  /* -- resolved relations ------------------------------------------------ */

  const found = result && result !== "not_found" ? result : null;

  const details = useMemo(() => {
    if (!found) return null;
    return {
      case: found,
      branch: branches.find((b) => b.id === found.branchId) ?? null,
      coordinator:
        coordinators.find((c) => c.id === found.coordinatorId) ?? null,
    };
  }, [found]);

  return {
    // state
    query,
    result,
    loading,
    formatError,
    history,
    searchedRef,
    // derived
    found,
    details,
    notFound: result === "not_found",
    isEmpty: !loading && result === null,
    // actions
    setQuery,
    search,
    searchRef,
    reset,
    clearHistory,
  };
}

export type TrackLookupController = ReturnType<typeof useTrackLookup>;
