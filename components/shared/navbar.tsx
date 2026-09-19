"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, ShieldCheck, X } from "lucide-react";
import { Logo } from "./logo";
import { NotificationsBell } from "./notifications-bell";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/#journey", label: "كيف تعمل" },
  { href: "/#impact", label: "الأثر" },
  { href: "/#categories", label: "أنواع الطلبات" },
  { href: "/track", label: "تتبّع طلب" },
];

const workspaceLinks = [
  { href: "/dashboard", label: "لوحة القيادة" },
  { href: "/cases", label: "القضايا" },
  { href: "/coordinator", label: "المنسق" },
  { href: "/reports", label: "التقارير" },
];

const arabicNumerals = ["٠١", "٠٢", "٠٣", "٠٤", "٠٥", "٠٦"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isWorkspace = workspaceLinks.some(({ href }) =>
    pathname.startsWith(href)
  );
  const links = isWorkspace ? workspaceLinks : publicLinks;
  // الرئيسية فقط: الهيدر يطفو شفافاً فوق فيديو الهيرو
  const isHome = pathname === "/";

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <header className={cn("top-0 z-40", isHome ? "absolute inset-x-0" : "sticky")}>
        {/* تدرّج قراءة أعلى الفيديو — الرئيسية فقط */}
        {isHome && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-950/85 via-emerald-950/40 to-transparent"
          />
        )}
        {/* Main bar — solid on inner pages, transparent over the hero on home */}
        <div
          className={cn(
            "relative border-b",
            isHome
              ? "border-transparent"
              : "overflow-hidden border-gold-500/30 bg-emerald-950 shadow-[0_18px_40px_-18px_rgba(2,44,34,.85)]"
          )}
        >
          {/* Faint emblem engraving — decorative only */}
          {!isHome && (
            <div
              aria-hidden
              className="emblem-pattern-dark pointer-events-none absolute inset-0 opacity-[0.05]"
            />
          )}
          {/* Deep seal shadow line under the bar */}
          {!isHome && (
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-transparent via-gold-400/70 to-transparent"
            />
          )}
          <div className="container relative">
            <div className="relative flex h-[68px] items-center justify-between gap-3">
              {/* الهاتف: زر المنيو بأقصى اليمين — يفتح نفس القائمة الجانبية */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-white transition hover:bg-white/10 xl:hidden",
                  isHome && "translate-y-3"
                )}
                aria-label="فتح قائمة التنقل"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* الكمبيوتر: اللوغو في البداية كما كان */}
              <div className="hidden xl:block">
                <Logo variant="light" />
              </div>

              {/* الهاتف: شعار الأمانة العامة — بالرئيسية ميدالية كبيرة تتدلى فوق الفيديو */}
              <Link
                href="/"
                aria-label="الرئيسية"
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 xl:hidden",
                  isHome && "top-full -translate-y-1/2"
                )}
              >
                <Image
                  src="/amanah-logo.png"
                  alt="شعار الأمانة العامة لمجلس الوزراء"
                  width={1257}
                  height={505}
                  priority
                  className={cn(
                    "rounded-full",
                    isHome
                      ? "h-auto w-[min(72vw,260px)] bg-white/90 px-4 py-2.5 shadow-[0_0_24px_2px_rgba(255,255,255,.3)] backdrop-blur-md"
                      : "h-14 w-auto bg-white px-3 py-1.5 shadow-sm"
                  )}
                />
              </Link>

              <span
                aria-hidden
                className="hidden h-8 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent xl:block"
              />

              <nav
                className="hidden items-center gap-1 xl:flex"
                aria-label="التنقل الرئيسي"
              >
                {links.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : !link.href.includes("#") &&
                        pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative rounded-full px-4 pb-3 pt-3.5 text-sm font-bold transition-colors",
                        active
                          ? "bg-white/8 ring-1 ring-gold-500/35"
                          : "text-white/68 hover:bg-white/7 hover:text-white"
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rotate-45 bg-gold-400 shadow-[0_0_6px_rgba(232,197,71,.9)]"
                        />
                      )}
                      <span className={cn(active && "text-gold-engraved")}>
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                {/* الهاتف: جرس الإشعارات بأقصى اليسار */}
                <div className={cn("xl:hidden", isHome && "translate-y-3")}>
                  <NotificationsBell />
                </div>
                {/* زر التقديم على الكمبيوتر فقط — على الهاتف موجود داخل القائمة الجانبية */}
                <Link
                  href="/submit"
                  className="group relative hidden min-h-11 items-center gap-2 rounded-full bg-gold-400 px-4 text-sm font-extrabold text-emerald-950 shadow-[0_10px_30px_-14px_rgba(232,197,71,.8)] ring-1 ring-gold-200/60 transition duration-500 hover:bg-gold-300 active:scale-[.98] sm:px-5 xl:inline-flex"
                >
                  <span>قدّم الآن</span>
                  <span className="civic-button-icon">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="قائمة التنقل">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
          />
          <aside className="civic-card-dark emblem-frame-dark corner-marks absolute inset-y-3 end-3 flex w-[min(92vw,420px)] flex-col overflow-hidden rounded-[1.75rem] p-6 text-white">
            <div
              aria-hidden
              className="emblem-pattern-dark pointer-events-none absolute inset-0 opacity-60"
            />

            {/* Sheet header — seal + logo */}
            <div className="relative flex items-start justify-between">
              <div>
                <Logo variant="light" />
                <div className="mt-4 flex items-center gap-3">
                  <span className="official-seal h-11 w-11 text-[9px] font-bold">
                    رسمي
                  </span>
                  <div className="text-[11px] leading-5 text-white/50">
                    <p className="font-mono tracking-widest text-gold-400/80">
                      NA-2026 / ٠١
                    </p>
                    <p>سجلّ التنقل الرسمي</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/12"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="emblem-rule relative mt-6" aria-hidden>
              <span />
            </div>

            {/* Numbered document links */}
            <nav className="relative mt-2 flex-1 overflow-y-auto" aria-label="قائمة الجوال">
              <ol>
                {links.map((link, index) => (
                  <li
                    key={link.href}
                    className="sheet-item border-b border-gold-500/20"
                    style={{ animationDelay: `${0.08 + index * 0.07}s` }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-4 py-5 transition-colors"
                    >
                      <span className="doc-number text-2xl font-bold">
                        {arabicNumerals[index]}
                      </span>
                      <span className="flex-1 font-display text-xl font-extrabold text-white/85 transition-colors group-hover:text-gold-300">
                        {link.label}
                      </span>
                      <ArrowLeft className="h-4 w-4 text-gold-500/50 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-gold-300" />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Fixed actions footer */}
            <div
              className="sheet-item relative mt-4 rounded-2xl border border-gold-500/30 bg-white/6 p-4"
              style={{ animationDelay: `${0.12 + links.length * 0.07}s` }}
            >
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/submit"
                  className="rounded-full bg-gold-400 px-4 py-3.5 text-center text-sm font-extrabold text-emerald-950 transition hover:bg-gold-300"
                >
                  تقديم طلب
                </Link>
                <Link
                  href="/track"
                  className="rounded-full border border-white/20 px-4 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  تتبّع الطلب
                </Link>
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/45">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400/80" />
                بيانات مشفّرة · تتبع لحظي للطلبات
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
