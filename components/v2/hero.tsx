import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickTrack } from "@/components/v2/quick-track";
import { VideoBanner } from "@/components/v2/video-banner";

/**
 * Banner footage: an aerial film of Amman. The excerpt runs over the city's
 * towers, its main road and the interchange below them — the streets and traffic
 * this platform exists to hear about, rather than a tourist reel.
 *
 * `START_SECONDS` and `EXCERPT_SECONDS` are the only two knobs. Keep the window
 * inside roughly 60–590: the film turns to hand-held ground footage after that,
 * and the banner loses its altitude and its polish.
 */
const FILM_ID = "NZfxs8IKsMM";
const START_SECONDS = 230;
const EXCERPT_SECONDS = 40;

/**
 * The citizen arrives with one of two errands — file something, or find out what
 * happened to what they already filed. Both are answered in the banner itself.
 * It stays a banner: tall enough to breathe, never the whole screen, so the
 * section beneath it is always in view.
 */
export function Hero() {
  return (
    <>
      <Banner />
      <PhoneQuickTrack />
    </>
  );
}

function Banner() {
  return (
    <VideoBanner
      videoId={FILM_ID}
      startSeconds={START_SECONDS}
      durationSeconds={EXCERPT_SECONDS}
      label="لقطات جوية لمدينة عمّان: أبراجها وشوارعها وحركة السير فيها."
    >
      <div className="container py-10 sm:py-12 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="lg:min-h-[17rem]">
            <h1 className="text-balance font-display text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.025em] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
              شكواك تُسجَّل، تُوجَّه،
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-l from-gold-200 via-gold-300 to-gold-200 bg-clip-text text-transparent">
                {" "}
                ويتابعها مسؤول باسمه
              </span>
            </h1>

            <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-stone-100/90 lg:text-base">
              تقدّم شكوتك أو مقترحك في دقيقتين، يستلمها فرعك المختص مع موعد
              التزام واضح، وتتابع كل خطوة برقم مرجعي واحد — وإن أردت، بلا أن
              تكشف عن هويتك.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="sm:w-auto">
                <Link href="/v2/submit">
                  <span>قدّم شكوى أو مقترح</span>
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline-light"
                size="lg"
                className="sm:w-auto"
              >
                <Link href="#journey">كيف تُعالَج شكواي؟</Link>
              </Button>
            </div>

            <p className="mt-5 inline-flex items-start gap-2 text-xs leading-relaxed text-stone-200/85">
              <ShieldCheck
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-gold-300"
              />
              بياناتك مشفّرة بالكامل — ولا تُعرض إلا للمنسق المسؤول عن ملفك.
            </p>
          </div>

          {/* On a wide screen the shortcut shares the banner with the headline */}
          <QuickTrack className="hidden lg:block lg:max-w-md lg:justify-self-end" />
        </div>
      </div>
    </VideoBanner>
  );
}

/**
 * On a phone the same shortcut straddles the bottom edge of the banner instead
 * of sitting inside it. It stays exactly where the eye expects it, and the
 * banner keeps a banner's height rather than swallowing the screen.
 */
function PhoneQuickTrack() {
  return (
    <div className="relative z-10 -mt-8 lg:hidden">
      <div className="container">
        <QuickTrack />
      </div>
    </div>
  );
}
