"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  dashboardHrefFor,
  useDashboardVariant,
} from "@/lib/dashboard-experience";
import {
  landingHrefFor,
  useLandingVariant,
} from "@/lib/landing-experience";

interface NavLink {
  href: string;
  label: string;
  matchPrefix?: string;
  matchPaths?: string[];
}

function isLinkActive(link: NavLink, pathname: string): boolean {
  if (link.matchPaths && link.matchPaths.length > 0) {
    return link.matchPaths.some((p) =>
      p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(`${p}/`),
    );
  }
  const matchAgainst = link.matchPrefix ?? link.href;
  if (matchAgainst === "/") return pathname === "/";
  return pathname.startsWith(matchAgainst);
}

const baseNavLinks: NavLink[] = [
  { href: "/", label: "الرئيسية", matchPaths: ["/", "/experience"] },
  { href: "/dashboard", label: "لوحة القيادة", matchPrefix: "/dashboard" },
  { href: "/cases", label: "القضايا" },
  { href: "/coordinator", label: "المنسق" },
  { href: "/reports", label: "التقارير" },
  { href: "/track", label: "تتبع طلب" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { variant, hydrated } = useDashboardVariant();
  const {
    variant: landingVariant,
    hydrated: landingHydrated,
  } = useLandingVariant();

  const navLinks = useMemo<NavLink[]>(() => {
    return baseNavLinks.map((link) => {
      if (link.matchPrefix === "/dashboard") {
        return {
          ...link,
          href: hydrated ? dashboardHrefFor(variant) : link.href,
        };
      }
      if (link.label === "الرئيسية") {
        return {
          ...link,
          href: landingHydrated ? landingHrefFor(landingVariant) : link.href,
        };
      }
      return link;
    });
  }, [variant, hydrated, landingVariant, landingHydrated]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-emerald-900/95 backdrop-blur-lg border-b border-gold-500/20 shadow-soft-md"
            : "bg-emerald-900 border-b border-emerald-800/50"
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <Logo variant="light" />

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link, pathname);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-display font-semibold transition-all",
                      isActive
                        ? "bg-emerald-800 text-gold-400"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="gold"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/submit">قدّم الآن</Link>
              </Button>
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="فتح القائمة"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="gold-line" />
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={cn(
            "absolute end-0 top-0 h-full w-[85%] max-w-sm bg-emerald-900 shadow-soft-lg transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          )}
          dir="rtl"
        >
          <div className="flex items-center justify-between p-4 border-b border-emerald-800">
            <Logo variant="light" />
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link, pathname);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-display font-semibold transition-all",
                    isActive
                      ? "bg-emerald-800 text-gold-400"
                      : "text-white/80 hover:bg-emerald-800/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/settings"
              className="rounded-xl px-4 py-3 text-sm font-display font-semibold text-white/80 hover:bg-emerald-800/60 hover:text-white"
            >
              الإعدادات
            </Link>
          </nav>
          <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-emerald-800">
            <Button asChild variant="gold" size="lg" className="w-full">
              <Link href="/submit">قدّم شكوى أو مقترح</Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
