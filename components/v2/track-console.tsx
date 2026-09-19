"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  History,
  Search,
  SearchX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CaseResult } from "@/components/v2/case-result";
import { cn } from "@/lib/utils";
import {
  SAMPLE_REFS,
  useTrackLookup,
  validateRef,
} from "@/hooks/use-track-lookup";

const HISTORY_KEY = "sawtak:v2:track-history";

export function TrackConsole() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get("ref");

  const {
    query,
    setQuery,
    loading,
    formatError,
    found,
    details,
    notFound,
    isEmpty,
    history,
    searchedRef,
    search,
    searchRef,
    clearHistory,
  } = useTrackLookup({ historyKey: HISTORY_KEY, validateFormat: true });

  // A reference handed over from the hero or the success dialog runs itself,
  // so the citizen never retypes what they just saw. `searchRef` and `setQuery`
  // are stable, so this fires once per reference rather than on every keystroke.
  useEffect(() => {
    if (!refFromUrl) return;
    if (validateRef(refFromUrl)) {
      setQuery(refFromUrl);
      return;
    }
    searchRef(refFromUrl, { silent: true });
  }, [refFromUrl, searchRef, setQuery]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    search(undefined, { silent: true });
  };

  return (
    <div className="container max-w-3xl py-8 lg:py-12">
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-2xl border border-border bg-white p-5 shadow-soft-sm lg:p-7"
      >
        <label
          htmlFor="track-ref"
          className="block font-display text-base font-bold text-stone-900"
        >
          أدخل الرقم المرجعي
        </label>
        <p className="mt-1 text-[12.5px] leading-relaxed text-stone-600">
          وصلك عند التقديم بصيغة REF ثم السنة ثم خمسة أرقام. لا يحتاج حساباً ولا
          كلمة مرور.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Input
              id="track-ref"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="REF-2026-00482"
              dir="ltr"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={formatError ? true : undefined}
              aria-describedby="track-ref-message"
              className={cn(
                "h-12 text-center font-mono tracking-[0.12em]",
                formatError && "border-red-400 focus-visible:ring-red-400"
              )}
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="sm:px-8">
            {loading ? (
              <>
                <span
                  aria-hidden
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                />
                <span>جاري البحث</span>
              </>
            ) : (
              <>
                <Search aria-hidden className="h-4 w-4" />
                <span>ابحث</span>
              </>
            )}
          </Button>
        </div>

        <p
          id="track-ref-message"
          role={formatError ? "alert" : undefined}
          className={cn(
            "mt-2 flex min-h-[1.125rem] items-start gap-1 text-[11.5px] leading-snug",
            formatError ? "text-red-700" : "text-stone-600"
          )}
        >
          {formatError && (
            <AlertCircle aria-hidden className="mt-[1px] h-3.5 w-3.5 shrink-0" />
          )}
          {formatError}
        </p>

        {/* References this browser looked up before */}
        {history.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-stone-600">
              <History aria-hidden className="h-3.5 w-3.5" />
              بحثت عنها سابقاً:
            </span>
            {history.map((ref) => (
              <button
                key={ref}
                type="button"
                onClick={() => searchRef(ref, { silent: true })}
                className="inline-flex min-h-[2rem] items-center rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] text-emerald-800 ring-1 ring-emerald-200/70 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ref}
              </button>
            ))}
            <button
              type="button"
              onClick={clearHistory}
              className="rounded-md px-1.5 py-1 text-[11px] text-stone-600 underline decoration-dotted underline-offset-2 transition-colors hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              امسح
            </button>
          </div>
        )}
      </form>

      {/* Results region — every outcome is announced once */}
      <div aria-live="polite" aria-busy={loading}>
        <AnimatePresence mode="wait" initial={false}>
          {loading && (
            <motion.div
              key="loading"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <span className="sr-only">جاري البحث عن {searchedRef}</span>
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="bg-emerald-50 p-5">
                  <Skeleton className="mb-2 h-3 w-20" />
                  <Skeleton className="mb-3 h-5 w-40" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Skeleton className="mt-0.5 h-4 w-4" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!loading && notFound && (
            <motion.div
              key="not-found"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-soft-sm">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <SearchX aria-hidden className="h-6 w-6" />
                </span>
                <h2 className="font-display text-base font-bold text-stone-900">
                  لا توجد قضية بالرقم{" "}
                  <span className="number-mono">{searchedRef}</span>
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-stone-600">
                  الصيغة صحيحة، لكن لا يوجد ملف بهذا الرقم. راجع الرقم في رسالة
                  التقديم — الخطأ الأكثر شيوعاً هو رقم واحد مفقود أو زائد.
                </p>

                <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/v2/submit">
                      لم أقدّم بعد — قدّم الآن
                      <ArrowLeft aria-hidden className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {!loading && found && details && (
            <motion.div
              key={found.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <CaseResult
                caseData={details.case}
                branch={details.branch}
                coordinator={details.coordinator}
              />
            </motion.div>
          )}

          {!loading && isEmpty && (
            <motion.div
              key="empty"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <div className="rounded-2xl border border-dashed border-stone-300 bg-[#faf7f2] p-6 lg:p-7">
                <h2 className="font-display text-[0.95rem] font-bold text-stone-900">
                  ما ستراه بعد البحث
                </h2>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-stone-600">
                  <li>· حالة القضية الآن، والفرع المسؤول عنها.</li>
                  <li>· اسم المنسق الذي يتابع ملفك، وموعد الالتزام.</li>
                  <li>· سجل الأحداث الموثّق بالوقت وصاحب كل خطوة.</li>
                </ul>

                <div className="mt-5 border-t border-stone-200 pt-4">
                  <p className="text-[11.5px] text-stone-600">
                    ما عندك رقم قريب؟ جرّب أحد أرقام العرض التجريبي:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SAMPLE_REFS.map((ref) => (
                      <button
                        key={ref}
                        type="button"
                        onClick={() => searchRef(ref, { silent: true })}
                        className="inline-flex min-h-[2.25rem] items-center rounded-full bg-white px-3 py-1.5 font-mono text-[11px] text-stone-700 ring-1 ring-stone-200 transition-colors hover:bg-emerald-50 hover:text-emerald-800 hover:ring-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {ref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
