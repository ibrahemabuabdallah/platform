import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { TrackConsole } from "@/components/v2/track-console";

export const metadata: Metadata = {
  title: "تتبع طلب",
  description:
    "تابع حالة شكوتك بالرقم المرجعي — الحالة، الفرع المسؤول، المنسق، وسجل الأحداث.",
};

function ConsoleFallback() {
  return (
    <div className="container max-w-3xl py-8 lg:py-12">
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft-sm lg:p-7">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-3 h-4 w-3/4" />
        <Skeleton className="mt-4 h-12 w-full" />
      </div>
    </div>
  );
}

export default function V2TrackPage() {
  return (
    <>
      <PageHeader
        badge="تتبع طلب"
        title="أين وصل ملفك؟"
        description="الرقم المرجعي وحده يكفي — لا حساب، ولا كلمة مرور، ولا انتظار على الهاتف."
      />

      {/* useSearchParams needs a boundary for this page to stay prerendered */}
      <Suspense fallback={<ConsoleFallback />}>
        <TrackConsole />
      </Suspense>
    </>
  );
}
