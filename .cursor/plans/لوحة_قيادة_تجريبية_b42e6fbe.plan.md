---
name: لوحة قيادة تجريبية
overview: إضافة مسار جديد كلياً للوحة قيادة بتجربة بصرية وأنيميشن غير تقليدية، مع تفضيل اختياري من الإعدادات يوجّه رابط التنقل دون تغيير ملف لوحة القيادة الحالية.
todos:
  - id: studio-route
    content: إنشاء app/dashboard/studio/page.tsx وغلاف المشهد + إعادة تجميع نفس مكوّنات اللوحة داخل تخطيط جديد
    status: completed
  - id: studio-components
    content: إضافة components/dashboard/studio/* (خلفية، spine، KPI orbit، أقسام) مع احترام reduced-motion
    status: completed
  - id: preference-lib
    content: إضافة lib/dashboard-experience.ts (localStorage + cookie اختياري) ودوال قراءة آمنة للعميل
    status: completed
  - id: settings-toggle
    content: إضافة تبويب/قسم في app/settings/page.tsx مع Switch وربط التفضيل
    status: completed
  - id: navbar-href
    content: تحديث components/shared/navbar.tsx لربط رابط لوحة القيادة بالتفضيل وحالة active
    status: completed
  - id: verify
    content: تشغيل npm run build و npm run type-check
    status: completed
isProject: false
---

# لوحة قيادة إضافية بتجربة بصرية وأنيميشن (الحالية دون تعديل)

## ما تم الاتفاق عليه

- **النطاق**: لوحة القيادة فقط — الملف الحالي [`app/dashboard/page.tsx`](c:\xampp\htdocs\platform\app\dashboard\page.tsx) يبقى **بدون أي تعديل**.
- **التعايش**: مسار جديد صريح **و** تبديل في الإعدادات يحفظ الاختيار (مع ربط التنقل في الشريط العلوي).

المكدس الحالي يدعم ذلك: **Framer Motion** مثبت ومستخدم في اللوحة الحالية، و**Tailwind** + مكوّنات **shadcn** (`Card`, `Button`, …) في [`components/`](c:\xampp\htdocs\platform\components).

## اتجاه إبداعي (غير القوالب الشائعة)

الهدف تجنب نمط «بطاقات تظهر بـ fade من الأسفل» كفكرة وحيدة، وبناء **هوية مشهدية** للوحة:

1. **خلفية حية من طبقتين**: شبكة منقّطة أو خطوط إرشادية خفيفة + **ضباب لوني متحرك (mesh / aurora)** بحدود CSS وـ`transform`/`opacity` فقط — خفيف على الأداء، بدون فيديو.
2. **ممر زمني تشغيلي (Operational spine)**: شريط عمودي أو أفقي رفيع يشبه «نبض المنصة» — أرقام أو شارات صغيرة تتحرك بـ stagger داخل الـ spine، يعطي إحساس مراقبة حية دون تقليد «سكربت أخبار» كامل الشاشة.
3. **بطاقات KPI كـ «عُقد»**: نفس محتوى الـ KPI لكن داخل غلاف جديد: **tilt خفيف نحو المؤشر** على سطح المكتب فقط (`rotateX/Y` صغيرة مع `perspective`)، وانتقالات spring من Framer Motion؛ على الجوال تبسيط الحركة إلى fade قصير.
4. **تسلسل دخول المخططات**: استخدام **layout animations** (`layout`) أو **shared transition** بين عنوان القسم والمحتوى — أقل استخداماً من الـ fade العام ويبدو أكثر «صمماً».
5. **إتاحة وتقليل الحركة**: احترام `prefers-reduced-motion: reduce` — إيقاف الـ mesh والـ tilt والـ stagger واستبدالها بظهور ثابت فوري.

## التنفيذ التقني

### 1) مسار جديد

- إنشاء [`app/dashboard/studio/page.tsx`](c:\xampp\htdocs\platform\app\dashboard\studio\page.tsx) (الاسم قابل للتعديل إلى ما تفضّله لاحقاً).
- الصفحة **تستورد نفس المكوّنات الوظيفية** المستخدمة في اللوحة الحالية ([`FiltersBar`](c:\xampp\htdocs\platform\components\dashboard\filters-bar.tsx)، [`StatCard`](c:\xampp\htdocs\platform\components\shared\stat-card.tsx)، المخططات في [`components/dashboard/charts`](c:\xampp\htdocs\platform\components\dashboard\charts)، [`RecentCases`](c:\xampp\htdocs\platform\components\dashboard\recent-cases.tsx)، إلخ) وتلفّها في تخطيط وغلاف جديد.
- **عدم تعديل** [`app/dashboard/page.tsx`](c:\xampp\htdocs\platform\app\dashboard\page.tsx) يعني تكرار تجميعة الـ props/البيانات الثابتة الحالية داخل صفحة الـ studio (أو نسخ مقطع JSX المكافئ) — مقصود لتفادي أي refactor يمسّ الملف الأصلي؛ لاحقاً يمكن دمج مصدر بيانات واحد إن رغبت.

### 2) مكوّنات غلاف جديدة (ملفات جديدة فقط ضمن مجلد)

مثال هيكل مقترح:

- [`components/dashboard/studio/studio-shell.tsx`](c:\xampp\htdocs\platform\components\dashboard\studio\studio-shell.tsx) — الخلفية المتحركة، الـ spine، حدود الصفحة.
- [`components/dashboard/studio/studio-kpi-orbit.tsx`](c:\xampp\htdocs\platform\components\dashboard\studio\studio-kpi-orbit.tsx) — غلاف الـ KPI والأنيميشن.
- [`components/dashboard/studio/studio-section.tsx`](c:\xampp\htdocs\platform\components\dashboard\studio\studio-section.tsx) — عنوان قسم + حركة دخول موحّدة للمخططات.

لا حاجة لمكتبات ثلاثية الأبعاد ثقيلة؛ كل شيء عبر **Framer Motion + CSS** الموجودين.

### 3) تفضيل المستخدم (إعدادات + تنقل)

- إضافة ملف صغير مثل [`lib/dashboard-experience.ts`](c:\xampp\htdocs\platform\lib\dashboard-experience.ts):
  - مفتاح تخزين واضح (مثلاً `sawtak:dashboard:variant`).
  - قيمتان: `classic` | `studio`.
  - عند التبديل في الإعدادات: كتابة `localStorage` + **مزامنة اختيارية** مع `document.cookie` بسيطة (مسار `/`، مدة سنة) لتسهيل أي توسعة لاحقة بـ middleware بدون إلزام المشروع بإنشاء [`middleware.ts`](c:\xampp\htdocs\platform\middleware.ts) الآن.
- في [`app/settings/page.tsx`](c:\xampp\htdocs\platform\app\settings\page.tsx): تبويب جديد **«المظهر»** أو قسم داخل تبويب موجود يحتوي `Switch` من [`components/ui/switch.tsx`](c:\xampp\htdocs\platform\components\ui\switch.tsx) + نص يشرح أن التجربة الجديدة على [`/dashboard/studio`](c:\xampp\htdocs\platform\app\dashboard\studio\page.tsx) وأن الكلاسيكية على `/dashboard`.
- في [`components/shared/navbar.tsx`](c:\xampp\htdocs\platform\components\shared\navbar.tsx): بعد `useEffect` الأول، قراءة التفضيل على العميل؛ إن كانت القيمة `studio` فـ `href` لرابط «لوحة القيادة» يصبح `/dashboard/studio`، وإلا يبقى `/dashboard`. يفضّل أن يكون الرابط النشط يطابق كلا المسارين (`pathname.startsWith('/dashboard')`) حتى لا ينطفئ التمييز عند زيارة الـ studio.

### 4) التحقق

- تشغيل `npm run build` و `npm run type-check` من جذر المشروع.

## ملخص الملفات

| الإجراء | الملف |
|--------|--------|
| بدون تغيير | [`app/dashboard/page.tsx`](c:\xampp\htdocs\platform\app\dashboard\page.tsx) |
| جديد | `app/dashboard/studio/page.tsx` + مكوّنات تحت `components/dashboard/studio/` |
| جديد | `lib/dashboard-experience.ts` |
| تعديل | [`app/settings/page.tsx`](c:\xampp\htdocs\platform\app\settings\page.tsx)، [`components/shared/navbar.tsx`](c:\xampp\htdocs\platform\components\shared\navbar.tsx) |

## مخاطر وضوابط

- **ازدواجية بيانات واجهة**: بما أن اللوحة الحالية تستخدم أرقاماً ثابتة داخل الصفحة، نسخة الـ studio ستكررها إلى حين توحيد مصدر بيانات لاحقاً.
- **الأداء**: الاعتماد على CSS للخلفية المتحركة وتقليل الطبقات المموهة على الجوال؛ تعطيل الحركات عند `prefers-reduced-motion`.
