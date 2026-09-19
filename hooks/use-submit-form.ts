"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { branches } from "@/data/branches";
import { generateRef } from "@/lib/utils";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import type { CaseType } from "@/types";

/* -------------------------------------------------------------------------- */
/* Shape                                                                      */
/* -------------------------------------------------------------------------- */

export type SubmitStepKey =
  | "details"
  | "location"
  | "citizen"
  | "attachments"
  | "review";

export interface SubmitStep {
  num: number;
  key: SubmitStepKey;
  title: string;
}

/** Step titles and order are product copy — icons belong to each presentation. */
export const SUBMIT_STEPS: readonly SubmitStep[] = [
  { num: 1, key: "details", title: "بيانات الطلب" },
  { num: 2, key: "location", title: "الموقع/الفرع" },
  { num: 3, key: "citizen", title: "بيانات المواطن" },
  { num: 4, key: "attachments", title: "المرفقات" },
  { num: 5, key: "review", title: "مراجعة وإرسال" },
] as const;

export const SUBMIT_TOTAL_STEPS = SUBMIT_STEPS.length;

export const TITLE_MAX_LENGTH = 120;
export const DESCRIPTION_MAX_LENGTH = 800;
export const TITLE_MIN_LENGTH = 6;
export const DESCRIPTION_MIN_LENGTH = 16;

export const GOVERNORATES = [
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
] as const;

export interface SubmitAttachment {
  name: string;
  size: string;
}

export interface SubmitFormData {
  type: CaseType | "";
  title: string;
  description: string;
  branchId: string;
  governorate: string;
  district: string;
  landmark: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  attachments: SubmitAttachment[];
}

export const initialSubmitData: SubmitFormData = {
  type: "",
  title: "",
  description: "",
  branchId: "",
  governorate: "",
  district: "",
  landmark: "",
  citizenName: "",
  citizenPhone: "",
  citizenEmail: "",
  attachments: [],
};

/** Fields that can carry an inline validation message. */
export type SubmitFieldName =
  | "type"
  | "title"
  | "description"
  | "governorate"
  | "branchId"
  | "citizenName"
  | "citizenPhone"
  | "citizenEmail";

export type SubmitFieldErrors = Partial<Record<SubmitFieldName, string>>;

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

const JORDAN_MOBILE = /^(?:\+9627|009627|07)\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Field-level messages. Every message names the problem and the way out —
 * consumed by presentations that show inline errors; the step gate below
 * stays the single source of truth for "can this step advance".
 */
export function validateSubmitFields(
  data: SubmitFormData
): SubmitFieldErrors {
  const errors: SubmitFieldErrors = {};

  if (!data.type) {
    errors.type = "اختر نوع الطلب حتى نوجّهه للجهة المختصة.";
  }

  const title = data.title.trim();
  if (!title) {
    errors.title = "العنوان مطلوب.";
  } else if (title.length < TITLE_MIN_LENGTH) {
    errors.title = `العنوان قصير — اكتب ${TITLE_MIN_LENGTH} أحرف على الأقل.`;
  }

  const description = data.description.trim();
  if (!description) {
    errors.description = "الوصف مطلوب.";
  } else if (description.length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `الوصف قصير — اشرح المشكلة في ${DESCRIPTION_MIN_LENGTH} حرفاً على الأقل.`;
  }

  if (!data.governorate) {
    errors.governorate = "اختر المحافظة.";
  }

  if (!data.branchId) {
    errors.branchId = "اختر الفرع المسؤول عن موقعك.";
  }

  if (!data.citizenName.trim()) {
    errors.citizenName = "الاسم مطلوب.";
  }

  const phone = data.citizenPhone.replace(/[\s-]/g, "");
  if (!phone) {
    errors.citizenPhone = "رقم الهاتف مطلوب للتواصل معك.";
  } else if (!JORDAN_MOBILE.test(phone)) {
    errors.citizenPhone = "الصيغة المتوقعة 07 يتبعها ثمانية أرقام.";
  }

  const email = data.citizenEmail.trim();
  if (email && !EMAIL.test(email)) {
    errors.citizenEmail = "تحقق من صيغة البريد الإلكتروني.";
  }

  return errors;
}

/** Which fields each step is responsible for — drives per-step error display. */
export const SUBMIT_STEP_FIELDS: Record<number, SubmitFieldName[]> = {
  1: ["type", "title", "description"],
  2: ["governorate", "branchId"],
  3: ["citizenName", "citizenPhone", "citizenEmail"],
  4: [],
  5: [],
};

/**
 * The advance gate, preserved exactly as the original form enforced it so both
 * presentations agree on when a step is done.
 */
