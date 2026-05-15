"use client";

export default function IssueDocentError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-[100px] w-[1176px] bg-white pb-16 pt-16 text-[#1d1d1f]">
      <section className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-8">
        <p className="text-[13px] font-semibold text-[#c96442]">
          이슈 도슨트를 불러오지 못했어요
        </p>
        <h1 className="mt-3 text-[28px] font-semibold">잠시 후 다시 시도해주세요.</h1>
        <button
          className="mt-6 h-10 rounded-lg bg-[#1d1d1f] px-4 text-[14px] font-semibold text-white"
          onClick={reset}
          type="button"
        >
          다시 불러오기
        </button>
      </section>
    </main>
  );
}
