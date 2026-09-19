import type { Metadata, Viewport } from "next";
import {
  Tajawal,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MotionProvider } from "@/components/shared/motion-provider";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://nabdalomah.al-khayal.store"
  ),
  title: "نبض الأمة | منصة خدمة المواطنين",
  description:
    "منصة ذكية لإدارة الشكاوى والمقترحات من الاستقبال حتى التدخل الميداني. صوتك يصل، شكواك تُحلّ.",
  keywords: ["شكاوى", "مقترحات", "خدمة المواطن", "تدخل ميداني"],
  authors: [{ name: "منصة نبض الأمة" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#047857",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${plexArabic.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <MotionProvider>
          <a
            href="#main-content"
            className="skip-link"
          >
            انتقل إلى المحتوى الرئيسي
          </a>
          <div className="relative flex min-h-screen flex-col overflow-hidden gradient-mesh-light">
            {/* طبقة النقاط الدافئة (خفيفة جداً) */}
            <div
              aria-hidden
              className="absolute inset-0 dot-pattern-warm opacity-[0.35] pointer-events-none"
            />

            {/* كتلة ضبابية ذهبية أعلى اليسار */}
            <div
              aria-hidden
              className="aurora-blob absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(232,197,71,0.22) 0%, rgba(232,197,71,0.07) 40%, rgba(232,197,71,0) 70%)",
                filter: "blur(40px)",
              }}
            />
            {/* كتلة ضبابية زمردية يمين الوسط */}
            <div
              aria-hidden
              className="aurora-blob absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.06) 40%, rgba(16,185,129,0) 70%)",
                filter: "blur(40px)",
                animationDelay: "-9s",
              }}
            />

            <Navbar />
            <main id="main-content" className="relative flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-center"
            dir="rtl"
            richColors
            closeButton
          />
        </MotionProvider>
      </body>
    </html>
  );
}
