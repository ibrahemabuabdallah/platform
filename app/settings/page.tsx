"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Clock,
  Shield,
  History,
  Plus,
  Edit,
  Phone,
  Check,
  X,
  Eye,
  Pen,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { committees } from "@/data/committees";
import { auditLog, roles } from "@/data/settings";
import { formatDateTimeAr } from "@/lib/utils";
import { useDashboardVariant } from "@/lib/dashboard-experience";
import { useLandingVariant } from "@/lib/landing-experience";

export default function SettingsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const { variant, setVariant, hydrated } = useDashboardVariant();
  const isStudio = variant === "studio";
  const {
    variant: landingVariant,
    setVariant: setLandingVariant,
    hydrated: landingHydrated,
  } = useLandingVariant();
  const isExperience = landingVariant === "experience";

  return (
    <>
      <PageHeader
        badge="الإعدادات والإدارة"
        title="إعدادات المنصة"
        description="إدارة الفروع، اللجان، الصلاحيات، اتفاقيات مستوى الخدمة، وسجلات التدقيق."
      />

      <div className="container py-6 lg:py-8">
        <Tabs defaultValue="branches">
          <div className="mb-6 -mx-4 sm:mx-0 overflow-x-auto scrollbar-thin">
            <TabsList className="inline-flex w-max min-w-full sm:flex-wrap sm:h-auto px-4 sm:px-1">
              <TabsTrigger value="branches">
                <Building2 className="h-4 w-4 me-1.5" />
                الفروع
              </TabsTrigger>
              <TabsTrigger value="committees">
                <Users className="h-4 w-4 me-1.5" />
                اللجان
              </TabsTrigger>
              <TabsTrigger value="sla">
                <Clock className="h-4 w-4 me-1.5" />
                SLA
              </TabsTrigger>
              <TabsTrigger value="rbac">
                <Shield className="h-4 w-4 me-1.5" />
                الصلاحيات
              </TabsTrigger>
              <TabsTrigger value="audit">
                <History className="h-4 w-4 me-1.5" />
                <span className="sm:hidden">السجل</span>
                <span className="hidden sm:inline">سجل التدقيق</span>
              </TabsTrigger>
              <TabsTrigger value="appearance">
                <AiSparkleIcon className="h-4 w-4 me-1.5" />
                المظهر
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="branches">
            <Card>
              <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    الفروع ({branches.length})
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    قائمة بجميع الفروع النشطة على مستوى المملكة
                  </p>
                </div>
                <Button onClick={() => setShowAdd(true)}>
                  <Plus className="h-4 w-4" />
                  إضافة فرع
                </Button>
              </div>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الفرع</TableHead>
                      <TableHead>المحافظة</TableHead>
                      <TableHead>المدير</TableHead>
                      <TableHead>الهاتف</TableHead>
                      <TableHead>القضايا</TableHead>
                      <TableHead>الأداء</TableHead>
                      <TableHead className="text-center">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium text-stone-900">
                          {b.name}
                        </TableCell>
                        <TableCell className="text-xs text-stone-600">
                          {b.governorate}
                        </TableCell>
                        <TableCell className="text-xs text-stone-600">
                          {b.manager}
                        </TableCell>
                        <TableCell
                          className="text-xs text-stone-600 font-mono"
                          dir="ltr"
                        >
                          {b.phone}
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-display font-bold">
                            {b.casesCount}
                          </span>
                          <span className="text-stone-400">
                            {" "}
                            / {b.closedCount} مغلقة
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <Progress value={b.performance} />
                            </div>
                            <span className="text-xs font-display font-bold text-emerald-700">
                              {b.performance}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              toast.info("جاري تعديل الفرع...")
                            }
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden p-4 space-y-3">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    className="rounded-xl border border-stone-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-display font-bold text-sm text-stone-900">
                          {b.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {b.governorate}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <p className="text-xs text-stone-600 mb-2">
                      المدير: {b.manager}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-3 w-3 text-stone-400" />
                      <span className="text-xs font-mono" dir="ltr">
                        {b.phone}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-600">
                        {b.casesCount} قضية ({b.closedCount} مغلقة)
                      </span>
                      <span className="font-display font-bold text-emerald-700">
                        {b.performance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="committees">
            <Card>
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-bold text-base text-stone-900">
                  اللجان المتخصصة ({committees.length})
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  لجان تخصصية لمتابعة الأنواع المختلفة من القضايا
                </p>
              </div>
              <ul className="divide-y divide-stone-100">
                {committees.map((c) => (
                  <li key={c.id} className="p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-stone-900 mb-1">
                          {c.name}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed mb-3">
                          {c.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
                          <span>
                            <strong className="font-display font-bold text-emerald-700">
                              {c.casesAssigned}
                            </strong>{" "}
                            قضية
                          </span>
                          <span>
                            <strong className="font-display font-bold text-gold-700">
                              {c.casesResolved}
                            </strong>{" "}
                            مُحلّة
                          </span>
                          <span>
                            <strong className="font-display font-bold text-stone-900">
                              {c.members.length}
                            </strong>{" "}
                            أعضاء
                          </span>
                          <span className="text-stone-400">
                            رئيس اللجنة: {c.chair}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3.5 w-3.5" />
                        تعديل
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="sla">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="font-display font-bold text-base text-stone-900">
                  اتفاقيات مستوى الخدمة (SLA)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  المدة الزمنية القصوى للاستجابة لكل أولوية
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "حرجة",
                    value: 4,
                    unit: "ساعة",
                    color: "from-red-500 to-red-600",
                  },
                  {
                    label: "عالية",
                    value: 24,
                    unit: "ساعة",
                    color: "from-orange-500 to-orange-600",
                  },
                  {
                    label: "متوسطة",
                    value: 72,
                    unit: "ساعة",
                    color: "from-amber-500 to-amber-600",
                  },
                  {
                    label: "منخفضة",
                    value: 5,
                    unit: "أيام",
                    color: "from-stone-500 to-stone-600",
                  },
                ].map((sla) => (
                  <div
                    key={sla.label}
                    className="rounded-xl border border-stone-200 p-4"
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h4 className="font-display font-bold text-sm text-stone-900">
                        أولوية {sla.label}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Input
                          defaultValue={sla.value}
                          type="number"
                          className="w-20 text-center font-display font-bold"
                        />
                        <span className="text-sm text-stone-600">
                          {sla.unit}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${sla.color}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <Button
                  onClick={() =>
                    toast.success("تم حفظ إعدادات SLA")
                  }
                >
                  <Check className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rbac">
            <Card>
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-bold text-base text-stone-900">
                  الأدوار والصلاحيات
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  مصفوفة Role-Based Access Control
                </p>
              </div>

              {/* Desktop: full table */}
              <div className="hidden md:block overflow-x-auto scrollbar-thin">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الدور</TableHead>
                      <TableHead>عدد المستخدمين</TableHead>
                      <TableHead>القضايا</TableHead>
                      <TableHead>الفروع</TableHead>
                      <TableHead>المستخدمين</TableHead>
                      <TableHead>الإعدادات</TableHead>
                      <TableHead>التقارير</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <p className="font-display font-bold text-sm text-stone-900">
                            {r.name}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5 max-w-xs">
                            {r.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="font-display font-bold text-emerald-700">
                            {r.userCount}
                          </span>
                        </TableCell>
                        {r.permissions.slice(0, 5).map((p) => (
                          <TableCell key={p.resource}>
                            <div className="flex items-center gap-1">
                              {p.read ? (
                                <Eye className="h-3 w-3 text-blue-600" />
                              ) : (
                                <X className="h-3 w-3 text-stone-300" />
                              )}
                              {p.write ? (
                                <Pen className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <X className="h-3 w-3 text-stone-300" />
                              )}
                              {p.delete ? (
                                <Trash2 className="h-3 w-3 text-red-600" />
                              ) : (
                                <X className="h-3 w-3 text-stone-300" />
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile: card per role */}
              <div className="md:hidden p-4 space-y-3">
                {roles.map((r) => {
                  const resourceLabels: Record<string, string> = {
                    cases: "القضايا",
                    branches: "الفروع",
                    users: "المستخدمين",
                    settings: "الإعدادات",
                    reports: "التقارير",
                  };
                  return (
                    <div
                      key={r.id}
                      className="rounded-xl border border-stone-200 p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h4 className="font-display font-bold text-sm text-stone-900">
                            {r.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {r.description}
                          </p>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-display font-bold text-emerald-700">
                          {r.userCount} مستخدم
                        </span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {r.permissions.slice(0, 5).map((p) => (
                          <div
                            key={p.resource}
                            className="flex items-center justify-between rounded-lg bg-stone-50/70 px-3 py-2"
                          >
                            <span className="text-xs font-display font-semibold text-stone-700">
                              {resourceLabels[p.resource] || p.resource}
                            </span>
                            <div className="flex items-center gap-2">
                              {p.read ? (
                                <Eye className="h-3.5 w-3.5 text-blue-600" />
                              ) : (
                                <X className="h-3.5 w-3.5 text-stone-300" />
                              )}
                              {p.write ? (
                                <Pen className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <X className="h-3.5 w-3.5 text-stone-300" />
                              )}
                              {p.delete ? (
                                <Trash2 className="h-3.5 w-3.5 text-red-600" />
                              ) : (
                                <X className="h-3.5 w-3.5 text-stone-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 border-t border-border bg-stone-50/40 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-blue-600" />
                    قراءة
                  </span>
                  <span className="flex items-center gap-1">
                    <Pen className="h-3 w-3 text-emerald-600" />
                    تعديل
                  </span>
                  <span className="flex items-center gap-1">
                    <Trash2 className="h-3 w-3 text-red-600" />
                    حذف
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-bold text-base text-stone-900">
                  سجل التدقيق
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  آخر {auditLog.length} عملية مُسجلة في النظام
                </p>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>الإجراء</TableHead>
                      <TableHead>الهدف</TableHead>
                      <TableHead>الوقت</TableHead>
                      <TableHead>IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLog.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <p className="text-sm font-medium text-stone-900">
                            {log.actor}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            {log.actorRole}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-stone-700">
                          {log.action}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-emerald-700">
                          {log.target}
                        </TableCell>
                        <TableCell className="text-xs text-stone-500 whitespace-nowrap">
                          {formatDateTimeAr(log.timestamp)}
                        </TableCell>
                        <TableCell
                          className="text-xs text-stone-400 font-mono"
                          dir="ltr"
                        >
                          {log.ipAddress}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden p-4 space-y-3">
                {auditLog.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-stone-200 p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">
                          {log.actor}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {log.actorRole}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-[11px] text-stone-400 font-mono"
                        dir="ltr"
                      >
                        {log.ipAddress}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed mb-2">
                      {log.action}{" "}
                      <span className="font-mono text-emerald-700">
                        {log.target}
                      </span>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {formatDateTimeAr(log.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <div className="grid lg:grid-cols-3 gap-4 mb-4">
              <Card className="lg:col-span-2 p-0 overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="font-display font-bold text-base text-stone-900">
                    تجربة الصفحة الرئيسية
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    اختر بين الصفحة الرئيسية الكلاسيكية والتجربة السينمائية الجديدة. عند تفعيل الجديدة، أي زائر يفتح <span className="font-mono">/</span> سيرى التجربة تلقائياً.
                  </p>
                </div>

                <div className="p-5 space-y-3">
                  <div
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                      !isExperience
                        ? "border-emerald-300 bg-emerald-50/40 shadow-soft-sm"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isExperience) {
                          setLandingVariant("classic");
                          toast.success("تم اعتماد الصفحة الكلاسيكية");
                        }
                      }}
                      aria-pressed={landingHydrated && !isExperience}
                      className="flex flex-1 items-start gap-4 text-start min-w-0"
                    >
                      <span
                        aria-hidden
                        className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          landingHydrated && !isExperience
                            ? "border-emerald-700 bg-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {landingHydrated && !isExperience && (
                          <span className="h-2 w-2 rounded-full bg-emerald-700" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-bold text-sm text-stone-900">
                            الكلاسيكية
                          </h4>
                          <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-display font-bold text-stone-600">
                            /
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                          الصفحة الرسمية الحالية — هادئة، واضحة، مُتعارَف عليها. كل الأقسام كما هي بدون تعديل.
                        </p>
                      </div>
                    </button>
                    <Link
                      href="/?ref=settings"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-display font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      فتح
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </Link>
                  </div>

                  <div
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                      isExperience
                        ? "border-emerald-300 bg-emerald-50/40 shadow-soft-sm"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!isExperience) {
                          setLandingVariant("experience");
                          toast.success("تم تفعيل التجربة السينمائية", {
                            description:
                              "زيارة / من الآن ستفتح الصفحة الجديدة تلقائياً",
                          });
                        }
                      }}
                      aria-pressed={landingHydrated && isExperience}
                      className="flex flex-1 items-start gap-4 text-start min-w-0"
                    >
                      <span
                        aria-hidden
                        className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          landingHydrated && isExperience
                            ? "border-emerald-700 bg-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {landingHydrated && isExperience && (
                          <span className="h-2 w-2 rounded-full bg-emerald-700" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-bold text-sm text-stone-900">
                            التجربة السينمائية
                          </h4>
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-display font-bold text-emerald-700">
                            /experience
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-display font-bold text-gold-700">
                            <AiSparkleIcon className="h-2.5 w-2.5" />
                            جديد
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                          خيط ذهبي يربط 7 مراحل الشكوى، شريط عمليات حي، Canvas تفاعلي، خريطة الأردن النابضة، عرض ذكاء اصطناعي مرئي، وعمق ثلاثي الأبعاد على البطاقات.
                        </p>
                      </div>
                    </button>
                    <Link
                      href="/experience"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-display font-semibold text-emerald-800 hover:bg-emerald-100"
                    >
                      فتح
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-sm text-stone-900">
                        اعتماد التجربة الجديدة كافتراضية
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        عند التفعيل، فتح <span className="font-mono">/</span> يعرض التجربة السينمائية تلقائياً عبر middleware.
                      </p>
                    </div>
                    <Switch
                      checked={landingHydrated && isExperience}
                      onCheckedChange={(checked) => {
                        setLandingVariant(checked ? "experience" : "classic");
                      }}
                      aria-label="تفعيل التجربة السينمائية كافتراضية"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-12 -end-12 h-40 w-40 rounded-full opacity-50"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(232,197,71,0.4), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-700 mb-3">
                    <AiSparkleIcon className="h-4 w-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-stone-900">
                    صفحة الزائر الحالية
                  </h4>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                    عند فتح <span className="font-mono">/</span> سيظهر:
                  </p>
                  <p className="mt-2 font-display font-extrabold text-stone-900 text-lg">
                    {landingHydrated
                      ? isExperience
                        ? "التجربة السينمائية"
                        : "الصفحة الكلاسيكية"
                      : "..."}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-emerald-700">
                    {landingHydrated
                      ? isExperience
                        ? "/ → rewrite → /experience"
                        : "/"
                      : ""}
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed">
                    التفضيل يُحفظ في متصفحك ويُزامَن مع كوكي بسيطة لمدة سنة. الرابط <span className="font-mono">/experience</span> يبقى متاحاً دائماً مباشرةً.
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 p-0 overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="font-display font-bold text-base text-stone-900">
                    تجربة لوحة القيادة
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    اختر بين اللوحة الكلاسيكية والاستوديو الإبداعي. التبديل
                    يحفظ على هذا الجهاز ويغيّر وجهة رابط «لوحة القيادة» في
                    الشريط العلوي.
                  </p>
                </div>

                <div className="p-5 space-y-3">
                  <div
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                      !isStudio
                        ? "border-emerald-300 bg-emerald-50/40 shadow-soft-sm"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isStudio) {
                          setVariant("classic");
                          toast.success("تم اعتماد اللوحة الكلاسيكية");
                        }
                      }}
                      aria-pressed={hydrated && !isStudio}
                      className="flex flex-1 items-start gap-4 text-start min-w-0"
                    >
                      <span
                        aria-hidden
                        className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          hydrated && !isStudio
                            ? "border-emerald-700 bg-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {hydrated && !isStudio && (
                          <span className="h-2 w-2 rounded-full bg-emerald-700" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-bold text-sm text-stone-900">
                            الكلاسيكية
                          </h4>
                          <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-display font-bold text-stone-600">
                            /dashboard
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                          اللوحة المعتمدة الحالية بنمط هادئ وتركيز على
                          المحتوى. كل البطاقات والمخططات كما هي دون تغيير.
                        </p>
                      </div>
                    </button>
                    <Link
                      href="/dashboard"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-display font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      فتح
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </Link>
                  </div>

                  <div
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                      isStudio
                        ? "border-emerald-300 bg-emerald-50/40 shadow-soft-sm"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!isStudio) {
                          setVariant("studio");
                          toast.success("تم تفعيل استوديو القيادة", {
                            description:
                              "رابط لوحة القيادة في الشريط العلوي يفتح التجربة الجديدة الآن",
                          });
                        }
                      }}
                      aria-pressed={hydrated && isStudio}
                      className="flex flex-1 items-start gap-4 text-start min-w-0"
                    >
                      <span
                        aria-hidden
                        className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          hydrated && isStudio
                            ? "border-emerald-700 bg-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {hydrated && isStudio && (
                          <span className="h-2 w-2 rounded-full bg-emerald-700" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-bold text-sm text-stone-900">
                            استوديو القيادة
                          </h4>
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-display font-bold text-emerald-700">
                            /dashboard/studio
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-display font-bold text-gold-700">
                            <AiSparkleIcon className="h-2.5 w-2.5" />
                            تجريبي
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                          غرفة عمليات بمشهد بصري حي: ضباب لوني متحرك، نبض
                          المنصة المباشر، بطاقات KPI ثلاثية الأبعاد عند تمرير
                          المؤشر، وتسلسل دخول مدروس للأقسام.
                        </p>
                      </div>
                    </button>
                    <Link
                      href="/dashboard/studio"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-display font-semibold text-emerald-800 hover:bg-emerald-100"
                    >
                      فتح
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-sm text-stone-900">
                        اعتماد الاستوديو كافتراضي
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        عند التفعيل، رابط «لوحة القيادة» في الشريط العلوي
                        يفتح الاستوديو مباشرة.
                      </p>
                    </div>
                    <Switch
                      checked={hydrated && isStudio}
                      onCheckedChange={(checked) => {
                        setVariant(checked ? "studio" : "classic");
                      }}
                      aria-label="تفعيل استوديو القيادة كافتراضي"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-12 -end-12 h-40 w-40 rounded-full opacity-50"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(16,185,129,0.35), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-3">
                    <AiSparkleIcon className="h-4 w-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-stone-900">
                    الحالة الراهنة
                  </h4>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                    الوجهة المُختارة الآن:
                  </p>
                  <p className="mt-2 font-display font-extrabold text-stone-900 text-lg">
                    {hydrated
                      ? isStudio
                        ? "استوديو القيادة"
                        : "اللوحة الكلاسيكية"
                      : "..."}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-emerald-700">
                    {hydrated
                      ? isStudio
                        ? "/dashboard/studio"
                        : "/dashboard"
                      : ""}
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed">
                    التفضيل يُحفظ في متصفحك ويُزامَن مع كوكي بسيطة لمدة سنة.
                    اللوحة الأخرى تبقى متاحة دائماً عبر الرابط المباشر.
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add branch dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة فرع جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات الفرع الجديد لتفعيله في النظام
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="mb-2 block">اسم الفرع</Label>
              <Input placeholder="مثال: فرع الرصيفة" />
            </div>
            <div>
              <Label className="mb-2 block">المحافظة</Label>
              <Input placeholder="مثال: الزرقاء" />
            </div>
            <div>
              <Label className="mb-2 block">العنوان</Label>
              <Input placeholder="عنوان الفرع كامل" />
            </div>
            <div>
              <Label className="mb-2 block">رقم الهاتف</Label>
              <Input placeholder="06-XXXXXXX" dir="ltr" />
            </div>
            <div>
              <Label className="mb-2 block">مدير الفرع</Label>
              <Input placeholder="الاسم الكامل" />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowAdd(false);
                toast.success("تم إضافة الفرع بنجاح");
              }}
            >
              <Check className="h-4 w-4" />
              تفعيل الفرع
            </Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
