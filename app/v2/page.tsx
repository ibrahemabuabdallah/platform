import type { Metadata } from "next";
import { Hero } from "@/components/v2/hero";
import { CasePath } from "@/components/v2/case-path";
import { Journey } from "@/components/v2/journey";
import { Proof } from "@/components/v2/proof";
import { Categories } from "@/components/v2/categories";
import { Privacy } from "@/components/v2/privacy";
import { Commitment } from "@/components/v2/commitment";
import { ClosingCTA } from "@/components/v2/closing-cta";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "قدّم شكوتك أو مقترحك وتابعه برقم مرجعي واحد — منصة نبض الأمة لخدمة المواطنين.",
};

/**
 * Seven sections instead of the original twelve. Each one answers a question the
 * citizen actually has: what is this, how does it work, does it work, which
 * track is mine, is it safe, when will it happen, and where do I start.
 */
export default function V2HomePage() {
  return (
    <>
      <Hero />
      <CasePath />
      <Journey />
      <Proof />
      <Categories />
      <Privacy />
      <Commitment />
      <ClosingCTA />
    </>
  );
}
