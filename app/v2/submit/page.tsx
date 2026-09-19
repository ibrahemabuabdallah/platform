import type { Metadata } from "next";
import { SubmitForm } from "@/components/v2/submit-form";

export const metadata: Metadata = {
  title: "تقديم شكوى أو مقترح",
  description:
    "قدّم شكوتك أو مقترحك في خمس خطوات — مع رقم مرجعي فوري للمتابعة.",
};

export default function V2SubmitPage() {
  return <SubmitForm />;
}
