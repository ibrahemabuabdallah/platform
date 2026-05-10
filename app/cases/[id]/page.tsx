"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Hash,
  Building2,
  User,
  Calendar,
  Clock,
  Copy,
  Paperclip,
  FileText,
  ImageIcon,
  RefreshCw,
  Send,
  TrendingUp,
  GitMerge,
  XCircle,
  StickyNote,
  Phone,
  Mail,
  MapPin,
  ShieldAlert,
  AlertCircle,
  Tag,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  StatusBadge,
  PriorityBadge,
  SLABadge,
  CaseTypeBadge,
} from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { getCaseById, cases } from "@/data/cases";
import { branches } from "@/data/branches";
import { coordinators } from "@/data/coordinators";
import { committees } from "@/data/committees";
import { citizens } from "@/data/citizens";
import { formatDateTimeAr, cn } from "@/lib/utils";
import {
  CASE_TYPE_LABELS,
  STATUS_LABELS,
  PRIORITY_LABELS,
} from "@/lib/constants";
import type { CaseStatus, Case } from "@/types";

type ActionType =
  | "status"
  | "transfer"
  | "escalate"
  | "merge"
  | "close"
  | "note"
  | null;

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [action, setAction] = useState<ActionType>(null);

  useEffect(() => {
    const found = getCaseById(caseId);
    if (!found) {
      setNotFound(true);
    } else {
      setCaseData(found);
    }
  }, [caseId]);

  if (notFound) {
    return (
      <div className="container py-16 lg:py-24">
        <Card className="max-w-md mx-auto p-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="font-display font-extrabold text-lg text-stone-900 mb-2">
            القضية غير موجودة
          </h2>
          <p className="text-sm text-stone-500 mb-5">
            لم نتمكن من العثور على قضية بهذا الرقم. ربما تم حذفها أو أن الرقم
            غير صحيح.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/cases">العودة للقائمة</Link>
            </Button>
            <Button asChild>
              <Link href="/track">تتبع طلب</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!caseData) {
    return (
      <>
        <div className="border-b border-border bg-white">
          <div className="container py-4 lg:py-5">
            <Skeleton className="h-3 w-32 mb-3" />
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </div>
        <div className="container py-6 lg:py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <Skeleton className="h-40" />
              <Skeleton className="h-56" />
              <Skeleton className="h-72" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </>
    );
  }

  const branch = branches.find((b) => b.id === caseData.branchId);
  const coordinator = coordinators.find(
    (c) => c.id === caseData.coordinatorId
  );
  const committee = committees.find((c) => c.id === caseData.committeeId);
  const citizen = citizens.find((c) => c.id === caseData.citizenId);
  const ai = caseData.aiClassification;
  const duplicateOf = caseData.duplicateOfRef
    ? cases.find((c) => c.ref === caseData.duplicateOfRef)
    : null;

  const submitAction = (type: ActionType, message: string) => {
    setAction(null);
    toast.success(message, {
      description: `القضية: ${caseData.ref}`,
    });
  };

  return (
    <>
      <div className="border-b border-border bg-white">
        <div className="container py-4 lg:py-5">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <Link href="/cases" className="hover:text-emerald-700">
              القضايا
            </Link>
            <span>/</span>
            <span className="font-mono text-emerald-700">{caseData.ref}</span>
          </div>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CaseTypeBadge type={caseData.type} />
                <PriorityBadge priority={caseData.priority} />
                <StatusBadge status={caseData.status} />
                <SLABadge sla={caseData.slaStatus} />
              </div>
              <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight">
                {caseData.title}
              </h1>
              <p className="font-mono text-xs text-stone-500 mt-1">
                {caseData.ref}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/cases">
                <ArrowRight className="h-4 w-4" />
                العودة للقائمة
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description */}
            <Card className="p-5 lg:p-6">
              <h3 className="font-display font-bold text-base text-stone-900 mb-3">
                وصف القضية
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {caseData.description}
              </p>
              {caseData.tags.length > 0 && (
                <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                  <Tag className="h-3.5 w-3.5 text-stone-400" />
                  {caseData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] text-stone-700 font-display"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            {/* Citizen */}
            <Card className="p-5 lg:p-6">
              <h3 className="font-display font-bold text-base text-stone-900 mb-4">
                بيانات المُقدِّم
              </h3>
              {citizen?.isAnonymous ? (
                <div className="rounded-xl bg-emerald-50/40 border border-emerald-100 p-4 flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-stone-900">
                      تقديم مجهول الهوية
                    </p>
                    <p className="text-xs text-stone-500">
                      {citizen.governorate} · {citizen.district}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  <InfoRow icon={User} label="الاسم" value={citizen?.name} />
                  <InfoRow
                    icon={Phone}
                    label="الهاتف"
                    value={citizen?.phone}
                    dir="ltr"
                  />
                  {citizen?.email && (
                    <InfoRow
                      icon={Mail}
                      label="البريد"
                      value={citizen.email}
                      dir="ltr"
                    />
                  )}
                  <InfoRow
                    icon={MapPin}
                    label="العنوان"
                    value={`${citizen?.governorate} - ${citizen?.district}`}
                  />
                </div>
              )}
            </Card>

            {/* AI Classification */}
            <Card className="p-5 lg:p-6 bg-gradient-to-br from-emerald-50/40 to-gold-50/40 border-emerald-100">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-soft-sm">
                  <AiSparkleIcon className="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    التصنيف الذكي
                  </h3>
                  <p className="text-xs text-stone-500">
                    تحليل آلي للنص والمحتوى
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <ClassRow
                  label="نوع القضية المقترح"
                  value={CASE_TYPE_LABELS[ai.suggestedType]}
                />
                <ClassRow
                  label="الأولوية المقترحة"
                  value={PRIORITY_LABELS[ai.suggestedPriority]}
                />
                <ClassRow
                  label="الفرع المقترح"
                  value={
                    branches.find((b) => b.id === ai.suggestedBranchId)?.name ||
                    "—"
                  }
                />
                <div className="rounded-xl bg-white p-3">
                  <p className="text-[11px] text-stone-500 mb-1">
                    الكلمات المفتاحية
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ai.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-md bg-emerald-100 text-emerald-700 px-1.5 py-0.5 text-[10px] font-display"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display font-bold text-stone-700">
                    نسبة الثقة في التصنيف
                  </span>
                  <span className="text-lg font-display font-extrabold text-emerald-700">
                    {ai.confidence}%
                  </span>
                </div>
                <Progress value={ai.confidence} />
              </div>
            </Card>

            {/* Duplicate Detection */}
            {(caseData.isDuplicate || ai.duplicateRisk > 30) && (
              <Card className="p-5 border-amber-200 bg-amber-50/30">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                    <Copy className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <h3 className="font-display font-bold text-base text-stone-900">
                        احتمال تكرار قضية
                      </h3>
                      <span className="text-base font-display font-extrabold text-amber-700">
                        {ai.duplicateRisk}% تشابه
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 mb-3">
                      تم اكتشاف تشابه مع قضية أخرى — يُنصح بمراجعتها قبل أي
                      إجراء.
                    </p>
                    {duplicateOf && (
                      <Link
                        href={`/cases/${duplicateOf.id}`}
                        className="block rounded-xl bg-white border border-stone-200 p-3 hover:border-amber-300 transition-colors"
                      >
                        <p className="font-mono text-[11px] text-amber-700 mb-0.5">
                          {duplicateOf.ref}
                        </p>
                        <p className="text-sm font-medium text-stone-900 line-clamp-1">
                          {duplicateOf.title}
                        </p>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setAction("merge")}
                    >
                      <GitMerge className="h-4 w-4" />
                      دمج مع القضية الأصلية
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Attachments */}
            {caseData.attachments.length > 0 && (
              <Card className="p-5 lg:p-6">
                <h3 className="font-display font-bold text-base text-stone-900 mb-4">
                  المرفقات ({caseData.attachments.length})
                </h3>
                <ul className="space-y-2">
                  {caseData.attachments.map((file) => {
                    const Icon =
                      file.type === "image"
                        ? ImageIcon
                        : file.type === "pdf"
                        ? FileText
                        : Paperclip;
                    return (
                      <li
                        key={file.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 p-3 hover:bg-stone-50 cursor-pointer transition-colors"
                        onClick={() =>
                          toast.info("جاري فتح الملف...", {
                            description: file.name,
                          })
                        }
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-stone-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-[11px] text-stone-400">
                              {file.size} ·{" "}
                              {formatDateTimeAr(file.uploadedAt)}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            )}

            {/* Timeline */}
            <Card className="p-5 lg:p-6">
              <h3 className="font-display font-bold text-base text-stone-900 mb-5">
                الجدول الزمني الكامل
              </h3>
              <Timeline events={caseData.timeline} />
            </Card>
          </div>

          {/* Side column */}
          <div className="space-y-4">
            {/* Actions */}
            <Card className="p-5">
              <h3 className="font-display font-bold text-sm text-stone-900 mb-3">
                إجراءات
              </h3>
              <div className="space-y-2">
                <Button
                  variant="default"
                  className="w-full justify-start"
                  onClick={() => setAction("status")}
                >
                  <RefreshCw className="h-4 w-4" />
                  تحديث الحالة
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAction("transfer")}
                >
                  <Send className="h-4 w-4" />
                  تحويل للجنة
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAction("escalate")}
                >
                  <TrendingUp className="h-4 w-4" />
                  تصعيد
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAction("merge")}
                >
                  <GitMerge className="h-4 w-4" />
                  دمج
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAction("note")}
                >
                  <StickyNote className="h-4 w-4" />
                  إضافة ملاحظة
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => setAction("close")}
                >
                  <XCircle className="h-4 w-4" />
                  إغلاق القضية
                </Button>
              </div>
            </Card>

            {/* Branch & Coordinator */}
            <Card className="p-5">
              <h3 className="font-display font-bold text-sm text-stone-900 mb-3">
                المسؤولية
              </h3>
              <div className="space-y-3">
                <InfoRow
                  icon={Building2}
                  label="الفرع"
                  value={branch?.name}
                />
                <InfoRow icon={User} label="المنسق" value={coordinator?.name} />
                {committee && (
                  <InfoRow
                    icon={Building2}
                    label="اللجنة"
                    value={committee.name}
                  />
                )}
                {coordinator && (
                  <Button asChild variant="outline" size="sm" className="w-full mt-2">
                    <Link href="/coordinator">
                      ملف المنسق
                    </Link>
                  </Button>
                )}
              </div>
            </Card>

            {/* Dates */}
            <Card className="p-5">
              <h3 className="font-display font-bold text-sm text-stone-900 mb-3">
                التواريخ
              </h3>
              <div className="space-y-3">
                <InfoRow
                  icon={Calendar}
                  label="تاريخ التقديم"
                  value={formatDateTimeAr(caseData.createdAt)}
                />
                <InfoRow
                  icon={Clock}
                  label="آخر تحديث"
                  value={formatDateTimeAr(caseData.updatedAt)}
                />
                <InfoRow
                  icon={AlertCircle}
                  label="موعد الاستحقاق"
                  value={formatDateTimeAr(caseData.dueAt)}
                />
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-display font-bold text-sm text-stone-900 mb-3">
                الموقع
              </h3>
              <div className="space-y-3">
                <InfoRow
                  icon={MapPin}
                  label="المحافظة"
                  value={caseData.location.governorate}
                />
                <InfoRow
                  icon={Hash}
                  label="المنطقة"
                  value={caseData.location.district}
                />
                {caseData.location.landmark && (
                  <InfoRow
                    icon={MapPin}
                    label="نقطة دالة"
                    value={caseData.location.landmark}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="lg:hidden sticky bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-border shadow-soft-lg">
        <div className="container py-2.5 flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => setAction("status")}
          >
            <RefreshCw className="h-4 w-4" />
            تحديث الحالة
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setAction("note")}
          >
            <StickyNote className="h-4 w-4" />
            ملاحظة
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="تصعيد"
            onClick={() => setAction("escalate")}
          >
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status modal */}
      <Dialog
        open={action === "status"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديث حالة القضية</DialogTitle>
            <DialogDescription>
              اختر الحالة الجديدة وأضف سبب التحديث
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">الحالة الحالية</Label>
              <StatusBadge status={caseData.status} />
            </div>
            <div>
              <Label className="mb-2 block">الحالة الجديدة</Label>
              <Select defaultValue="in_progress">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABELS) as CaseStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">سبب التحديث</Label>
              <Textarea rows={3} placeholder="اشرح سبب تغيير الحالة..." />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => submitAction("status", "تم تحديث الحالة")}>
              <RefreshCw className="h-4 w-4" />
              تأكيد التحديث
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer */}
      <Dialog
        open={action === "transfer"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحويل القضية للجنة</DialogTitle>
            <DialogDescription>
              اختر اللجنة المختصة بمتابعة هذه القضية
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">اللجنة المستهدفة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللجنة" />
                </SelectTrigger>
                <SelectContent>
                  {committees.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">سبب التحويل</Label>
              <Textarea rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => submitAction("transfer", "تم تحويل القضية")}
            >
              <Send className="h-4 w-4" />
              تأكيد التحويل
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalate */}
      <Dialog
        open={action === "escalate"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تصعيد القضية</DialogTitle>
            <DialogDescription>
              التصعيد سيرفع القضية إلى المستوى الأعلى مع إشعار جميع المسؤولين
            </DialogDescription>
          </DialogHeader>
          <Card className="p-3 bg-red-50 border-red-200 mb-2">
            <p className="text-xs text-red-700 leading-relaxed">
              التصعيد إجراء لا يُتخذ إلا في حالات معينة كتعطل المعالجة أو تجاوز
              SLA الحرج.
            </p>
          </Card>
          <div>
            <Label className="mb-2 block">سبب التصعيد</Label>
            <Textarea rows={4} placeholder="اشرح بالتفصيل سبب التصعيد..." />
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => submitAction("escalate", "تم تصعيد القضية")}
            >
              <TrendingUp className="h-4 w-4" />
              تأكيد التصعيد
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge */}
      <Dialog
        open={action === "merge"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>دمج قضايا مكررة</DialogTitle>
            <DialogDescription>
              ستُدمج هذه القضية مع القضية الأصلية
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label className="mb-2 block">الرقم المرجعي للقضية الأصلية</Label>
            <Input
              placeholder="مثال: REF-2026-00482"
              defaultValue={caseData.duplicateOfRef || ""}
              dir="ltr"
              className="font-mono"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => submitAction("merge", "تم دمج القضايا")}>
              <GitMerge className="h-4 w-4" />
              تأكيد الدمج
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close */}
      <Dialog
        open={action === "close"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إغلاق القضية</DialogTitle>
            <DialogDescription>
              تأكد من حل المشكلة قبل الإغلاق — الإجراء غير قابل للتراجع تلقائياً.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">نتيجة المعالجة</Label>
              <Select defaultValue="resolved">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resolved">تم الحل بنجاح</SelectItem>
                  <SelectItem value="partial">حل جزئي</SelectItem>
                  <SelectItem value="rejected">رفض الشكوى</SelectItem>
                  <SelectItem value="duplicate">قضية مكررة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">ملخص الإغلاق</Label>
              <Textarea rows={4} placeholder="ملخص ما تم تنفيذه..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => submitAction("close", "تم إغلاق القضية")}
            >
              <XCircle className="h-4 w-4" />
              تأكيد الإغلاق
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Note */}
      <Dialog
        open={action === "note"}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة ملاحظة</DialogTitle>
            <DialogDescription>
              ستظهر الملاحظة في سجل القضية
            </DialogDescription>
          </DialogHeader>
          <Textarea rows={5} placeholder="اكتب ملاحظتك..." />
          <DialogFooter>
            <Button onClick={() => submitAction("note", "تم رفع الملاحظة")}>
              <StickyNote className="h-4 w-4" />
              إضافة الملاحظة
            </Button>
            <Button variant="outline" onClick={() => setAction(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  dir,
}: {
  icon: typeof Hash;
  label: string;
  value?: string;
  dir?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-stone-500">{label}</p>
        <p
          className="text-sm font-medium text-stone-900 mt-0.5"
          dir={dir}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function ClassRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-white p-3", className)}>
      <p className="text-[11px] text-stone-500 mb-1">{label}</p>
      <p className="text-sm font-display font-bold text-stone-900">{value}</p>
    </div>
  );
}
