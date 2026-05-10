"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  MapPin,
  User,
  Paperclip,
  ClipboardCheck,
  Copy,
  Search as SearchIcon,
  Upload,
  X,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/page-header";
import { branches } from "@/data/branches";
import { cn, generateRef } from "@/lib/utils";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import type { CaseType } from "@/types";

const steps = [
  { num: 1, title: "بيانات الطلب", icon: FileText },
  { num: 2, title: "الموقع/الفرع", icon: MapPin },
  { num: 3, title: "بيانات المواطن", icon: User },
  { num: 4, title: "المرفقات", icon: Paperclip },
  { num: 5, title: "مراجعة وإرسال", icon: ClipboardCheck },
];

interface FormData {
  type: CaseType | "";
  title: string;
  description: string;
  branchId: string;
  governorate: string;
  district: string;
  landmark: string;
  isAnonymous: boolean;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  attachments: { name: string; size: string }[];
}

const initialData: FormData = {
  type: "",
  title: "",
  description: "",
  branchId: "",
  governorate: "",
  district: "",
  landmark: "",
  isAnonymous: false,
  citizenName: "",
  citizenPhone: "",
  citizenEmail: "",
  attachments: [],
};

const governorates = [
  "العاصمة",
  "إربد",
  "الزرقاء",
  "البلقاء",
  "الكرك",
  "المفرق",
  "العقبة",
  "معان",
  "الطفيلة",
  "جرش",
  "عجلون",
  "مادبا",
];

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canProceed = () => {
    if (step === 1) return data.type && data.title.length > 5 && data.description.length > 15;
    if (step === 2) return data.branchId && data.governorate;
    if (step === 3) return data.isAnonymous || (data.citizenName && data.citizenPhone);
    if (step === 4) return true;
    if (step === 5) return true;
    return false;
  };

  const handleSubmit = () => {
    const ref = generateRef();
    setRefNumber(ref);
    setShowSuccess(true);
    toast.success("تم استلام شكواك بنجاح", {
      description: `الرقم المرجعي: ${ref}`,
    });
  };

  const copyRef = () => {
    navigator.clipboard.writeText(refNumber);
    toast.success("تم نسخ الرقم المرجعي");
  };

  const addMockFile = () => {
    const sizes = ["1.2 MB", "856 KB", "2.4 MB", "640 KB"];
    const names = [
      "صورة_الموقع.jpg",
      "تقرير_المعاينة.pdf",
      "وثيقة_داعمة.pdf",
      "فيديو_توضيحي.mp4",
    ];
    const idx = data.attachments.length % names.length;
    update("attachments", [
      ...data.attachments,
      { name: names[idx], size: sizes[idx] },
    ]);
    toast.success("تم رفع الملف", {
      description: names[idx],
    });
  };

  const removeFile = (idx: number) => {
    update(
      "attachments",
      data.attachments.filter((_, i) => i !== idx)
    );
  };

  return (
    <>
      <PageHeader
        badge="تقديم شكوى أو مقترح"
        title="نموذج التقديم الإلكتروني"
        description="املأ النموذج خطوة بخطوة. يستغرق الأمر دقيقتين فقط، ويمكنك التقديم بشكل مجهول."
      />

      <div className="container py-8 lg:py-12 max-w-4xl">
        {/* Stepper */}
        <Card className="p-4 sm:p-5 lg:p-6 mb-6">
          {/* Mobile: progress bar + active step label */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white font-display font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-stone-900">
                    {steps[step - 1].title}
                  </p>
                  <p className="text-xs text-stone-500">
                    الخطوة {step} من {steps.length}
                  </p>
                </div>
              </div>
              <span className="text-xs font-display font-semibold text-emerald-700">
                {Math.round((step / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-700"
                initial={false}
                animate={{ width: `${(step / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center gap-1.5 mt-3" aria-hidden>
              {steps.map((s) => {
                const isActive = step === s.num;
                const isComplete = step > s.num;
                return (
                  <div
                    key={s.num}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      isComplete && "bg-emerald-700",
                      isActive && "bg-emerald-500",
                      !isActive && !isComplete && "bg-stone-200"
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* Tablet/Desktop: horizontal stepper */}
          <div className="hidden sm:flex items-center justify-between gap-2">
            {steps.map((s, i) => {
              const isActive = step === s.num;
              const isComplete = step > s.num;
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "h-11 w-11 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 transition-all",
                        isComplete &&
                          "bg-emerald-700 text-white border-emerald-700",
                        isActive &&
                          "bg-white text-emerald-700 border-emerald-700 ring-4 ring-emerald-100",
                        !isActive &&
                          !isComplete &&
                          "bg-stone-50 text-stone-400 border-stone-200"
                      )}
                    >
                      {isComplete ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-display font-semibold whitespace-nowrap",
                        isActive ? "text-emerald-700" : "text-stone-500"
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-px w-12 lg:w-16 mt-[-20px]",
                        isComplete ? "bg-emerald-700" : "bg-stone-200"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Form */}
        <Card className="p-6 lg:p-8 min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
                      ابدأ بتحديد نوع الطلب
                    </h2>
                    <p className="text-sm text-stone-500">
                      اختر النوع المناسب لطلبك حتى يتم توجيهه للجهة المختصة.
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block">نوع الطلب</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(CASE_TYPE_LABELS) as CaseType[]).map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => update("type", type)}
                            className={cn(
                              "rounded-xl border-2 p-3 text-sm font-display font-bold transition-all",
                              data.type === type
                                ? "bg-emerald-50 border-emerald-700 text-emerald-700"
                                : "bg-white border-stone-200 text-stone-600 hover:border-emerald-200"
                            )}
                          >
                            {CASE_TYPE_LABELS[type]}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title" className="mb-2 block">
                      عنوان مختصر
                    </Label>
                    <Input
                      id="title"
                      placeholder="مثال: تسرب مياه في شارع الأمير محمد"
                      value={data.title}
                      onChange={(e) => update("title", e.target.value)}
                      maxLength={120}
                    />
                    <p className="text-[11px] text-stone-400 mt-1">
                      {data.title.length}/120
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description" className="mb-2 block">
                      وصف تفصيلي
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="اشرح المشكلة بالتفصيل: متى بدأت؟ كم شخص متأثر؟ هل هناك خطر فعلي؟"
                      rows={5}
                      value={data.description}
                      onChange={(e) => update("description", e.target.value)}
                      maxLength={800}
                    />
                    <p className="text-[11px] text-stone-400 mt-1">
                      {data.description.length}/800
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
                      حدد موقع المشكلة
                    </h2>
                    <p className="text-sm text-stone-500">
                      الموقع الدقيق يساعد المنسق على الوصول للمكان بسرعة.
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block">المحافظة</Label>
                    <Select
                      value={data.governorate}
                      onValueChange={(v) => update("governorate", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {governorates.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">الفرع المسؤول</Label>
                    <Select
                      value={data.branchId}
                      onValueChange={(v) => update("branchId", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر أقرب فرع لموقعك" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name} — {b.governorate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district" className="mb-2 block">
                        الحي / المنطقة
                      </Label>
                      <Input
                        id="district"
                        placeholder="مثال: حي النزهة"
                        value={data.district}
                        onChange={(e) => update("district", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="landmark" className="mb-2 block">
                        أقرب نقطة دالة
                      </Label>
                      <Input
                        id="landmark"
                        placeholder="مثال: بجانب المدرسة"
                        value={data.landmark}
                        onChange={(e) => update("landmark", e.target.value)}
                      />
                    </div>
                  </div>

                  <Card className="p-4 bg-stone-50/60">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-display font-bold text-stone-900 mb-0.5">
                          خريطة الموقع (محاكاة)
                        </p>
                        <p className="text-xs text-stone-500">
                          في الإصدار الكامل، تستطيع تحديد الموقع على الخريطة
                          مباشرة لدقة أعلى.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
                      بياناتك الشخصية (اختياري)
                    </h2>
                    <p className="text-sm text-stone-500">
                      تستطيع التقديم بشكل مجهول. بياناتك آمنة ولن تُعرض إلا
                      للمنسق المسؤول.
                    </p>
                  </div>

                  <Card className="p-4 bg-emerald-50/40 border-emerald-100">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display font-bold text-sm text-stone-900 mb-0.5">
                          تقديم مجهول الهوية
                        </p>
                        <p className="text-xs text-stone-500">
                          لن نطلب أي بيانات شخصية، يكفي رقم مرجعي للتتبع.
                        </p>
                      </div>
                      <Switch
                        checked={data.isAnonymous}
                        onCheckedChange={(v) => update("isAnonymous", v)}
                      />
                    </div>
                  </Card>

                  {!data.isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name" className="mb-2 block">
                          الاسم الكامل
                        </Label>
                        <Input
                          id="name"
                          placeholder="مثال: محمد أحمد العلي"
                          value={data.citizenName}
                          onChange={(e) => update("citizenName", e.target.value)}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="mb-2 block">
                            رقم الهاتف
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="07XXXXXXXX"
                            value={data.citizenPhone}
                            onChange={(e) =>
                              update("citizenPhone", e.target.value)
                            }
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="mb-2 block">
                            البريد الإلكتروني (اختياري)
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            value={data.citizenEmail}
                            onChange={(e) =>
                              update("citizenEmail", e.target.value)
                            }
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
                      أرفق الأدلة (اختياري)
                    </h2>
                    <p className="text-sm text-stone-500">
                      الصور والمستندات تساعد على تسريع المعالجة وتوثيق المشكلة.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addMockFile}
                    className="w-full rounded-2xl border-2 border-dashed border-stone-300 hover:border-emerald-400 bg-stone-50/60 hover:bg-emerald-50/40 p-8 text-center transition-all group"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft-sm mb-3 group-hover:shadow-soft-md transition-all">
                      <Upload className="h-5 w-5 text-emerald-700" />
                    </div>
                    <p className="font-display font-bold text-sm text-stone-900 mb-1">
                      اضغط لإضافة ملف
                    </p>
                    <p className="text-xs text-stone-500">
                      الصور، PDF، فيديو · حتى 10 MB
                    </p>
                  </button>

                  {data.attachments.length > 0 && (
                    <ul className="space-y-2">
                      {data.attachments.map((file, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                              <Paperclip className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-stone-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-[11px] text-stone-400">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="حذف"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
                      راجع طلبك قبل الإرسال
                    </h2>
                    <p className="text-sm text-stone-500">
                      تأكد من البيانات قبل التقديم. لن تستطيع تعديلها بعد ذلك.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <ReviewItem
                      label="نوع الطلب"
                      value={data.type ? CASE_TYPE_LABELS[data.type] : "—"}
                    />
                    <ReviewItem label="العنوان" value={data.title || "—"} />
                    <ReviewItem
                      label="الوصف"
                      value={data.description || "—"}
                      multiline
                    />
                    <ReviewItem
                      label="الموقع"
                      value={`${data.governorate} - ${data.district}${
                        data.landmark ? ` (${data.landmark})` : ""
                      }`}
                    />
                    <ReviewItem
                      label="الفرع"
                      value={
                        branches.find((b) => b.id === data.branchId)?.name ||
                        "—"
                      }
                    />
                    <ReviewItem
                      label="المُقدِّم"
                      value={
                        data.isAnonymous
                          ? "مقدم بشكل مجهول"
                          : `${data.citizenName} · ${data.citizenPhone}`
                      }
                    />
                    <ReviewItem
                      label="المرفقات"
                      value={
                        data.attachments.length > 0
                          ? `${data.attachments.length} ملف`
                          : "لا توجد مرفقات"
                      }
                    />
                  </div>

                  <Card className="p-4 bg-gold-50/60 border-gold-200/60">
                    <div className="flex items-start gap-2.5">
                      <AiSparkleIcon className="h-4 w-4 text-gold-700 shrink-0 mt-0.5" />
                      <p className="text-xs text-stone-700 leading-relaxed">
                        بعد الإرسال، سيتولى محرك التصنيف الذكي تحليل طلبك
                        وتوجيهه للجهة المختصة، وستحصل على رقم مرجعي فوري للتتبع.
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <Button
            variant="outline"
            size="lg"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="flex-1 sm:flex-initial"
          >
            <ArrowRight className="h-4 w-4" />
            <span>السابق</span>
          </Button>
          {step < 5 ? (
            <Button
              size="lg"
              disabled={!canProceed()}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="flex-1 sm:flex-initial"
            >
              <span>التالي</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="gold"
              size="lg"
              onClick={handleSubmit}
              className="flex-1 sm:flex-initial"
            >
              <AiSparkleIcon className="h-4 w-4" />
              <span>إرسال الطلب</span>
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <Check
                  className="h-8 w-8 text-emerald-700"
                  strokeWidth={3}
                />
              </motion.div>
            </div>
            <DialogTitle className="text-center">
              تم استلام طلبك بنجاح
            </DialogTitle>
            <DialogDescription className="text-center">
              احفظ الرقم المرجعي للتتبع في أي وقت
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 p-5 text-center">
            <p className="text-xs text-emerald-200 mb-1">رقمك المرجعي</p>
            <p className="font-display font-extrabold text-2xl text-white tracking-wider number-mono">
              {refNumber}
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row">
            <Button onClick={copyRef} className="w-full sm:flex-1">
              <Copy className="h-4 w-4" />
              نسخ الرقم
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:flex-1"
            >
              <Link href="/track">
                <SearchIcon className="h-4 w-4" />
                تتبع الطلب
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReviewItem({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2 border-b border-stone-100 last:border-0">
      <span className="text-xs font-display font-semibold text-stone-500 sm:w-32 shrink-0">
        {label}
      </span>
      <span
        className={cn(
          "text-sm text-stone-900 flex-1",
          multiline && "whitespace-pre-wrap leading-relaxed"
        )}
      >
        {value}
      </span>
    </div>
  );
}
