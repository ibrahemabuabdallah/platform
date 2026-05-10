# صوتك — منصة خدمة المواطن

> Prototype / UI Simulation كامل لمنصة إدارة الشكاوى والمقترحات والتدخلات الميدانية

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)](https://tailwindcss.com/)

## نظرة عامة

منصة Frontend-only كاملة الميزات بصرياً تحاكي منتج Civic-Tech حقيقي. كل تفاعل يعمل
بصرياً (Modals, Toasts, Mock state updates) بدون أي Backend.

## الميزات

- 9 صفحات تفاعلية بمحتوى عربي واقعي
- دعم RTL كامل
- Mobile-First Responsive Design
- خطوط عربية مخصصة (Cairo + Noto Kufi Arabic + JetBrains Mono)
- 20 قضية + 8 فروع + 6 منسقين + 5 لجان
- محرك تصنيف ذكي (محاكاة) مع Confidence Score
- Timeline تفاعلي لكل قضية
- Heatmap جغرافي
- Recharts للوحات القيادة والتقارير
- Animations مع Framer Motion
- Toasts مع sonner
- 9 Modals تفاعلية للأفعال

## الصفحات

| الصفحة             | الرابط           | الوصف                                 |
| ------------------ | ---------------- | ------------------------------------- |
| Landing            | `/`              | صفحة المواطنين بـ 12 قسماً             |
| تقديم شكوى         | `/submit`        | Stepper بـ 5 خطوات                    |
| تتبع طلب           | `/track`         | بحث برقم مرجعي                        |
| لوحة القيادة       | `/dashboard`     | KPIs + Charts + جداول                |
| بوابة المنسق        | `/coordinator`   | مهام + زيارات + إجراءات سريعة         |
| القضايا            | `/cases`         | جدول مع فلاتر و Pagination            |
| تفاصيل قضية         | `/cases/[id]`    | كل تفاصيل القضية + 6 إجراءات          |
| التقارير            | `/reports`       | تقارير أداء أسبوعية/شهرية/ربعية       |
| الإعدادات           | `/settings`      | الفروع، اللجان، SLA، RBAC، Audit      |

## التشغيل

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## السكربتات

```bash
npm run dev          # تشغيل بيئة التطوير
npm run build        # إنشاء بناء إنتاج
npm run start        # تشغيل بناء الإنتاج
npm run lint         # فحص ESLint
npm run type-check   # فحص أنواع TypeScript
```

## الهيكل

```
/app              صفحات App Router
/components
  /landing        مكونات صفحة المواطنين
  /dashboard      مكونات لوحة القيادة
  /shared         مكونات مشتركة (Logo, Navbar, Footer, ...)
  /ui             shadcn primitives
/data             Mock Data (20 قضية، 8 فروع، إلخ.)
/types            TypeScript types
/lib              utilities & constants
/public           assets (logo)
```

## الهوية البصرية

- **اللون الأساسي:** أخضر زمردي `#047857`
- **اللون المميز:** ذهبي `#c9a227`
- **محايد:** درجات Stone من Tailwind
- **خط العناوين:** IBM Plex Sans Arabic (أوزان 400/500/600/700)
- **خط النصوص:** Tajawal (أوزان 300/400/500/700)
- **خط المراجع:** JetBrains Mono

## ملاحظة

هذا Prototype للعرض فقط. لا يوجد Backend أو Database أو Authentication حقيقي.
كل التفاعلات محاكاة بصرية تستخدم Mock Data.
