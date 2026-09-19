"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  MapPin,
  Paperclip,
  PencilLine,
  Upload,
  X,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, errorRing } from "@/components/v2/field";
import { branches } from "@/data/branches";
import { cn } from "@/lib/utils";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import {
  DESCRIPTION_MAX_LENGTH,
  GOVERNORATES,
  TITLE_MAX_LENGTH,
  type SubmitFormController,
} from "@/hooks/use-submit-form";
import type { CaseType } from "@/types";

interface StepProps {
  form: SubmitFormController;
}

/** Heading shared by every step so the page reads at one rhythm. */
function StepIntro({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-lg font-extrabold tracking-[-0.015em] text-stone-900 lg:text-xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-prose text-[13px] leading-relaxed text-stone-600">
        {lede}
      </p>
    </div>
  );
}

function Counter({ value, max }: { value: number; max: number }) {
  const nearLimit = value > max * 0.9;
  return (
    <span
      className={cn(
        "text-[11px] tabular-nums",
        nearLimit ? "text-gold-700" : "text-stone-600"
      )}
    >
      {value}/{max}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* 1 — Request details                                                        */
/* -------------------------------------------------------------------------- */

function DetailsStep({ form }: StepProps) {
  const { data, errors, update, markTouched } = form;
  const types = Object.keys(CASE_TYPE_LABELS) as CaseType[];

  return (
    <>
      <StepIntro
        title="ابدأ بتحديد نوع الطلب"
        lede="النوع يحدّد الجهة التي تستلم طلبك، فاختياره الصحيح يوفّر عليك الانتظار."
      />

      <fieldset className="mb-5">
        <legend className="mb-2 font-display text-[13px] font-semibold text-stone-800">
          نوع الطلب
        </legend>
        <div
          role="radiogroup"
          aria-label="نوع الطلب"
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errors.type ? "type-error" : undefined}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {types.map((type) => {
            const selected = data.type === type;
            return (
              <button
                key={type}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  update("type", type);
                  markTouched("type");
                }}
                className={cn(
                  "min-h-[3rem] rounded-xl border-2 px-3 py-2.5 font-display text-[13px] font-bold transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selected
                    ? "border-emerald-700 bg-emerald-50 text-emerald-800 shadow-soft-sm"
                    : "border-stone-200 bg-white text-stone-600 hover:border-emerald-300 hover:bg-emerald-50/40",
                  errors.type && !selected && "border-red-200"
                )}
              >
                {CASE_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
        <p
          id="type-error"
          role={errors.type ? "alert" : undefined}
          className="mt-1.5 flex min-h-[1.125rem] items-start gap-1 text-[11.5px] leading-snug text-red-700"
        >
          {errors.type && (
            <AlertCircle aria-hidden className="mt-[1px] h-3.5 w-3.5 shrink-0" />
          )}
          {errors.type}
        </p>
      </fieldset>

      <Field
        label="عنوان مختصر"
        error={errors.title}
        hint="سطر واحد يوضّح المشكلة — سيظهر هذا العنوان للمنسق أولاً."
        meta={<Counter value={data.title.length} max={TITLE_MAX_LENGTH} />}
        className="mb-4"
      >
        {(props) => (
          <Input
            {...props}
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            onBlur={() => markTouched("title")}
            maxLength={TITLE_MAX_LENGTH}
            placeholder="مثال: تسرب مياه في شارع الأمير محمد"
            className={errorRing(errors.title)}
          />
        )}
      </Field>

      <Field
        label="وصف تفصيلي"
        error={errors.description}
        hint="متى بدأت المشكلة؟ من تأثّر بها؟ هل هناك خطر فعلي؟"
        meta={
          <Counter
            value={data.description.length}
            max={DESCRIPTION_MAX_LENGTH}
          />
        }
      >
        {(props) => (
          <Textarea
            {...props}
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            onBlur={() => markTouched("description")}
            maxLength={DESCRIPTION_MAX_LENGTH}
            rows={5}
            placeholder="اشرح المشكلة بالتفصيل — كل معلومة تختصر زيارة."
            className={errorRing(errors.description)}
          />
        )}
      </Field>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 2 — Location                                                               */
/* -------------------------------------------------------------------------- */

function LocationStep({ form }: StepProps) {
  const { data, errors, update, markTouched } = form;

  return (
    <>
      <StepIntro
        title="حدد موقع المشكلة"
        lede="الموقع الدقيق هو ما يمكّن المنسق من الوصول دون أن يتصل بك مرة أخرى."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="المحافظة" error={errors.governorate}>
          {(props) => (
            <Select
              value={data.governorate}
              onValueChange={(v) => {
                update("governorate", v);
                markTouched("governorate");
              }}
            >
              <SelectTrigger
                id={props.id}
                aria-invalid={props["aria-invalid"]}
                aria-describedby={props["aria-describedby"]}
                className={errorRing(errors.governorate)}
              >
                <SelectValue placeholder="اختر المحافظة" />
              </SelectTrigger>
              <SelectContent>
                {GOVERNORATES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        <Field
          label="الفرع المسؤول"
          error={errors.branchId}
          hint="اختر الأقرب لموقع المشكلة، لا لعنوان سكنك."
        >
          {(props) => (
            <Select
              value={data.branchId}
              onValueChange={(v) => {
                update("branchId", v);
                markTouched("branchId");
              }}
            >
              <SelectTrigger
                id={props.id}
                aria-invalid={props["aria-invalid"]}
                aria-describedby={props["aria-describedby"]}
                className={errorRing(errors.branchId)}
              >
                <SelectValue placeholder="اختر أقرب فرع" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name} — {b.governorate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        <Field label="الحي / المنطقة" optional>
          {(props) => (
            <Input
              {...props}
              value={data.district}
              onChange={(e) => update("district", e.target.value)}
              placeholder="مثال: حي النزهة"
            />
          )}
        </Field>

        <Field
          label="أقرب نقطة دالة"
          optional
          hint="مدرسة، مسجد، أو أي علامة يعرفها السكان."
        >
          {(props) => (
            <Input
              {...props}
              value={data.landmark}
              onChange={(e) => update("landmark", e.target.value)}
              placeholder="مثال: بجانب المدرسة"
            />
          )}
        </Field>
      </div>

      <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-stone-50 p-4 text-[12px] leading-relaxed text-stone-600">
        <MapPin
          aria-hidden
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
        />
        تحديد الموقع على الخريطة مباشرة قادم في الإصدار الكامل. حتى ذلك الحين،
        النقطة الدالة تؤدي الغرض.
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 3 — Citizen                                                                */
/* -------------------------------------------------------------------------- */

function CitizenStep({ form }: StepProps) {
  const { data, errors, update, markTouched } = form;

  return (
    <>
      <StepIntro
        title="بياناتك للتواصل"
        lede="نحتاج اسمك ورقم هاتفك حتى يتابع المنسق ملفك معك. بياناتك مشفّرة ولا تُعرض إلا للمنسق المسؤول عن ملفك."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="الاسم الكامل"
          error={errors.citizenName}
          className="sm:col-span-2"
        >
          {(props) => (
            <Input
              {...props}
              value={data.citizenName}
              onChange={(e) => update("citizenName", e.target.value)}
              onBlur={() => markTouched("citizenName")}
              autoComplete="name"
              placeholder="مثال: محمد أحمد العلي"
              className={errorRing(errors.citizenName)}
            />
          )}
        </Field>

        <Field
          label="رقم الهاتف"
          error={errors.citizenPhone}
          hint="يستخدمه المنسق للتواصل معك عند الحاجة."
        >
          {(props) => (
            <Input
              {...props}
              type="tel"
              inputMode="tel"
              dir="ltr"
              autoComplete="tel"
              value={data.citizenPhone}
              onChange={(e) => update("citizenPhone", e.target.value)}
              onBlur={() => markTouched("citizenPhone")}
              placeholder="07XXXXXXXX"
              className={errorRing(errors.citizenPhone)}
            />
          )}
        </Field>

        <Field
          label="البريد الإلكتروني"
          optional
          error={errors.citizenEmail}
        >
          {(props) => (
            <Input
              {...props}
              type="email"
              dir="ltr"
              autoComplete="email"
              value={data.citizenEmail}
              onChange={(e) => update("citizenEmail", e.target.value)}
              onBlur={() => markTouched("citizenEmail")}
              placeholder="example@email.com"
              className={errorRing(errors.citizenEmail)}
            />
          )}
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 4 — Attachments                                                            */
/* -------------------------------------------------------------------------- */

function AttachmentsStep({ form }: StepProps) {
  const { data, addMockFile, removeFile } = form;

  return (
    <>
      <StepIntro
        title="أرفق ما يوثّق المشكلة"
        lede="صورة واحدة تختصر شرحاً طويلاً، وتُسرّع المعاينة على الأرض. هذه الخطوة اختيارية."
      />

      <button
        type="button"
        onClick={addMockFile}
        className="group w-full rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/60 p-8 text-center transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft-sm transition-shadow duration-200 group-hover:shadow-soft-md">
          <Upload aria-hidden className="h-5 w-5 text-emerald-700" />
        </span>
        <span className="block font-display text-[13px] font-bold text-stone-900">
          اضغط لإضافة ملف
        </span>
        <span className="mt-1 block text-[11.5px] text-stone-600">
          صور، PDF، فيديو · حتى 10 ميجابايت للملف
        </span>
      </button>

      {data.attachments.length === 0 ? (
        <p className="mt-4 text-center text-[12px] text-stone-600">
          لم تُرفق ملفات بعد — يمكنك المتابعة دون مرفقات.
        </p>
      ) : (
        <>
          <p className="mt-5 text-[11.5px] font-display font-semibold text-stone-600">
            {data.attachments.length} ملف مرفق
          </p>
          <ul className="mt-2 space-y-2">
            <AnimatePresence initial={false}>
              {data.attachments.map((file, idx) => (
                <motion.li
                  key={`${file.name}-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Paperclip aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-stone-900">
                        {file.name}
                      </span>
                      <span className="block text-[11px] tabular-nums text-stone-600">
                        {file.size}
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X aria-hidden className="h-4 w-4" />
                    <span className="sr-only">حذف {file.name}</span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 5 — Review                                                                 */
/* -------------------------------------------------------------------------- */

function ReviewStep({ form }: StepProps) {
  const { review, goToStep } = form;

  return (
    <>
      <StepIntro
        title="راجع طلبك قبل الإرسال"
        lede="اضغط «تعديل» بجانب أي بند لتعود إلى خطوته مباشرة. بعد الإرسال لا يمكن تغيير الطلب."
      />

      <dl className="divide-y divide-stone-100">
        {review.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4"
          >
            <dt className="font-display text-[12px] font-semibold text-stone-600 sm:w-28 sm:shrink-0 sm:pt-0.5">
              {row.label}
            </dt>
            <dd
              className={cn(
                "min-w-0 flex-1 text-[13px] text-stone-900",
                row.multiline && "whitespace-pre-wrap leading-relaxed"
              )}
            >
              {row.value}
            </dd>
            <button
              type="button"
              onClick={() => goToStep(row.step)}
              className="inline-flex shrink-0 items-center gap-1 self-start rounded-md px-1.5 py-1 font-display text-[11.5px] font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PencilLine aria-hidden className="h-3.5 w-3.5" />
              تعديل
              <span className="sr-only">{row.label}</span>
            </button>
          </div>
        ))}
      </dl>

      <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-gold-200/60 bg-gold-50/60 p-4 text-[12px] leading-relaxed text-stone-700">
        <AiSparkleIcon
          aria-hidden
          className="mt-0.5 h-4 w-4 shrink-0 text-gold-700"
        />
        بعد الإرسال يحلّل محرك التصنيف طلبك ويوجّهه للجهة المختصة، وتستلم رقماً
        مرجعياً فورياً للمتابعة.
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function SubmitStepBody({ form }: StepProps) {
  switch (form.step) {
    case 1:
      return <DetailsStep form={form} />;
    case 2:
      return <LocationStep form={form} />;
    case 3:
      return <CitizenStep form={form} />;
    case 4:
      return <AttachmentsStep form={form} />;
    case 5:
      return <ReviewStep form={form} />;
    default:
      return null;
  }
}
