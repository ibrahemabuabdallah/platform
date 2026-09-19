import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "نبض الأمة | الرئيسية الجديدة (تجريبية)",
    template: "%s | نبض الأمة",
  },
  description:
    "مساحة تركيب للرئيسية الجديدة من منصة نبض الأمة — نفس الهوية، هيكل جاهز للأفكار.",
  robots: { index: false, follow: false },
};

/**
 * طبقات الخلفية انتقلت إلى الـ RootLayout (app/layout.tsx) وأصبحت معمّمة
 * على كامل الموقع، لذا هذا الـ layout أصبح مجرد معرّف metadata حتى يبقى
 * مسار ‎/v3 مطابقاً تماماً للرئيسية دون تكرار طبقات الخلفية.
 */
export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
