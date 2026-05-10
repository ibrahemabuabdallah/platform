import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { WhatIs } from "@/components/landing/what-is";
import { JourneyTimeline } from "@/components/landing/journey-timeline";
import { AIDemo } from "@/components/landing/ai-demo";
import { StatsCounters } from "@/components/landing/stats-counters";
import { HeatmapSection } from "@/components/landing/heatmap-section";
import { ResolvedMarquee } from "@/components/landing/resolved-marquee";
import { Categories } from "@/components/landing/categories";
import { Privacy } from "@/components/landing/privacy";
import { SLASection } from "@/components/landing/sla-section";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatIs />
      <JourneyTimeline />
      <AIDemo />
      <StatsCounters />
      <HeatmapSection />
      <ResolvedMarquee />
      <Categories />
      <Privacy />
      <SLASection />
      <FinalCTA />
    </>
  );
}
