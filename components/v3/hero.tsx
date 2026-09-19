import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  VideoSequenceBanner,
  type LocalVideoSegment,
} from "@/components/v3/video-sequence-banner";

/**
 * تسلسل لقطات البنر — ملفات محلية في public/media/hero، بلا أي مشغّل خارجي:
 * 1. لقطة جوية سينمائية فوق عمّان — أبراجها وشوارعها من الأعلى —
 *    لتفتح المشهد باتساع البلد.
 * 2. لقطة معالم هادئة بلا وجوه، تكمل الاتساع بجمال المكان.
 *
 * التسلسل كله يعاد كحلقة واحدة بتلاشٍ متبادل بين اللقطتين.
 */
const SEGMENTS: readonly LocalVideoSegment[] = [
  {
    src: "/media/hero/aerial-amman.mp4",
    poster: "/media/hero/aerial-amman-poster.jpg",
  },
  {
    src: "/media/hero/city-landmarks.mp4",
    poster: "/media/hero/city-landmarks-poster.jpg",
  },
];

/**
 * هيرو v3: بنر فيديو مدمج وليس شاشة كاملة. على اللابتوب يخرج بارتفاع
 * قريب من نصف الشاشة، وعلى الموبايل يبقى بنراً لا يبتلع ما تحته.
 * العنوان والزران فوق الفيديو تحت تعتيم سينمائي.
 */
export function Hero() {
  return (
    <VideoSequenceBanner
      segments={SEGMENTS}
      scrimClassName="cinema-scrim-v3"
      label="لقطات جوية لمدينة عمّان: أبراجها وأفقها الممتد تحت ضوء الغروب."
    >
      <div className="container flex min-h-[440px] items-end justify-center pb-10 pt-16 text-center md:min-h-[480px] md:pb-12 lg:min-h-[520px] lg:pb-14">
        <div className="max-w-xl">
          <h1 className="text-balance font-display text-[1.9rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-white sm:text-[2.5rem] lg:text-5xl">
            صوتك يصل.
            <span className="text-gradient-gold-animated">
              {" "}
              شكواك تُحلّ.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone-200/90 lg:text-base">
            قدّم شكواك أو مقترحك في دقيقتين، وتابعها برقم مرجعي واحد.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button asChild variant="gold" size="lg" className="sm:w-auto">
              <Link href="/submit">
                <span>قدّم شكوى</span>
                <ArrowLeft aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="/track"
              className="text-sm font-display font-semibold text-white/80 underline decoration-white/30 underline-offset-8 transition-colors hover:text-gold-300 hover:decoration-gold-400"
            >
              تتبع طلبك
            </Link>
          </div>
        </div>
      </div>
    </VideoSequenceBanner>
  );
}
