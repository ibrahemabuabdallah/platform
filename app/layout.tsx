import type { Metadata, Viewport } from "next";
import {
  Tajawal,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
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
  title: "صوتك | منصة خدمة المواطن",
  description:
    "منصة ذكية لإدارة الشكاوى والمقترحات من الاستقبال حتى التدخل الميداني. صوتك يصل، شكواك تُحلّ.",
  keywords: ["شكاوى", "مقترحات", "خدمة المواطن", "تدخل ميداني"],
  authors: [{ name: "منصة صوتك" }],
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
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster
          position="top-center"
          dir="rtl"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
