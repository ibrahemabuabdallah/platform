"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, Inbox, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoNotification {
  id: number;
  icon: typeof CheckCircle2;
  tone: string;
  title: string;
  body: string;
  refCode: string;
  time: string;
  unread: boolean;
}

/**
 * إشعارات تجريبية مبنية على حالات الطلبات الفعلية في المنصة — تُستبدل لاحقاً
 * ببيانات حقيقية عند ربط نظام الإشعارات.
 */
const DEMO_NOTIFICATIONS: readonly DemoNotification[] = [
  {
    id: 1,
    icon: CheckCircle2,
    tone: "text-emerald-400",
    title: "أُغلق طلبك بنجاح",
    body: "تسرّب مياه من الخط الرئيسي — حي النزهة، عمّان",
    refCode: "REF-2025-04812",
    time: "قبل ساعتين",
    unread: true,
  },
  {
    id: 2,
    icon: MapPin,
    tone: "text-orange-400",
    title: "نزول ميداني مجدول لطلبك",
    body: "أعمدة إنارة معطّلة في الشارع الفرعي",
    refCode: "REF-2025-04793",
    time: "أمس",
    unread: true,
  },
  {
    id: 3,
    icon: Inbox,
    tone: "text-sky-400",
    title: "استلمنا طلبك وحوّلناه للجهة المختصة",
    body: "حفرة كبيرة على الطريق الدولي",
    refCode: "REF-2025-04778",
    time: "قبل 3 أيام",
    unread: false,
  },
];

/**
 * جرس إشعارات الهاتف: زر دائري بنفس ستايل زر المنيو، يفتح لوحة منسدلة
 * بعرض الشاشة تقريباً تحت الشريط. تُغلق بكبسة خارجها أو بزر Escape.
 * يظهر على الهاتف فقط — الشقيق المسؤول عن إخفائه على الشاشات الكبيرة.
 */
export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const unreadCount = DEMO_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-white transition hover:bg-white/10"
        aria-label="الإشعارات"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="الإشعارات"
          className="sheet-item fixed inset-x-3 top-[80px] z-50 overflow-hidden rounded-2xl border border-gold-500/25 bg-[#061f19] text-white shadow-[0_24px_60px_-20px_rgba(2,44,34,.9)]"
        >
          {/* رأس اللوحة */}
          <div className="flex items-center justify-between border-b border-gold-500/20 px-4 py-3">
            <h2 className="font-display text-sm font-extrabold">الإشعارات</h2>
            <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[11px] font-bold text-gold-300">
              {unreadCount} جديدة
            </span>
          </div>

          {/* قائمة الإشعارات */}
          <ul className="divide-y divide-white/8">
            {DEMO_NOTIFICATIONS.map((n) => (
              <li key={n.id} className="flex gap-3 px-4 py-3.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/6",
                    n.tone
                  )}
                >
                  <n.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-bold text-white/90">
                    <span className="truncate">{n.title}</span>
                    {n.unread && (
                      <span
                        aria-label="غير مقروء"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                      />
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/55">
                    {n.body}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
                    <span className="font-mono tracking-wide text-gold-400/70">
                      {n.refCode}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{n.time}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* ذيل اللوحة */}
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="block border-t border-gold-500/20 bg-white/4 px-4 py-3 text-center text-sm font-bold text-gold-300 transition hover:bg-white/8"
          >
            تتبّع طلبك
          </Link>
        </div>
      )}
    </div>
  );
}
