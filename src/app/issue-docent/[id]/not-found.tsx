import Link from "next/link";

export default function IssueDocentNotFound() {
  return (
    <main className="mx-[100px] w-[920px] bg-white pb-16 pt-16 text-[#1d1d1f]">
      <section className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-8">
        <p className="text-[13px] font-semibold text-[#c96442]">이슈를 찾을 수 없습니다</p>
        <h1 className="mt-3 text-[28px] font-semibold">요청한 이슈 도슨트가 없어요.</h1>
        <p className="ko-body mt-3 text-[15px] leading-6 text-[#7a7a7a]">
          삭제되었거나 아직 생성되지 않은 콘텐츠일 수 있습니다.
        </p>
        <Link
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#1d1d1f] px-4 text-[14px] font-semibold text-white"
          href="/issue-docent"
        >
          목록으로 이동
        </Link>
      </section>
    </main>
  );
}
