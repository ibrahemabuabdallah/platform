"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitSuccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refNumber: string;
  onCopy: () => void;
}

/**
 * The one moment in the flow that genuinely warrants an interruption: the
 * citizen must leave with the reference number. It also names what happens next,
 * so the dialog answers "and now?" before it is closed.
 */
export function SubmitSuccess({
  open,
  onOpenChange,
  refNumber,
  onCopy,
}: SubmitSuccessProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <motion.span
              initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: 0.08,
              }}
            >
              <Check
                aria-hidden
                className="h-8 w-8 text-emerald-700"
                strokeWidth={3}
              />
            </motion.span>
          </div>
          <DialogTitle className="text-center">
            استلمنا طلبك
          </DialogTitle>
          <DialogDescription className="text-center">
            احفظ الرقم المرجعي — هو مفتاحك لمتابعة الطلب في أي وقت، وبلا حساب.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-gradient-to-l from-emerald-800 to-emerald-700 p-5 text-center">
          <p className="text-[11px] text-emerald-100/80">رقمك المرجعي</p>
          <p className="number-mono mt-1 font-display text-2xl font-extrabold tracking-[0.08em] text-white">
            {refNumber}
          </p>
        </div>

        <ol className="space-y-1.5 text-[12px] leading-relaxed text-stone-600">
          <li>· يُصنَّف الطلب ويُوجَّه للفرع المختص خلال ساعة.</li>
          <li>· يتولّاه منسق باسمه، ويبدأ عدّاد موعد الالتزام.</li>
          <li>· تتابع كل حدث بالرقم المرجعي من صفحة التتبع.</li>
        </ol>

        <DialogFooter className="flex-col sm:flex-row">
          <Button onClick={onCopy} className="w-full sm:flex-1">
            <Copy aria-hidden className="h-4 w-4" />
            نسخ الرقم
          </Button>
          <Button asChild variant="outline" className="w-full sm:flex-1">
            <Link href={`/v2/track?ref=${encodeURIComponent(refNumber)}`}>
              <Search aria-hidden className="h-4 w-4" />
              تتبّع الطلب
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
