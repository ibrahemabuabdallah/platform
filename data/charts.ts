export const weeklyTrend = [
  { day: "السبت", new: 12, resolved: 9 },
  { day: "الأحد", new: 18, resolved: 14 },
  { day: "الاثنين", new: 24, resolved: 19 },
  { day: "الثلاثاء", new: 21, resolved: 22 },
  { day: "الأربعاء", new: 26, resolved: 18 },
  { day: "الخميس", new: 19, resolved: 15 },
  { day: "الجمعة", new: 8, resolved: 11 },
];

export const monthlyTrend = [
  { month: "يناير", cases: 142, resolved: 128 },
  { month: "فبراير", cases: 168, resolved: 151 },
  { month: "مارس", cases: 195, resolved: 174 },
  { month: "أبريل", cases: 187, resolved: 169 },
  { month: "مايو", cases: 212, resolved: 184 },
  { month: "يونيو", cases: 198, resolved: 178 },
  { month: "يوليو", cases: 224, resolved: 201 },
  { month: "أغسطس", cases: 245, resolved: 218 },
  { month: "سبتمبر", cases: 234, resolved: 209 },
  { month: "أكتوبر", cases: 267, resolved: 241 },
  { month: "نوفمبر", cases: 289, resolved: 256 },
  { month: "ديسمبر", cases: 256, resolved: 232 },
];

export const casesByType = [
  { name: "خدمية", value: 542, color: "#047857" },
  { name: "قانونية", value: 318, color: "#2563eb" },
  { name: "سياسية", value: 178, color: "#7c3aed" },
  { name: "اقتراحات", value: 209, color: "#c9a227" },
];

export const branchPerformance = [
  { branch: "عمان الأول", cases: 287, closed: 248, sla: 92 },
  { branch: "عمان الثاني", cases: 234, closed: 198, sla: 88 },
  { branch: "الزرقاء", cases: 196, closed: 175, sla: 90 },
  { branch: "إربد", cases: 178, closed: 162, sla: 94 },
  { branch: "الكرك", cases: 102, closed: 91, sla: 86 },
  { branch: "السلط", cases: 87, closed: 79, sla: 89 },
  { branch: "المفرق", cases: 64, closed: 55, sla: 81 },
  { branch: "العقبة", cases: 49, closed: 42, sla: 84 },
];

export const coordinatorPerformance = [
  { name: "أحمد عبد الرحمن", branch: "عمان الأول", closed: 87, rating: 4.8 },
  { name: "فاطمة الحوراني", branch: "عمان الأول", closed: 64, rating: 4.9 },
  { name: "سارة الشمري", branch: "الزرقاء", closed: 73, rating: 4.7 },
  { name: "علي العمري", branch: "إربد", closed: 58, rating: 4.5 },
  { name: "محمد القضاة", branch: "عمان الثاني", closed: 52, rating: 4.6 },
  { name: "خالد الطراونة", branch: "الكرك", closed: 41, rating: 4.4 },
];

export const heatmapData: { region: string; level: number }[][] = [
  [
    { region: "العاصمة-1", level: 9 },
    { region: "العاصمة-2", level: 8 },
    { region: "العاصمة-3", level: 7 },
    { region: "العاصمة-4", level: 9 },
    { region: "إربد-1", level: 6 },
    { region: "إربد-2", level: 5 },
    { region: "العقبة", level: 3 },
    { region: "معان", level: 2 },
  ],
  [
    { region: "العاصمة-5", level: 8 },
    { region: "العاصمة-6", level: 9 },
    { region: "العاصمة-7", level: 7 },
    { region: "الزرقاء-1", level: 8 },
    { region: "إربد-3", level: 6 },
    { region: "جرش", level: 4 },
    { region: "العقبة-2", level: 2 },
    { region: "الطفيلة", level: 3 },
  ],
  [
    { region: "العاصمة-8", level: 6 },
    { region: "البلقاء", level: 5 },
    { region: "الزرقاء-2", level: 7 },
    { region: "الزرقاء-3", level: 5 },
    { region: "عجلون", level: 3 },
    { region: "المفرق-1", level: 4 },
    { region: "الكرك-1", level: 5 },
    { region: "الكرك-2", level: 4 },
  ],
  [
    { region: "السلط", level: 6 },
    { region: "دير علا", level: 4 },
    { region: "الرصيفة", level: 7 },
    { region: "الأزرق", level: 2 },
    { region: "المفرق-2", level: 3 },
    { region: "الرمثا", level: 5 },
    { region: "المزار", level: 4 },
    { region: "الشوبك", level: 2 },
  ],
];

export const slaCompliance = [
  { period: "السبت", onTrack: 65, atRisk: 18, breached: 7 },
  { period: "الأحد", onTrack: 72, atRisk: 14, breached: 5 },
  { period: "الاثنين", onTrack: 68, atRisk: 22, breached: 8 },
  { period: "الثلاثاء", onTrack: 74, atRisk: 16, breached: 6 },
  { period: "الأربعاء", onTrack: 70, atRisk: 19, breached: 9 },
  { period: "الخميس", onTrack: 78, atRisk: 13, breached: 4 },
  { period: "الجمعة", onTrack: 82, atRisk: 9, breached: 3 },
];

export const operationalRecommendations = [
  {
    id: "rec-1",
    priority: "high",
    title: "تعزيز الكوادر في فرع المفرق",
    description:
      "أداء الفرع 81% فقط في الالتزام بالـSLA، الحاجة لتعيين منسق إضافي على الأقل",
    impact: "تحسين متوقع 8-12% في معدل الإغلاق",
  },
  {
    id: "rec-2",
    priority: "medium",
    title: "تدريب على القضايا القانونية المعقدة",
    description:
      "55% من القضايا القانونية تتجاوز الـSLA، الحاجة لورشات تدريبية للجنة",
    impact: "تقليل وقت الحل بنسبة 25%",
  },
  {
    id: "rec-3",
    priority: "medium",
    title: "أتمتة كشف القضايا المكررة",
    description:
      "47 قضية مكررة هذا الشهر، تحسين خوارزميات التحديد سيوفر وقتاً كبيراً",
    impact: "توفير 12 ساعة عمل أسبوعياً",
  },
  {
    id: "rec-4",
    priority: "low",
    title: "حملة توعية لمواطني الجنوب",
    description: "نسبة استخدام المنصة في محافظات الجنوب أقل بـ 40% من المتوقع",
    impact: "زيادة الاستخدام بـ 30% خلال 3 أشهر",
  },
];
