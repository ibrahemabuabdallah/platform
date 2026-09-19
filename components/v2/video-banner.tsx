"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Minimal typings for the bit of the YouTube IFrame API used here             */
/* -------------------------------------------------------------------------- */

declare global {
  interface YTPlayer {
    playVideo(): void;
    mute(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    loadVideoById(options: {
      videoId: string;
      startSeconds: number;
    }): void;
    getCurrentTime(): number;
    destroy(): void;
  }

  interface YTNamespace {
    Player: new (
      element: HTMLElement | string,
      options: Record<string, unknown>
    ) => YTPlayer;
    PlayerState: { ENDED: number; PLAYING: number };
  }

  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

/** Resolves once the IFrame API is on the page, shared by every caller. */
let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube API loaded without a player"));
    };

    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      script.onerror = () => reject(new Error("YouTube API blocked"));
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}

/* -------------------------------------------------------------------------- */

export interface VideoBannerProps {
  /** YouTube id of the source film. */
  videoId: string;
  /**
   * Second the excerpt starts at, and how long it runs before looping back.
   * These two numbers are the whole tuning surface — change them to move the
   * banner to a different moment of the film.
   */
  startSeconds: number;
  durationSeconds: number;
  /** Described for assistive tech, which cannot see the footage. */
  label: string;
  children: ReactNode;
  className?: string;
}

export function VideoBanner({
  videoId,
  startSeconds,
  durationSeconds,
  label,
  children,
  className,
}: VideoBannerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Someone who has asked for less motion gets the still banner, not a loop.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;
    const endSeconds = startSeconds + durationSeconds;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !mountRef.current) return;

        playerRef.current = new YT.Player(mountRef.current, {
          videoId,
          // The privacy-enhanced host keeps YouTube from setting cookies until play.
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            playsinline: 1,
            start: startSeconds,
          },
          events: {
            onReady: (event: { target: YTPlayer }) => {
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event: { data: number; target: YTPlayer }) => {
              if (event.data === YT.PlayerState.PLAYING) {
                if (!cancelled) setPlaying(true);
              }
              if (event.data === YT.PlayerState.ENDED) {
                event.target.seekTo(startSeconds, true);
                event.target.playVideo();
              }
            },
            // A blocked or unplayable video simply leaves the still banner up.
            onError: () => {
              if (!cancelled) setPlaying(false);
            },
          },
        });

        // `end` alone cannot loop a segment, so the excerpt is rewound by hand.
        poll = setInterval(() => {
          const player = playerRef.current;
          if (!player) return;
          try {
            if (player.getCurrentTime() >= endSeconds) {
              player.seekTo(startSeconds, true);
            }
          } catch {
            // The player is not ready yet, or is gone; the next tick retries.
          }
        }, 400);
      })
      .catch(() => {
        // No network, an ad blocker, or a corporate proxy — the fallback stands.
      });

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      try {
        playerRef.current?.destroy();
      } catch {
        // Already torn down.
      }
      playerRef.current = null;
    };
  }, [videoId, startSeconds, durationSeconds]);

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

      {/* The player, sized to cover the banner */}
      <div
        aria-hidden
        className={cn(
          "video-cover-stage absolute inset-0 transition-opacity duration-700",
          playing ? "opacity-100" : "opacity-0"
        )}
      >
        <div ref={mountRef} className="video-cover-frame" />
      </div>

      {/* Cinematic layer */}
      <div aria-hidden className="cinema-scrim absolute inset-0" />
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
