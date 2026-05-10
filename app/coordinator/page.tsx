"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  CalendarPlus,
  StickyNote,
  RefreshCw,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronLeft,
  Hash,
  ListChecks,
  CalendarClock,
  Star,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { PageHeader } from "@/components/shared/page-header";
import {
  StatusBadge,
  PriorityBadge,
  SLABadge,
  CaseTypeBadge,
} from "@/components/shared/status-badge";
import { coordinators } from "@/data/coordinators";
import { coordinatorTasks, fieldVisits } from "@/data/tasks";
import { cases } from "@/data/cases";
import { branches } from "@/data/branches";
import { STATUS_LABELS } from "@/lib/constants";
import { formatDateTimeAr, cn } from "@/lib/utils";
import type { CaseStatus } from "@/types";

const me = coordinators[0]; // أحمد عبد الرحمن

type ModalType = "call" | "schedule" | "note" | "status" | null;

export default function CoordinatorPage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedCaseRef, setSelectedCaseRef] = useState<string>("");
  const [tasksState, setTasksState] = useState(coordinatorTasks);

  const myCases = cases.filter((c) => c.coordinatorId === me.id);
  const branch = branches.find((b) => b.id === me.branchId);
  const todayVisits = fieldVisits.filter((v) => v.coordinatorId === me.id);
  const nextCase = myCases.find(
    (c) => c.status === "in_progress" || c.status === "field_visit"
  );

  const toggleTask = (id: string) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const openModal = (type: ModalType, caseRef?: string) => {
    setModal(type);
    if (caseRef) setSelectedCaseRef(caseRef);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedCaseRef("");
  };

  const submitAction = (action: string) => {
    closeModal();
    toast.success(action, {
      description: selectedCaseRef ? `للقضية: ${selectedCaseRef}` : undefined,
    });
  };

  return (
    <>
      <PageHeader
        badge="بوابة المنسق الميداني"
        title={`أهلاً، ${me.name}`}
        description={`${me.role} · ${branch?.name}`}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-display font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              {me.rating}
            </div>
            <Avatar className="h-12 w-12 ring-2 ring-emerald-100">
              <AvatarFallback>{me.initials}</AvatarFallback>
            </Avatar>
          </div>
        }
      />

      <div className="container py-6 lg:py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500">قضايا نشطة</p>
                <p className="font-display font-extrabold text-2xl text-stone-900">
                  {me.activeCases}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500">مكتملة هذا الشهر</p>
                <p className="font-display font-extrabold text-2xl text-stone-900">
                  {me.completedCases}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500">مهام اليوم</p>
                <p className="font-display font-extrabold text-2xl text-stone-900">
                  {tasksState.filter((t) => !t.completed).length}/
                  {tasksState.length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500">زيارات مجدولة</p>
                <p className="font-display font-extrabold text-2xl text-stone-900">
                  {todayVisits.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Next case - featured */}
          {nextCase && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden border-emerald-200/60">
                <div className="bg-gradient-to-l from-emerald-700 to-emerald-800 p-5 text-white">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-[11px] text-emerald-200 font-display font-semibold mb-1">
                        القضية التالية للمتابعة
                      </p>
                      <p className="font-mono text-xs text-emerald-200">
                        {nextCase.ref}
                      </p>
                      <h3 className="font-display font-bold text-lg lg:text-xl mt-1.5 leading-snug">
                        {nextCase.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <CaseTypeBadge type={nextCase.type} />
                      <PriorityBadge priority={nextCase.priority} />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-sm text-stone-700 leading-relaxed line-clamp-2">
                    {nextCase.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-stone-50 p-3">
                      <p className="text-[11px] text-stone-500 mb-0.5">
                        الحالة
                      </p>
                      <StatusBadge status={nextCase.status} />
                    </div>
                    <div className="rounded-xl bg-stone-50 p-3">
                      <p className="text-[11px] text-stone-500 mb-0.5">SLA</p>
                      <SLABadge sla={nextCase.slaStatus} />
                    </div>
                    <div className="rounded-xl bg-stone-50 p-3">
                      <p className="text-[11px] text-stone-500 mb-0.5">
                        الموقع
                      </p>
                      <p className="text-xs font-medium text-stone-900 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {nextCase.location.district}
                      </p>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-3">
                      <p className="text-[11px] text-stone-500 mb-0.5">
                        موعد الاستحقاق
                      </p>
                      <p className="text-xs font-medium text-stone-900 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateTimeAr(nextCase.dueAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => openModal("call", nextCase.ref)}
                    >
                      <Phone className="h-4 w-4" />
                      اتصال
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openModal("schedule", nextCase.ref)}
                    >
                      <CalendarPlus className="h-4 w-4" />
                      جدولة زيارة
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openModal("note", nextCase.ref)}
                    >
                      <StickyNote className="h-4 w-4" />
                      ملاحظة
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openModal("status", nextCase.ref)}
                    >
                      <RefreshCw className="h-4 w-4" />
                      تغيير حالة
                    </Button>
                  </div>

                  <Button asChild variant="default" className="w-full">
                    <Link href={`/cases/${nextCase.id}`}>
                      عرض التفاصيل الكاملة
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Today tasks */}
          <Card className="overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-display font-bold text-base text-stone-900">
                مهامي اليوم
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {tasksState.filter((t) => t.completed).length} من{" "}
                {tasksState.length} مكتملة
              </p>
            </div>
            <ul className="divide-y divide-stone-100 max-h-[500px] overflow-y-auto scrollbar-thin">
              {tasksState.map((task) => {
                const Icon = {
                  call: Phone,
                  visit: MapPin,
                  review: ListChecks,
                  followup: RefreshCw,
                  report: StickyNote,
                }[task.type];
                return (
                  <li
                    key={task.id}
                    className={cn(
                      "p-4 hover:bg-stone-50 transition-colors",
                      task.completed && "opacity-60"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.completed ? "إلغاء إكمال المهمة" : "إكمال المهمة"
                        }
                        aria-pressed={task.completed}
                        className="shrink-0 -m-2 p-2 inline-flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        <span
                          className={cn(
                            "h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all",
                            task.completed
                              ? "bg-emerald-700 border-emerald-700 text-white"
                              : "border-stone-300"
                          )}
                        >
                          {task.completed && (
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              strokeWidth={3}
                            />
                          )}
                        </span>
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <Icon className="h-3.5 w-3.5 text-stone-400" />
                          <span
                            className={cn(
                              "text-sm font-medium",
                              task.completed
                                ? "text-stone-400 line-through"
                                : "text-stone-900"
                            )}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <PriorityBadge priority={task.priority} />
                          <span className="text-[11px] text-stone-400">
                            · {formatDateTimeAr(task.dueAt)}
                          </span>
                          {task.caseRef !== "—" && (
                            <span className="text-[11px] text-emerald-700 font-mono">
                              · {task.caseRef}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Active cases */}
          <Card>
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  قضايا قيد المتابعة
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {myCases.length} قضية تحت إشرافك
                </p>
              </div>
            </div>
            <ul className="divide-y divide-stone-100 max-h-[440px] overflow-y-auto scrollbar-thin">
              {myCases.map((c) => (
                <li
                  key={c.id}
                  className="p-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] text-emerald-700">
                        {c.ref}
                      </span>
                      <h4 className="text-sm font-medium text-stone-900 mt-0.5 line-clamp-1">
                        {c.title}
                      </h4>
                    </div>
                    <Button asChild variant="ghost" size="icon" aria-label="عرض القضية">
                      <Link href={`/cases/${c.id}`}>
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <StatusBadge status={c.status} />
                    <PriorityBadge priority={c.priority} />
                    <SLABadge sla={c.slaStatus} />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal("call", c.ref)}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      اتصال
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal("note", c.ref)}
                    >
                      <StickyNote className="h-3.5 w-3.5" />
                      ملاحظة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal("status", c.ref)}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      حالة
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Field visits */}
          <Card>
            <div className="p-5 border-b border-border">
              <h3 className="font-display font-bold text-base text-stone-900">
                زيارات ميدانية مجدولة
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {todayVisits.length} زيارة قادمة
              </p>
            </div>
            <ul className="divide-y divide-stone-100">
              {todayVisits.map((v) => (
                <li key={v.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[11px] text-emerald-700">
                        {v.caseRef}
                      </span>
                      <h4 className="text-sm font-medium text-stone-900 line-clamp-1">
                        {v.caseTitle}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDateTimeAr(v.scheduledAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {v.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={modal === "call"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>اتصال بالمواطن</DialogTitle>
            <DialogDescription>
              سيتم تسجيل المكالمة في سجل القضية
              {selectedCaseRef && ` ${selectedCaseRef}`}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl bg-stone-50 p-5 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-3">
              <Phone className="h-7 w-7" />
            </div>
            <p className="font-mono font-bold text-lg text-stone-900">
              077-1234567
            </p>
            <p className="text-xs text-stone-500 mt-1">المواطن: محمد العلي</p>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => submitAction("تم بدء المكالمة")}
            >
              <Phone className="h-4 w-4" />
              بدء المكالمة
            </Button>
            <Button variant="outline" onClick={closeModal}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === "schedule"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>جدولة زيارة ميدانية</DialogTitle>
            <DialogDescription>
              حدد التاريخ والوقت المناسب للنزول
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">التاريخ والوقت</Label>
              <Input type="datetime-local" />
            </div>
            <div>
              <Label className="mb-2 block">ملاحظات للزيارة</Label>
              <Textarea
                placeholder="مثلاً: التواصل مع رئيس الحي قبل الوصول..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => submitAction("تم جدولة الزيارة")}>
              <CalendarPlus className="h-4 w-4" />
              تأكيد الجدولة
            </Button>
            <Button variant="outline" onClick={closeModal}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === "note"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة ملاحظة للقضية</DialogTitle>
            <DialogDescription>
              ستظهر الملاحظة في الـ Timeline لكل المسؤولين
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label className="mb-2 block">نص الملاحظة</Label>
            <Textarea
              placeholder="اكتب ملاحظتك هنا..."
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => submitAction("تم رفع الملاحظة")}>
              <StickyNote className="h-4 w-4" />
              رفع الملاحظة
            </Button>
            <Button variant="outline" onClick={closeModal}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === "status"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تغيير حالة القضية</DialogTitle>
            <DialogDescription>
              اختر الحالة الجديدة وسبب التغيير
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
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
              <Label className="mb-2 block">سبب التغيير</Label>
              <Textarea
                placeholder="اشرح سبب تغيير الحالة..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => submitAction("تم تحديث الحالة")}>
              <RefreshCw className="h-4 w-4" />
              تأكيد التحديث
            </Button>
            <Button variant="outline" onClick={closeModal}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
