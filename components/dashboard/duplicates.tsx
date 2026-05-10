"use client";

import Link from "next/link";
import { Copy, ChevronLeft, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cases as defaultCases } from "@/data/cases";
import type { Case } from "@/types";

interface DuplicatesCardProps {
  cases?: Case[];
}

export function DuplicatesCard({ cases = defaultCases }: DuplicatesCardProps) {
  const duplicates = cases
    .filter(
      (c) =>
        c.aiClassification.duplicateRisk > 30 ||
        c.aiClassification.potentialDuplicates.length > 0
    )
    .slice(0, 4);

  return (
    <Card>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Copy className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-stone-900">
              قضايا مكررة محتملة
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              مرشحة للدمج تلقائياً
            </p>
          </div>
        </div>
      </div>

      {duplicates.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="font-display font-bold text-sm text-stone-900 mb-1">
            لا قضايا مكررة مشبوهة
          </p>
          <p className="text-xs text-stone-500">
            جميع القضايا فريدة ضمن الفلاتر المختارة
          </p>
        </div>
      ) : (
      <ul className="divide-y divide-stone-100">
        {duplicates.map((c) => {
          const risk = c.aiClassification.duplicateRisk;
          const isHigh = risk > 60;
          return (
            <li key={c.id}>
              <Link
                href={`/cases/${c.id}`}
                className="flex items-start gap-3 p-4 hover:bg-stone-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] text-stone-500 mb-0.5">
                    {c.ref}
                  </p>
                  <p className="text-sm font-medium text-stone-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {c.title}
                  </p>
                  {c.aiClassification.potentialDuplicates.length > 0 && (
                    <p className="text-[11px] text-stone-500 mt-1">
                      احتمال تكرار:{" "}
                      <span className="font-mono text-violet-700">
                        {c.aiClassification.potentialDuplicates[0]}
                      </span>
                    </p>
                  )}
                </div>
                <div className="text-center shrink-0">
                  <div
                    className={`text-base font-display font-extrabold ${
                      isHigh ? "text-red-600" : "text-violet-600"
                    }`}
                  >
                    {risk}%
                  </div>
                  <div className="text-[10px] text-stone-400">تشابه</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      )}

      <div className="p-3 border-t border-border bg-stone-50/40">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href="/cases">
            مراجعة جميع المكررات
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
