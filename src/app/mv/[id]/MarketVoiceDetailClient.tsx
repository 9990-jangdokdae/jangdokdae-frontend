"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, BookOpenCheck, Check, Search, X } from "lucide-react";
import { InterestRail } from "@/components/InterestRail";
import { getIssueById } from "@/lib/jangdokdae-data";
import type { JuriniTerm, QuizQuestion } from "@/types/jangdokdae";

function formatCollectedAt(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function uniqueTags(tags: string[]) {
  return Array.from(new Set(tags));
}

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="장독대 홈">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c96442] text-[20px] font-semibold text-white">장</span>
      <span className="leading-none">
        <span className="block text-[20px] font-semibold text-[#1d1d1f]">장독대</span>
        <span className="mt-1 block text-[11px] font-medium text-[#7a7a7a]">시장 독해를 대신 해드립니다</span>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 h-[64px] border-b border-[#e0e0e0] bg-[#ffffff]/95 backdrop-blur">
      <div className="flex h-full items-center px-8">
        <BrandMark />
        <nav className="ml-[220px] flex items-center gap-1 text-[14px] font-semibold text-[#1d1d1f]">
          {["오늘의 독해", "이슈", "마켓 정보"].map((item, index) => (
            <Link
              key={item}
              href={index === 0 ? "/" : index === 1 ? "/mv" : index === 2 ? "/market/indices" : "#"}
              className={`rounded-full px-3 py-2 ${index === 1 ? "bg-[#f7f8fa] text-[#1d1d1f]" : "hover:bg-[#fbfcfd]"}`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <button className="ml-3 flex h-9 w-[220px] items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-3 text-[13px] text-[#7a7a7a]">
          <Search className="h-[17px] w-[17px]" />
          이슈, 종목, 용어 검색
        </button>
        <Bell className="ml-auto h-5 w-5 text-[#7a7a7a]" />
        <button className="ml-7 h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white">로그인</button>
      </div>
    </header>
  );
}

function splitParagraphByTerms(paragraph: string, terms: JuriniTerm[]) {
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
  const escapedTerms = sortedTerms.map((term) => term.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (escapedTerms.length === 0) return [{ text: paragraph, term: null as JuriniTerm | null }];

  const matcher = new RegExp(`(${escapedTerms.join("|")})`, "g");
  return paragraph.split(matcher).filter(Boolean).map((text) => ({
    text,
    term: sortedTerms.find((candidate) => candidate.term === text) ?? null,
  }));
}

function TermTooltip({
  term,
  onOpen,
}: {
  term: JuriniTerm;
  onOpen: (term: JuriniTerm) => void;
}) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        className="rounded-[4px] bg-[#fff1ec] px-1 font-semibold text-[#b65335] underline decoration-[#c96442]/45 decoration-dotted underline-offset-4 transition hover:bg-[#f7ded5] focus:outline-none focus:ring-2 focus:ring-[#c96442]/35"
        onClick={() => onOpen(term)}
        aria-describedby={`term-${term.term}`}
      >
        {term.term}
      </button>
      <span
        id={`term-${term.term}`}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-[280px] -translate-x-1/2 rounded-lg border border-[#e0e0e0] bg-[#000000] p-4 text-left text-[13px] font-normal leading-5 text-[#ffffff] shadow-[0_16px_36px_rgba(20,20,19,0.24)] group-hover:block group-focus-within:block"
      >
        <strong className="mb-1 block text-[14px] text-white">{term.term}</strong>
        {term.explanation}
        <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#000000]" />
      </span>
    </span>
  );
}

function ParagraphWithTerms({
  paragraph,
  terms,
  highlighted,
  onOpenTerm,
}: {
  paragraph: string;
  terms: JuriniTerm[];
  highlighted?: boolean;
  onOpenTerm: (term: JuriniTerm) => void;
}) {
  return (
    <p className={`ko-body text-[17px] leading-8 text-[#1d1d1f] ${highlighted ? "rounded-lg bg-[#f7f8fa] p-5 text-[#1d1d1f]" : ""}`}>
      {splitParagraphByTerms(paragraph, terms).map((part, index) => (
        part.term ? (
          <TermTooltip key={`${part.text}-${index}`} term={part.term} onOpen={onOpenTerm} />
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        )
      ))}
    </p>
  );
}

function TermBottomSheet({ term, onClose }: { term: JuriniTerm; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-[#000000]/35 md:hidden" onClick={onClose}>
      <section className="w-full rounded-t-xl bg-[#ffffff] p-6 shadow-[0_-18px_44px_rgba(20,20,19,0.18)]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-[#c96442]">용어 풀이</p>
            <h2 className="mt-2 text-[24px] font-semibold text-[#1d1d1f]">{term.term}</h2>
          </div>
          <button aria-label="닫기" className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]" onClick={onClose}>
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>
        </div>
        <p className="ko-body mt-5 text-[16px] leading-7 text-[#1d1d1f]">{term.explanation}</p>
      </section>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: QuizQuestion }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const answered = selectedIndex !== null;
  const selectedIsAnswer = selectedIndex === quiz.answerIndex;

  return (
    <article className="rounded-lg border border-[#e0e0e0] bg-white p-6">
      <p className="text-[13px] font-semibold text-[#c96442]">{quiz.kind === "term" ? "용어 퀴즈" : "이슈 이해 퀴즈"}</p>
      <h3 className="ko-title mt-3 text-[20px] font-semibold leading-7 text-[#1d1d1f]">{quiz.question}</h3>
      <div className="mt-5 grid gap-3">
        {quiz.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const stateClass = isSelected
            ? selectedIsAnswer
              ? "border-[#5db872] bg-[#effaf2] text-[#245a31]"
              : "border-[#c64545] bg-[#fff0f0] text-[#8a2b2b]"
            : "border-[#e0e0e0] bg-[#ffffff] text-[#1d1d1f] hover:border-[#c96442]";

          return (
            <button
              key={option}
              className={`flex min-h-12 items-center justify-between rounded-lg border px-4 text-left text-[15px] font-semibold transition ${stateClass}`}
              onClick={() => setSelectedIndex((currentIndex) => (currentIndex === index ? null : index))}
            >
              <span className="ko-label">{option}</span>
              {isSelected && selectedIsAnswer && <Check className="h-5 w-5" />}
              {isSelected && !selectedIsAnswer && <X className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-5 rounded-lg bg-[#fbfcfd] p-4 text-[14px] leading-6 text-[#1d1d1f]">
          <strong className="text-[#1d1d1f]">{selectedIndex === quiz.answerIndex ? "맞았어요." : "조금 아쉬워요."}</strong>
          <span className="ko-body ml-1">{quiz.explanation}</span>
        </div>
      )}
    </article>
  );
}

export function MarketVoiceDetailClient() {
  const params = useParams<{ id: string }>();
  const issue = getIssueById(params.id);
  const [sheetTerm, setSheetTerm] = useState<JuriniTerm | null>(null);
  const highlightIndex = issue.translation.highlightExplanationIndex;
  const tags = uniqueTags([...issue.sectors, ...issue.companies, ...issue.keywords]);

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header />
      <InterestRail />

      <main className="mx-[100px] w-[1176px] bg-[#ffffff] pb-24 pt-8">
        <article className="w-[920px]">
          <header className="border-b border-[#e0e0e0] pb-8">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-[#c96442]">
              <BookOpenCheck className="h-4 w-4" />
              주린이 번역
            </p>
            <h1 className="ko-title mt-4 text-[34px] font-normal leading-[1.15] text-[#1d1d1f]">{issue.translation.title}</h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#f7f8fa] px-3 py-1.5 text-[13px] font-semibold text-[#7a7a7a]">{tag}</span>
              ))}
            </div>
            <p className="mt-5 text-[13px] font-medium text-[#7a7a7a]">{issue.source.name} · {issue.source.publishedAt} 발행 · {formatCollectedAt(issue.collectedAt)} 수집</p>
          </header>

          <section className="w-[760px] space-y-6 py-8">
            {issue.translation.explanation.map((paragraph, index) => (
              <ParagraphWithTerms
                key={paragraph}
                paragraph={paragraph}
                terms={issue.translation.terms}
                highlighted={highlightIndex !== null && highlightIndex === index}
                onOpenTerm={setSheetTerm}
              />
            ))}
          </section>

          <section className="w-[760px] border-t border-[#e0e0e0] py-8">
            <h2 className="text-[26px] font-semibold text-[#1d1d1f]">퀴즈</h2>
            <p className="mt-2 text-[14px] text-[#7a7a7a]">보기를 누르면 바로 채점됩니다.</p>
            <div className="mt-5 grid gap-4">
              {issue.quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
            </div>
          </section>
        </article>
      </main>
      {sheetTerm && <TermBottomSheet term={sheetTerm} onClose={() => setSheetTerm(null)} />}
    </div>
  );
}