export function isSubmitStepValid(
  step: number,
  data: SubmitFormData
): boolean {
  switch (step) {
    case 1:
      return Boolean(
        data.type &&
          data.title.trim().length >= TITLE_MIN_LENGTH &&
          data.description.trim().length >= DESCRIPTION_MIN_LENGTH
      );
    case 2:
      return Boolean(data.branchId && data.governorate);
    case 3:
      return Boolean(data.citizenName.trim() && data.citizenPhone.trim());
    case 4:
    case 5:
      return true;
    default:
      return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Review summary                                                             */
/* -------------------------------------------------------------------------- */

export interface SubmitReviewRow {
  label: string;
  value: string;
  multiline?: boolean;
  /** Step that owns this value, so a review row can link back to it. */
  step: number;
}

export function buildSubmitReview(
  data: SubmitFormData
): SubmitReviewRow[] {
  const branchName =
    branches.find((b) => b.id === data.branchId)?.name || "—";

  const location = [data.governorate, data.district]
    .filter(Boolean)
    .join(" - ");

  return [
    {
      label: "نوع الطلب",
      value: data.type ? CASE_TYPE_LABELS[data.type] : "—",
      step: 1,
    },
    { label: "العنوان", value: data.title.trim() || "—", step: 1 },
    {
      label: "الوصف",
      value: data.description.trim() || "—",
      multiline: true,
      step: 1,
    },
    {
      label: "الموقع",
      value:
        (location || "—") +
        (data.landmark ? ` (${data.landmark})` : ""),
      step: 2,
    },
    { label: "الفرع", value: branchName, step: 2 },
    {
      label: "المُقدِّم",
      value:
        [data.citizenName.trim(), data.citizenPhone.trim()]
          .filter(Boolean)
          .join(" · ") || "—",
      step: 3,
    },
    {
      label: "المرفقات",
      value:
        data.attachments.length > 0
          ? `${data.attachments.length} ملف`
          : "لا توجد مرفقات",
      step: 4,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* Mock uploads                                                               */
/* -------------------------------------------------------------------------- */

const MOCK_FILES: SubmitAttachment[] = [
  { name: "صورة_الموقع.jpg", size: "1.2 MB" },
  { name: "تقرير_المعاينة.pdf", size: "856 KB" },
  { name: "وثيقة_داعمة.pdf", size: "2.4 MB" },
  { name: "فيديو_توضيحي.mp4", size: "640 KB" },
];

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Whether anything worth restoring has been entered. A pristine form is never
 * written to storage and never announced as a restored draft — otherwise the
 * citizen is told their work was recovered when there was none.
 */
export function hasDraftContent(data: SubmitFormData): boolean {
  return Boolean(
    data.type ||
      data.title.trim() ||
      data.description.trim() ||
      data.branchId ||
      data.governorate ||
      data.district.trim() ||
      data.landmark.trim() ||
      data.citizenName.trim() ||
      data.citizenPhone.trim() ||
      data.citizenEmail.trim() ||
      data.attachments.length > 0
  );
}

export interface UseSubmitFormOptions {
  /**
   * When set, the in-progress form is mirrored to localStorage under this key
   * and restored on mount. Omit to keep the form purely in memory.
   */
  persistKey?: string;
}

export function useSubmitForm(options: UseSubmitFormOptions = {}) {
  const { persistKey } = options;

  const [step, setStep] = useState(1);
  const [data, setData] = useState<SubmitFormData>(initialSubmitData);
  const [touched, setTouched] = useState<Set<SubmitFieldName>>(
    () => new Set()
  );
  const [submittedSteps, setSubmittedSteps] = useState<Set<number>>(
    () => new Set()
  );
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [draftRestored, setDraftRestored] = useState(false);

  /* -- draft persistence ------------------------------------------------- */

  // Restore after mount only, so server and client render the same first pass.
  const hasRestored = useRef(false);
  useEffect(() => {
    if (!persistKey || hasRestored.current) return;
    hasRestored.current = true;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        data?: Partial<SubmitFormData>;
        step?: number;
      };
      if (!parsed?.data) return;
      const restored = { ...initialSubmitData, ...parsed.data };
      if (!hasDraftContent(restored)) return;

      setData(restored);
      const restoredStep = Math.min(
        Math.max(parsed.step ?? 1, 1),
        SUBMIT_TOTAL_STEPS
      );
      setStep(restoredStep);
      setMaxVisitedStep(restoredStep);
      setDraftRestored(true);
    } catch {
      // A malformed or unreadable draft is not worth surfacing to the citizen.
    }
  }, [persistKey]);

  useEffect(() => {
    if (!persistKey || !hasRestored.current) return;
    try {
      if (hasDraftContent(data)) {
        window.localStorage.setItem(
          persistKey,
          JSON.stringify({ data, step })
        );
      } else {
        // Nothing entered yet, or everything cleared — leave no empty draft.
        window.localStorage.removeItem(persistKey);
      }
    } catch {
      // Private mode or a full quota — the form still works in memory.
    }
  }, [persistKey, data, step]);

  const clearDraft = useCallback(() => {
    setDraftRestored(false);
    if (!persistKey) return;
    try {
      window.localStorage.removeItem(persistKey);
    } catch {
      // Nothing to recover from.
    }
  }, [persistKey]);

  /* -- field updates ----------------------------------------------------- */

  const update = useCallback(
    <K extends keyof SubmitFormData>(key: K, value: SubmitFormData[K]) => {
      setData((d) => ({ ...d, [key]: value }));
    },
    []
  );

  const markTouched = useCallback((field: SubmitFieldName) => {
    setTouched((prev) => {
      if (prev.has(field)) return prev;
      const next = new Set(prev);
      next.add(field);
      return next;
    });
  }, []);

  /* -- derived state ----------------------------------------------------- */

  const allErrors = useMemo(() => validateSubmitFields(data), [data]);

  /**
   * An error surfaces once its field has been touched or its step has been
   * submitted — never while the citizen is still typing their first answer.
   */
  const visibleErrors = useMemo(() => {
    const visible: SubmitFieldErrors = {};
    for (const [field, message] of Object.entries(allErrors) as [
      SubmitFieldName,
      string
    ][]) {
      const ownerStep = Number(
        Object.keys(SUBMIT_STEP_FIELDS).find((s) =>
          SUBMIT_STEP_FIELDS[Number(s)].includes(field)
        )
      );
      if (touched.has(field) || submittedSteps.has(ownerStep)) {
        visible[field] = message;
      }
    }
    return visible;
  }, [allErrors, touched, submittedSteps]);

  const canProceed = useMemo(
    () => isSubmitStepValid(step, data),
    [step, data]
  );

  const stepValidity = useMemo(
    () =>
      SUBMIT_STEPS.reduce<Record<number, boolean>>((acc, s) => {
        acc[s.num] = isSubmitStepValid(s.num, data);
        return acc;
      }, {}),
    [data]
  );

  const progress = useMemo(
    () => Math.round((step / SUBMIT_TOTAL_STEPS) * 100),
    [step]
  );

  const review = useMemo(() => buildSubmitReview(data), [data]);

  const currentStep = SUBMIT_STEPS[step - 1];

  /* -- navigation -------------------------------------------------------- */

  const goNext = useCallback(() => {
    setSubmittedSteps((prev) => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });
    if (!isSubmitStepValid(step, data)) return;
    setStep((s) => {
      const target = Math.min(SUBMIT_TOTAL_STEPS, s + 1);
      setMaxVisitedStep((m) => Math.max(m, target));
      return target;
    });
  }, [step, data]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  /** Jumping is allowed backwards, or forwards only into already-seen steps. */
  const goToStep = useCallback(
    (target: number) => {
      const clamped = Math.min(Math.max(target, 1), SUBMIT_TOTAL_STEPS);
      if (clamped > maxVisitedStep) return;
      setStep(clamped);
    },
    [maxVisitedStep]
  );

  /* -- attachments ------------------------------------------------------- */

  // Kept out of the state updater: React may invoke updaters twice in dev.
  const addMockFile = useCallback(() => {
    const file = MOCK_FILES[data.attachments.length % MOCK_FILES.length];
    setData((d) => ({ ...d, attachments: [...d.attachments, file] }));
    toast.success("تم رفع الملف", { description: file.name });
  }, [data.attachments.length]);

  const removeFile = useCallback((idx: number) => {
    setData((d) => ({
      ...d,
      attachments: d.attachments.filter((_, i) => i !== idx),
    }));
  }, []);

  /* -- submission -------------------------------------------------------- */

  const handleSubmit = useCallback(() => {
    const ref = generateRef();
    setRefNumber(ref);
    setShowSuccess(true);
    clearDraft();
    toast.success("تم استلام شكواك بنجاح", {
      description: `الرقم المرجعي: ${ref}`,
    });
  }, [clearDraft]);

  const copyRef = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(refNumber);
      toast.success("تم نسخ الرقم المرجعي");
    } catch {
      toast.error("تعذّر النسخ", {
        description: "انسخ الرقم يدوياً من الشاشة.",
      });
    }
  }, [refNumber]);

  const reset = useCallback(() => {
    setData(initialSubmitData);
    setStep(1);
    setMaxVisitedStep(1);
    setTouched(new Set());
    setSubmittedSteps(new Set());
    setRefNumber("");
    setShowSuccess(false);
    clearDraft();
  }, [clearDraft]);

  return {
    // state
    step,
    currentStep,
    data,
    showSuccess,
    refNumber,
    maxVisitedStep,
    draftRestored,
    // derived
    canProceed,
    /** True once the citizen has pressed "next" on the step they are on. */
    attemptedCurrentStep: submittedSteps.has(step),
    stepValidity,
    errors: visibleErrors,
    allErrors,
    progress,
    review,
    isLastStep: step === SUBMIT_TOTAL_STEPS,
    isFirstStep: step === 1,
    // actions
    setStep,
    update,
    markTouched,
    goNext,
    goBack,
    goToStep,
    addMockFile,
    removeFile,
    handleSubmit,
    copyRef,
    setShowSuccess,
    reset,
    clearDraft,
  };
}

export type SubmitFormController = ReturnType<typeof useSubmitForm>;
