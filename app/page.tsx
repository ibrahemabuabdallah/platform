import type { Metadata } from "next";
import { Hero } from "@/components/v3/hero";
import { NewsTicker } from "@/components/v3/news-ticker";
import { FeaturesTicker } from "@/components/v3/citizen-features-journey";
import { LiveRequestDemo } from "@/components/v3/live-request-demo";
import { CategoriesBento } from "@/components/v3/categories-bento";
import { CityPulse } from "@/components/v3/city-pulse";
import { ClosingCta } from "@/components/v3/closing-cta";

export const metadata: Metadata = {
  description:
    "منصة نبض الأمة — قدّم شكواك أو مقترحك، تتبّع رقمك المرجعي، وشاهد نبض مدينتك لحظة بلحظة.",
};

/**
 * الرئيسية الجديدة: بنر فيديو سينمائي، شريط مستجدات، مزايا، عرض حي
 * للتقديم، فئات الشكاوى، نبض المدينة، ثم خاتمة سينمائية بنداء الفعل.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsTicker />
      <FeaturesTicker />
      <LiveRequestDemo />
      <CategoriesBento />
      <CityPulse />
      <ClosingCta />
    </>
  );
}
