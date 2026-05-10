import Link from "next/link";
import { Mail, Phone, MapPin, Shield, Facebook, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { PLATFORM_NAME } from "@/lib/constants";

const footerLinks = [
  {
    title: "المنصة",
    links: [
      { href: "/", label: "الرئيسية" },
      { href: "/submit", label: "تقديم شكوى" },
      { href: "/track", label: "تتبع طلب" },
      { href: "/cases", label: "القضايا" },
    ],
  },
  {
    title: "النظام",
    links: [
      { href: "/dashboard", label: "لوحة القيادة" },
      { href: "/coordinator", label: "بوابة المنسق" },
      { href: "/reports", label: "التقارير" },
      { href: "/settings", label: "الإعدادات" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { href: "#", label: "الأسئلة الشائعة" },
      { href: "#", label: "اتصل بنا" },
      { href: "#", label: "سياسة الخصوصية" },
      { href: "#", label: "شروط الاستخدام" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="gold-line" />
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-md">
              منصة ذكية تربط المواطنين بمتخذي القرار. صوتك يصل، شكواك تُحلّ —
              من الاستقبال حتى التدخل الميداني والإغلاق.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-white/70">
                <Phone className="h-4 w-4 text-gold-400" />
                <span dir="ltr">+962 6 5500100</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <Mail className="h-4 w-4 text-gold-400" />
                <span>support@sawtak.jo</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>عمان، المملكة الأردنية الهاشمية</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-sm mb-4 text-gold-400">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-[40px] -mx-2 px-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Shield className="h-3.5 w-3.5" />
            <span>
              حماية بياناتك أولوية — التقديم المجهول مدعوم بالكامل
            </span>
          </div>
          <div className="flex items-center gap-1 text-white/40">
            <a
              href="#"
              className="inline-flex items-center justify-center h-11 w-11 rounded-lg hover:text-gold-400 hover:bg-white/5 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center h-11 w-11 rounded-lg hover:text-gold-400 hover:bg-white/5 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs text-white/40">
            © 2026 {PLATFORM_NAME}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
