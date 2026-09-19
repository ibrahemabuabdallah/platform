"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LocalVideoSegment {
  /** مسار الفيديو المحلي داخل public — مثل /media/hero/aerial-amman.mp4 */
  src: string;
  /** إطار ثابت يظهر قبل جاهزية الفيديو، ويبقى واجهة عند تقليل الحركة. */
  poster?: string;
}

export interface VideoSequenceBannerProps {
  /**
   * اللقطات المحلية بالترتيب. تُشغَّل واحدة تلو الأخرى بتلاشٍ متبادل، ثم
   * يعاد التسلسل كله كحلقة واحدة.
   */
  segments: readonly LocalVideoSegment[];
  /** Described for assistive tech, which cannot see the footage. */
  label: string;
  /**
   * The darkening layer above the footage. Defaults to the shared cinematic
   * scrim; v3 passes its own official-banner variant.
   */
  scrimClassName?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A banner that plays local excerpts in sequence. The footage lives inside
 * `public/media`, so nothing here waits on an external player: no iframe, no
 * third-party script, no cross-origin round-trip before the first frame.
 * Two stacked <video> elements crossfade; the outgoing one holds its last
 * frame while the incoming one fades in from its first.
 */
export function VideoSequenceBanner({
  segments,
  label,
  scrimClassName = "cinema-scrim",
  children,
  className,
}: VideoSequenceBannerProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const failedRef = useRef<Set<string>>(new Set());
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Someone who has asked for less motion gets the still banner, not a loop.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* Play the active segment from its first frame; park the rest. */
  useEffect(() => {
    if (reducedMotion || segments.length === 0) return;
    activeRef.current = activeIndex;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay blocked — the still banner simply stays up.
        });
      } else {
        video.pause();
      }
    });
  }, [activeIndex, reducedMotion, segments.length]);

  const advance = () =>
    setActiveIndex((index) => (index + 1) % Math.max(segments.length, 1));

  /** A broken file is skipped; if every file is broken the still banner stands. */
  const handleError = (src: string, index: number) => {
    failedRef.current.add(src);
    if (failedRef.current.size >= segments.length) {
      setPlaying(false);
      return;
    }
    if (index === activeRef.current) advance();
  };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#04231b]",
        className
      )}
    >
      {/* Still banner: the first thing painted, and the last line of defence */}
      <div
        aria-hidden
        className="video-fallback absolute inset-0"
      />

      {/* The local footage, sized to cover the banner */}
      {!reducedMotion && segments.length > 0 && (
        <div
          aria-hidden
          className={cn(
            "video-cover-stage absolute inset-0 transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0"
          )}
        >
          {segments.map((segment, index) => (
            <video
              key={segment.src}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className={cn(
                "video-cover-media transition-opacity duration-700",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
              src={segment.src}
              poster={segment.poster}
              muted
              playsInline
              preload="auto"
              onPlaying={() => {
                if (index === activeRef.current) setPlaying(true);
              }}
              onEnded={() => {
                if (index === activeRef.current) advance();
              }}
              onError={() => handleError(segment.src, index)}
            />
          ))}
        </div>
      )}

      {/* Cinematic layer */}
      <div aria-hidden className={cn(scrimClassName, "absolute inset-0")} />
      <div
        aria-hidden
        className="grid-pattern-dark pointer-events-none absolute inset-0 opacity-70"
      />

      {/* Footage carries meaning a screen reader cannot get otherwise */}
      <p className="sr-only">{label}</p>

      <div className="relative">{children}</div>
    </section>
  );
}
