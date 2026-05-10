import type { Metadata } from "next";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { CinematicHero } from "@/components/experience/cinematic-hero";
import { TrustMarquee } from "@/components/experience/trust-marquee";
import { StoryPanel } from "@/components/experience/story-panel";
import { JourneyThread } from "@/components/experience/journey-thread";
import { AITriageDemo } from "@/components/experience/ai-triage-demo";
import { LiveStats } from "@/components/experience/live-stats";
import { HeatJordan } from "@/components/experience/heat-jordan";
import { CategoryBento } from "@/components/experience/category-bento";
import { PrivacyVault } from "@/components/experience/privacy-vault";
import { SLAArcs } from "@/components/experience/sla-arcs";
import { FinalThread } from "@/components/experience/final-thread";

export const metadata: Metadata = {
  title: "صوتك | التجربة السينمائية الجديدة",
  description:
    "تجربة بصرية تفاعلية لمنصة صوتك — رحلة الشكوى من الاستقبال حتى التدخل الميداني بإيضاح ووضوح كامل.",
};

export default function ExperiencePage() {
  return (
    <ExperienceShell>
      <CinematicHero />
      <TrustMarquee />
      <StoryPanel />
      <JourneyThread />
      <AITriageDemo />
      <LiveStats />
      <HeatJordan />
      <CategoryBento />
      <PrivacyVault />
      <SLAArcs />
      <FinalThread />
    </ExperienceShell>
  );
}
