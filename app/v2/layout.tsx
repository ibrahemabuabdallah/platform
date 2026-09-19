import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "نبض الأمة | النسخة الجديدة",
    template: "%s | نبض الأمة",
  },
  description:
    "النسخة الجديدة من واجهات المواطن في منصة نبض الأمة — نفس الهوية، تجربة استخدام أوضح.",
  robots: { index: false, follow: false },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
