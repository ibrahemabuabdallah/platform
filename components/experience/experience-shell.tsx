"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

interface ExperienceShellProps {
  children: ReactNode;
}

export function ExperienceShell({ children }: ExperienceShellProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const [section, setSection] = useState<string>("hero");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-experience-section]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-experience-section");
          if (id) setSection(id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        style={{ scaleX: reduce ? 1 : progress, transformOrigin: "right" }}
        className="fixed top-0 inset-x-0 z-30 h-[3px] origin-right bg-gradient-to-l from-emerald-500 via-gold-400 to-emerald-500 shadow-[0_0_18px_rgba(232,197,71,0.55)]"
      />

      <aside
        aria-hidden
        className="hidden xl:flex fixed top-1/2 start-6 z-30 -translate-y-1/2 flex-col gap-2 pointer-events-none"
      >
        {SECTIONS.map((s) => {
          const active = section === s.id;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className={`h-[2px] transition-all duration-500 ${
                  active
                    ? "w-10 bg-gold-400 shadow-[0_0_12px_rgba(232,197,71,0.7)]"
                    : "w-4 bg-emerald-700/50"
                }`}
              />
              <span
                className={`font-display text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  active ? "text-gold-300 opacity-100" : "text-emerald-300/40 opacity-0"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </aside>

      <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-50">
        {children}
      </div>
    </div>
  );
}

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: "hero", label: "Hero" },
  { id: "trust", label: "Trust" },
  { id: "story", label: "Story" },
  { id: "journey", label: "Journey" },
  { id: "ai", label: "AI" },
  { id: "stats", label: "Stats" },
  { id: "heat", label: "Heat" },
  { id: "categories", label: "Categories" },
  { id: "privacy", label: "Privacy" },
  { id: "sla", label: "SLA" },
  { id: "cta", label: "CTA" },
];
