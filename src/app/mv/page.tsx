"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { InterestRail } from "@/components/InterestRail";
import { Header } from "@/components/Header";
import { fetchIssueDocentList } from "@/lib/issue-docent";
import { matchesInterest } from "@/lib/issue-match";
import type { Issue } from "@/types/jangdokdae";
import { useInterestProfile } from "@/hooks/useInterestProfile";

type SourceType = "news" | "telegram" | "youtube" | "disclosure";
type FeedTab = "interest" | "all";

const siteMedia = "/images/moneytoring/site/_next/static/media";
const imageBase = "/images/moneytoring/market_voice_v2/document/image";

const sourceIcons: Record<SourceType, string> = {
  disclosure: `${siteMedia}/icon-disclosure.6229b5fb.svg`,
  news: `${siteMedia}/icon-news.8377e0cb.svg`,
  telegram: `${siteMedia}/icon-telegram.1d679e80.svg`,
  youtube: `${siteMedia}/icon-youtube.a0c9b97c.svg`,
};

const filterChips = [
  { label: "전체" },
  { label: "공시", icon: sourceIcons.disclosure },
  { label: "뉴스", icon: sourceIcons.news },
  { label: "텔레그램", icon: sourceIcons.telegram },
  { label: "유튜브", icon: sourceIcons.youtube },
  { label: "IR", icon: `${siteMedia}/icon-ir.3b43a847.svg` },
];

const thumbnails = [
  `${imageBase}/56ff59d8-be37-4f8d-a6cb-b0951dda5491.jpg`,
  `${imageBase}/402fa27c-8862-4643-a2f1-1904b8bf5322.jpg`,
  `${imageBase}/0ca32aab-dcc3-407d-9b6b-a0b9b76ae8a8.jpg`,
  `${imageBase}/db0b9654-5994-4f97-811e-b33895d9a595.jpg`,
];


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


function SourceStack({ sources }: { sources: SourceType[] }) {
  return (
    <div className="flex shrink-0 -space-x-2">
      {sources.map((source) => (
        <Image key={source} src={sourceIcons[source]} alt="" width={20} height={20} className="h-5 w-5 rounded-full bg-white" />
      ))}
    </div>
  );
}

function TagChip({ label }: { label: string }) {
  return (
    <span className="ko-label flex h-8 max-w-[220px] items-center rounded-full bg-[#fbfcfd] px-3 text-[14px] font-medium text-[#1d1d1f]">
      <span className="truncate">{label}</span>
    </span>
  );
}

function FeedRow({ issue, index }: { issue: Issue; index: number }) {
  const tags = [...issue.sectors, ...issue.companies, ...issue.keywords].slice(0, 5);
  const sources: SourceType[] = index % 3 === 0 ? ["news", "telegram", "youtube"] : index % 2 === 0 ? ["news"] : ["news", "telegram"];
  const image = thumbnails[index % thumbnails.length];

  return (
    <Link
      href={`/mv/${issue.id}`}
      className="flex min-h-[202px] w-full gap-4 border-b border-[#e0e0e0] p-4 transition hover:rounded-[20px] hover:bg-white"
    >
      <div className="min-w-0 flex-1 pr-3">
        <h2 className="ko-title text-[18px] font-semibold leading-[26px] tracking-[-0.04px] text-[#1d1d1f]">{issue.title}</h2>
        <p className="ko-body mt-2 line-clamp-2 text-[15px] leading-[22px] text-[#7a7a7a]">{issue.translation.explanation[0]}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => <TagChip key={`${issue.id}-${tag}-${tagIndex}`} label={tag} />)}
        </div>
        <div className="mt-6 flex items-center gap-3 text-[13px] text-[#7a7a7a]">
          <SourceStack sources={sources} />
          <span>{issue.quizzes.length}개의 퀴즈</span>
          <span className="h-3 w-px bg-[#e0e0e0]" />
          <span>{formatCollectedAt(issue.collectedAt)} 수집</span>
        </div>
      </div>
      <div className="relative my-3 h-36 w-64 shrink-0 overflow-hidden rounded-lg bg-[#fbfcfd]">
        <Image src={image} alt={`${issue.title} 관련 이미지`} fill sizes="256px" className="object-cover" />
        <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-[#7a7a7a]">주린이 번역</span>
      </div>
    </Link>
  );
}

export default function MarketVoicePage() {
  const [activeTab, setActiveTab] = useState<FeedTab>("all");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useInterestProfile();

  useEffect(() => {
    const controller = new AbortController();

    const loadIssues = async () => {
      try {
        const nextIssues = await fetchIssueDocentList(controller.signal);
        setIssues(nextIssues);
      } catch {
        setIssues([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadIssues();
    return () => controller.abort();
  }, []);

  const interestIssues = useMemo(() => issues.filter((issue) => matchesInterest(issue, profile)), [profile]);
  const visibleIssues = activeTab === "interest" ? interestIssues : issues;
  const tabs: Array<{ id: FeedTab; label: string }> = [
    { id: "interest", label: "관심 이슈" },
    { id: "all", label: "전체 이슈" },
  ];

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header activeIndex={1} />
      <InterestRail />
      <main className="mx-[100px] w-[1176px] bg-[#ffffff] pb-16 pt-4">
        <div className="flex h-14 items-end gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`pb-2 text-[28px] font-semibold leading-9 tracking-[-0.5px] transition ${
                  isActive ? "border-b-[3px] border-[#000000] text-[#1d1d1f]" : "text-[#7a7a7a] hover:text-[#1d1d1f]"
                }`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex h-8 items-center">
          <button className="-ml-2 flex h-8 items-center gap-1 rounded-[10px] px-2 text-[16px] font-semibold text-[#7a7a7a]" type="button">
            최신순 <span className="text-[18px]">↕</span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            {filterChips.map((filter, index) => (
              <button
                key={filter.label}
                className={`flex h-8 items-center gap-1 rounded-full border px-3 text-[14px] ${
                  index === 0 ? "border-[#000000] bg-[#000000] text-white" : "border-[#e0e0e0] bg-white text-[#1d1d1f]"
                }`}
                type="button"
              >
                {filter.icon && <Image src={filter.icon} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="rounded-lg border border-dashed border-[#e0e0e0] bg-[#f7f8fa] px-8 py-10 text-[15px] leading-7 text-[#7a7a7a]">
              이슈를 불러오는 중입니다.
            </div>
          ) : visibleIssues.length > 0 ? (
            visibleIssues.map((issue, index) => <FeedRow key={issue.id} issue={issue} index={index} />)
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-[#e0e0e0] bg-[#f7f8fa] px-8 py-10 text-[15px] leading-7 text-[#7a7a7a]">
              아직 내 관심사와 맞는 이슈가 없어요. 우측 내 관심에서 관심사를 넓히거나 전체 이슈를 확인해보세요.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
