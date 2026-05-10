export interface ResolvedCase {
  ref: string;
  title: string;
  category: "خدمية" | "قانونية" | "سياسية" | "اقتراح";
  district: string;
  governorate: string;
  closedAt: string;
  durationDays: number;
}

export const resolvedCases: ResolvedCase[] = [
  {
    ref: "REF-2025-04812",
    title: "تسرّب مياه من الخط الرئيسي",
    category: "خدمية",
    district: "حي النزهة",
    governorate: "عمان",
    closedAt: "أمس",
    durationDays: 2.1,
  },
  {
    ref: "REF-2025-04793",
    title: "أعمدة إنارة معطّلة في الشارع الفرعي",
    category: "خدمية",
    district: "ضاحية الأمير راشد",
    governorate: "عمان",
    closedAt: "قبل 3 أيام",
    durationDays: 1.4,
  },
  {
    ref: "REF-2025-04778",
    title: "حفرة كبيرة على الطريق الدولي",
    category: "خدمية",
    district: "وسط المدينة",
    governorate: "إربد",
    closedAt: "قبل 4 أيام",
    durationDays: 3.2,
  },
  {
    ref: "REF-2025-04764",
    title: "مقترح تعبيد ممشى لذوي الإعاقة",
    category: "اقتراح",
    district: "حي الجامعة",
    governorate: "الزرقاء",
    closedAt: "قبل أسبوع",
    durationDays: 5.6,
  },
  {
    ref: "REF-2025-04751",
    title: "نزاع إيجار وتسوية بين أطراف",
    category: "قانونية",
    district: "وسط البلد",
    governorate: "السلط",
    closedAt: "قبل 8 أيام",
    durationDays: 6.0,
  },
  {
    ref: "REF-2025-04739",
    title: "تجمّع مياه أمطار يعيق المرور",
    category: "خدمية",
    district: "حي الروضة",
    governorate: "المفرق",
    closedAt: "قبل 10 أيام",
    durationDays: 1.8,
  },
  {
    ref: "REF-2025-04722",
    title: "انقطاع متكرر للكهرباء عن منطقة سكنية",
    category: "خدمية",
    district: "حي الحسين",
    governorate: "الكرك",
    closedAt: "قبل 11 يوماً",
    durationDays: 2.7,
  },
  {
    ref: "REF-2025-04708",
    title: "اقتراح تركيب مطبّات سرعة قرب المدرسة",
    category: "اقتراح",
    district: "حي الشاطئ",
    governorate: "العقبة",
    closedAt: "قبل أسبوعين",
    durationDays: 4.5,
  },
];
