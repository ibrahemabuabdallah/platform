import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A committed emerald block closing the page — the one deliberate tonal shift,
 * placed at the end where it anchors rather than interrupts.
 */
export function ClosingCTA() {
  return (
    <section className="hero-gradient relative overflow-hidden py-20 text-white lg:py-24">
      <div
        aria-hidden
        className="grid-pattern-dark pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="aurora-soft-gold pointer-events-none absolute -bottom-40 start-[-10%] h-[80%] w-[55%]"
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-3xl lg:text-[2.5rem]">
            المشكلة التي سكتت عنها
            <span className="bg-gradient-to-l from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              {" "}
              لن تحلّ نفسها
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-[0.95rem] leading-relaxed text-emerald-50/85 sm:text-base">
            دقيقتان لتقديم الطلب، ورقم مرجعي واحد يبقى معك حتى الإغلاق. وإن
            كنت قدّمت سابقاً، تابع ما وصل إليه ملفك الآن.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
              <Link href="/v2/submit">
                <span>قدّم شكوى أو مقترح</span>
                <ArrowLeft aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link href="/v2/track">
                <Search aria-hidden className="h-4 w-4" />
                <span>تتبّع طلباً قائماً</span>
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-emerald-100/70">
            بياناتك محمية ومشفّرة — ولا يطّلع عليها إلا المنسق المسؤول.
          </p>
        </div>
      </div>
    </section>
  );
}
