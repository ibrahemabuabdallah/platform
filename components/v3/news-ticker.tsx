import Link from "next/link";
import { announcements, type Announcement } from "@/data/announcements";

/** مسار خط النبض — نسخة مطابقة لتصميم updates-bar */
const ECG_PATH =
  "M0 17 H30 L38 17 L44 4 L50 30 L56 17 H80 L86 12 L92 22 L98 17 H132";

function TickerItem({ item }: { item: Announcement }) {
  const body = (
    <>
      <span className="shrink-0 rounded-full bg-[rgba(201,164,92,0.14)] px-1.5 py-0.5 text-[10px] font-semibold text-[#B8925A] sm:px-2 sm:text-[11px]">
        {item.tag}
      </span>
      <span className="whitespace-nowrap text-[13px] font-semibold text-[#0F3D33] transition-colors group-hover:text-emerald-800 sm:text-sm">
        {item.text}
      </span>
      <span
        aria-hidden
        className="ms-4 h-[5px] w-[5px] shrink-0 rounded-full bg-[#C9A45C] sm:ms-8"
      />
    </>
  );

  const className =
    "group inline-flex shrink-0 items-center gap-2 pe-4 sm:gap-2.5 sm:pe-10";

  return item.href ? (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  ) : (
    <span className={className}>{body}</span>
  );
}

/**
 * شريط المستجدات في v3 بتصميم «شريط النبض»: شريط كريمي رفيع (52px)
 * فيه نقطة ذهبية نابضة وخط نبض قلب متحرك يجسّد هوية «نبض الأمة»،
 * ثم فاصل شعيري ونافذة أخبار تنساب بقناع تلاشي عند الحواف.
 * الحركة من اليمين لليسار وتتوقف عند المرور، والحلقة مضاعفة بلا قفزة.
 */
export function NewsTicker() {
  const doubled = [...announcements, ...announcements];

  return (
    <section
      aria-label="آخر إعلانات المنصة"
      className="flex h-11 items-center gap-2.5 border-b border-[#EDE7D6] bg-[linear-gradient(90deg,#FBF8EF,#F6F1E2)] px-3 sm:h-[52px] sm:gap-[18px] sm:px-7"
    >
      {/* الشارة */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-[9px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C] ticker-pulse-ring sm:h-2 sm:w-2" />
        <span className="whitespace-nowrap text-[11px] font-bold text-[#0F3D33] sm:text-[13px]">
          آخر المستجدات
        </span>
      </div>

      {/* خط النبض — يتصغّر على الهاتف عبر viewBox بدون تشويه */}
      <svg
        aria-hidden
        viewBox="0 0 132 34"
        className="w-14 shrink-0 overflow-visible sm:w-[132px]"
      >
        <path
          d={ECG_PATH}
          stroke="#DCD4BF"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={ECG_PATH}
          pathLength={100}
          className="ecg-line"
          stroke="#1F7A5E"
          strokeWidth={2}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* الفاصل الشعيري */}
      <span aria-hidden className="h-4 w-px shrink-0 bg-[#E3DBC4] sm:h-5" />

      {/* نافذة الأخبار */}
      <div
        className="h-6 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
        style={{ direction: "ltr" }}
      >
        <div
          className="flex h-6 w-max items-center ticker-scroll hover:[animation-play-state:paused]"
          style={{ direction: "rtl" }}
        >
          {doubled.map((item, i) => (
            <TickerItem key={`${item.text}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
