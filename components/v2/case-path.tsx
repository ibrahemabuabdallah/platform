import { Section, SectionHeading } from "@/components/v2/section";
import { LiveCaseBoard } from "@/components/v2/live-case-board";

/**
 * The live case board used to sit inside the banner. With footage behind it the
 * banner can no longer carry a second reading task, so the board gets the room
 * it always needed — and the claim beside it is now legible rather than squeezed.
 */
export function CasePath() {
  return (
    <Section tone="white" spacing="tight" glow="start">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <SectionHeading
            title="شكوى واحدة، ومسار تراه كاملاً"
            lede="هذا ملف حقيقي وهو يتنقّل بين المراحل. لا خطوة تحدث دون أن تُسجَّل باسم صاحبها ووقتها، وأنت ترى السجل نفسه الذي يراه المنسق."
            className="mb-0"
          />

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:max-w-md">
            <div>
              <dt className="text-[12px] text-stone-600">لحظة التقديم</dt>
              <dd className="mt-1 font-display text-[0.95rem] font-bold text-stone-900">
                رقم مرجعي فوري
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-stone-600">خلال ساعة</dt>
              <dd className="mt-1 font-display text-[0.95rem] font-bold text-stone-900">
                توجيه للفرع المختص
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-stone-600">نفس اليوم</dt>
              <dd className="mt-1 font-display text-[0.95rem] font-bold text-stone-900">
                منسق باسمه يتولّاه
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-stone-600">عند الإغلاق</dt>
              <dd className="mt-1 font-display text-[0.95rem] font-bold text-stone-900">
                تقرير نهائي يبقى لك
              </dd>
            </div>
          </dl>
        </div>

        <LiveCaseBoard />
      </div>
    </Section>
  );
}
