"use client";

import { motion } from "framer-motion";
import { Building2, Clock, BarChart3, Hash, Plus } from "lucide-react";

const items = [
  {
    icon: Building2,
    value: "43",
    label: "فرع قابل للربط على مستوى الوطن",
  },
  {
    icon: Clock,
    value: "SLA",
    label: "زمن استجابة محدد لكل أولوية",
  },
  {
    icon: BarChart3,
    value: "لوحة قيادة",
    label: "مركزية للقرار التشغيلي",
  },
  {
    icon: Hash,
    value: "رقم مرجعي",
    label: "فوري لتتبع طلبك خطوة بخطوة",
  },
];

export function TrustBar() {
  return (
    <section className="relative -mt-12 z-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-stone-200/80 shadow-soft-lg bg-white overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 relative">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-5 lg:p-6 relative"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-extrabold text-lg lg:text-xl text-emerald-900 leading-tight">
                      {item.value}
                    </div>
                    <p className="text-xs lg:text-sm text-stone-500 mt-0.5 leading-snug">
                      {item.label}
                    </p>
                  </div>
                </div>

                {i < items.length - 1 && (
                  <>
                    <span
                      aria-hidden
                      className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 h-12 w-px bg-gradient-to-b from-transparent via-gold-200/60 to-transparent"
                    />
                    <span
                      aria-hidden
                      className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 h-5 w-5 items-center justify-center rounded-full bg-white border border-gold-200/70 text-gold-500"
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </span>
                  </>
                )}

                {i % 2 === 0 && i < items.length - 1 && (
                  <span
                    aria-hidden
                    className="lg:hidden absolute top-0 bottom-0 left-0 w-px bg-gold-200/40"
                  />
                )}
              </motion.div>
            ))}

            <div
              aria-hidden
              className="lg:hidden absolute top-1/2 -translate-y-1/2 inset-x-0 h-px bg-gold-200/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
