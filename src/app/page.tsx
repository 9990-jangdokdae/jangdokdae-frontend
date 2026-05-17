"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { issues, matchesInterest } from "@/lib/jangdokdaeData";
import type { Issue } from "@/types/jangdokdae";
import { useInterestProfile } from "@/hooks/useInterestProfile";
import { Header } from "@/components/Header";

function formatCollectedAt(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function IssueCard({ issue, featured = false }: { issue: Issue; featured?: boolean }) {
  return (
    <Link
      href={`/issue-docent/${issue.id}`}
      className={`group block rounded-lg border border-[#e0e0e0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c96442] hover:shadow-[0_12px_30px_rgba(20,20,19,0.08)] ${
        featured ? "min-h-[230px]" : "min-h-[190px]"
      }`}
    >
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#7a7a7a]">
        <span>{issue.source.name}</span>
        <span className="h-1 w-1 rounded-full bg-[#e0e0e0]" />
        <span>{formatCollectedAt(issue.collectedAt)} 수집</span>
      </div>
      <h3 className="ko-title mt-4 text-[21px] font-semibold leading-7 text-[#1d1d1f] group-hover:text-[#b65335]">{issue.title}</h3>
      <p className="ko-body mt-4 line-clamp-3 text-[15px] leading-6 text-[#1d1d1f]">{issue.translation.explanation[0]}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[...issue.sectors, ...issue.companies].map((tag) => (
          <span key={tag} className="ko-label rounded-full bg-[#fbfcfd] px-3 py-1 text-[12px] font-semibold text-[#7a7a7a]">{tag}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center text-[14px] font-semibold text-[#c96442]">
        쉽게 읽기
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function IssueSection({ title, description, items, empty }: { title: string; description: string; items: Issue[]; empty?: string }) {
  return (
    <section className="py-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="ko-title text-[26px] font-semibold text-[#1d1d1f]">{title}</h2>
          <p className="ko-body mt-2 text-[14px] text-[#7a7a7a]">{description}</p>
        </div>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {items.map((issue, index) => <IssueCard key={issue.id} issue={issue} featured={index === 0} />)}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[#e0e0e0] bg-[#fbfcfd] p-7 text-[15px] leading-6 text-[#7a7a7a]">{empty}</div>
      )}
    </section>
  );
}

export default function Home() {
  const { profile } = useInterestProfile();
  const personalizedIssues = useMemo(() => issues.filter((issue) => matchesInterest(issue, profile)), [profile]);

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header activeIndex={0} />

      <main className="mx-[100px] w-[1176px] bg-[#ffffff] pb-24 pt-8">
        <section className="border-b border-[#e0e0e0] pb-10">
          <div>
            <h1 className="max-w-[760px] text-[64px] font-normal leading-[1.04] text-[#1d1d1f]">
              시장 독해를
              <span className="mt-2 block w-fit rounded-lg bg-[#000000] px-4 py-2 text-[#ffffff]">대신 해드립니다</span>
            </h1>
          </div>
        </section>

        <IssueSection
          title="내 관심 이슈"
          description="온보딩에서 고른 섹터와 종목에 맞춰 먼저 보여드려요."
          items={personalizedIssues}
          empty="아직 선택한 관심사와 딱 맞는 이슈가 없어요. 관심사 설정하기에서 관심사를 넓히거나 아래 전체 시장 이슈를 확인해보세요."
        />

        <IssueSection
          title="오늘의 전체 시장 이슈"
          description="관심사 밖의 흐름도 놓치지 않도록 함께 모아두었습니다."
          items={issues}
        />
      </main>

      <footer className="border-t border-[#e0e0e0] bg-[#ffffff] px-8 py-10 text-[13px] leading-6 text-[#7a7a7a]">
        <strong className="text-[#1d1d1f]">장독대</strong>
        <p className="mt-2">제공되는 정보는 학습과 시장 이해를 위한 콘텐츠이며, 특정 종목의 매수 또는 매도 권유가 아닙니다.</p>
      </footer>
    </div>
  );
}
