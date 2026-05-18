"use client";

import Link from "next/link";

export default function IssueDocentDetailError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-[100px] w-[920px] bg-white pb-16 pt-16 text-[#1d1d1f]">
      <section className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-8">
        <p className="text-[13px] font-semibold text-[#c96442]">
          이슈 도슨트를 불러오지 못했어요
        </p>
        <h1 className="mt-3 text-[28px] font-semibold">상세 내용을 다시 불러와주세요.</h1>
        <div className="mt-6 flex gap-3">
          <button
            className="h-10 rounded-lg bg-[#1d1d1f] px-4 text-[14px] font-semibold text-white"
            onClick={reset}
            type="button"
          >
            다시 불러오기
          </button>
          <Link
            className="inline-flex h-10 items-center rounded-lg border border-[#e0e0e0] px-4 text-[14px] font-semibold text-[#1d1d1f]"
            href="/issue-docent"
          >
            목록으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
