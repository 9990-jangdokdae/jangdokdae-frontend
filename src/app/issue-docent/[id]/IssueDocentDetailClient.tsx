"use client";

import { useState } from "react";
import { BookOpenCheck, Check, ExternalLink, X } from "lucide-react";
import { Header } from "@/components/Header";
import { InterestRail } from "@/components/InterestRail";
import { AppModal } from "@/components/ui/AppModal";
import { formatIssueDocentDate, formatIssueDocentDateTime } from "@/lib/issueDocent";
import type {
  IssueDocentDetailResponse,
  IssueDocentQuiz,
  MatchedTerm,
  SectorCompanies,
} from "@/types/issueDocent";

function SectorCompaniesMeta({ groups }: { groups: SectorCompanies[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="mt-5 grid gap-3">
      {groups.map((group, groupIndex) => (
        <div
          key={`${group.sector ?? "unknown"}-${groupIndex}`}
          className="flex items-start gap-3 text-[14px]"
        >
          {group.sector && (
            <span className="mt-1 min-w-20 font-semibold text-[#1d1d1f]">{group.sector}</span>
          )}
          <div className="flex flex-wrap gap-2">
            {group.companies.map((company, companyIndex) => (
              <span
                key={`${company.name}-${companyIndex}`}
                className="rounded-full bg-[#f7f8fa] px-3 py-1.5 font-medium text-[#7a7a7a]"
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function splitParagraphByMatchedTerms(text: string, terms: MatchedTerm[]) {
  const validTerms = terms
    .filter((term) => term.start >= 0 && term.end > term.start && term.end <= text.length)
    .sort((a, b) => a.start - b.start);

  const parts: Array<{ text: string; term: MatchedTerm | null }> = [];
  let cursor = 0;

  for (const term of validTerms) {
    if (term.start < cursor) continue;
    if (term.start > cursor) {
      parts.push({ text: text.slice(cursor, term.start), term: null });
    }
    parts.push({ text: text.slice(term.start, term.end), term });
    cursor = term.end;
  }

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), term: null });
  }

  return parts.length > 0 ? parts : [{ text, term: null }];
}

function ParagraphWithTerms({
  text,
  terms,
  onOpenTerm,
}: {
  text: string;
  terms: MatchedTerm[];
  onOpenTerm: (term: MatchedTerm) => void;
}) {
  return (
    <p className="ko-body text-[17px] leading-8 text-[#1d1d1f]">
      {splitParagraphByMatchedTerms(text, terms).map((part, index) => {
        const term = part.term;

        return term ? (
          <button
            key={`${part.text}-${index}`}
            className="rounded-[4px] bg-[#fff1ec] px-1 font-semibold text-[#b65335] underline decoration-[#c96442]/45 decoration-dotted underline-offset-4 transition hover:bg-[#f7ded5] focus:outline-none focus:ring-2 focus:ring-[#c96442]/35"
            onClick={() => onOpenTerm(term)}
            type="button"
          >
            {part.text}
          </button>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        );
      })}
    </p>
  );
}

function QuizCard({ quiz }: { quiz: IssueDocentQuiz }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const answered = selectedIndex !== null;
  const selectedIsAnswer = selectedIndex === quiz.answer_index;

  return (
    <article className="rounded-lg border border-[#e0e0e0] bg-white p-6">
      <p className="text-[13px] font-semibold text-[#c96442]">
        {quiz.kind === "term" ? "용어 퀴즈" : "이슈 이해 퀴즈"}
      </p>
      <h3 className="ko-title mt-3 text-[20px] font-semibold leading-7 text-[#1d1d1f]">
        {quiz.question}
      </h3>
      <div className="mt-5 grid gap-3">
        {quiz.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isAnswer = index === quiz.answer_index;
          const stateClass = isSelected
            ? selectedIsAnswer
              ? "border-[#5db872] bg-[#effaf2] text-[#245a31]"
              : "border-[#c64545] bg-[#fff0f0] text-[#8a2b2b]"
            : answered && isAnswer
              ? "border-[#5db872] bg-[#effaf2] text-[#245a31]"
              : "border-[#e0e0e0] bg-white text-[#1d1d1f] hover:border-[#c96442]";

          return (
            <button
              key={`${quiz.quiz_id}-${option}`}
              className={`flex min-h-12 items-center justify-between rounded-lg border px-4 text-left text-[15px] font-semibold transition ${stateClass}`}
              onClick={() => setSelectedIndex(index)}
              type="button"
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
          <strong className="text-[#1d1d1f]">
            {selectedIndex === quiz.answer_index ? "맞았어요." : "조금 아쉬워요."}
          </strong>
          <span className="ko-body ml-1">{quiz.explanation}</span>
        </div>
      )}
    </article>
  );
}

export function IssueDocentDetailClient({
  issueDocent,
}: {
  issueDocent: IssueDocentDetailResponse;
}) {
  const [selectedTerm, setSelectedTerm] = useState<MatchedTerm | null>(null);
  const [showArticles, setShowArticles] = useState(false);

  return (
    <div className="min-h-screen min-w-[1376px] bg-white text-[#1d1d1f]">
      <Header activeIndex={1} />
      <InterestRail />

      <main className="mx-[100px] w-[1176px] bg-white pb-24 pt-8">
        <article className="w-[920px]">
          <header className="border-b border-[#e0e0e0] pb-8">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-[#c96442]">
              <BookOpenCheck className="h-4 w-4" />
              이슈 도슨트
            </p>
            <div className="mt-4 flex items-start justify-between gap-6">
              <h1 className="ko-title text-[34px] font-normal leading-[1.15] text-[#1d1d1f]">
                {issueDocent.title}
              </h1>
              <button
                className="mt-1 h-10 shrink-0 rounded-lg border border-[#e0e0e0] bg-white px-4 text-[14px] font-semibold text-[#1d1d1f] transition hover:border-[#c96442] hover:text-[#b65335]"
                onClick={() => setShowArticles(true)}
                type="button"
              >
                원문 보기
              </button>
            </div>
            <SectorCompaniesMeta groups={issueDocent.sector_companies} />
            <p className="mt-5 text-[13px] font-medium text-[#7a7a7a]">
              기사 {issueDocent.article_count}개 기반 ·{" "}
              {formatIssueDocentDateTime(issueDocent.created_at)}
            </p>
          </header>

          <section className="w-[760px] space-y-9 py-8">
            {issueDocent.explanation.map((section) => (
              <section key={`${section.section_type}-${section.title}`} className="space-y-5">
                <h2 className="ko-title text-[24px] font-semibold text-[#1d1d1f]">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph, index) => (
                    <ParagraphWithTerms
                      key={`${section.section_type}-${index}`}
                      onOpenTerm={setSelectedTerm}
                      terms={paragraph.matched_terms}
                      text={paragraph.text}
                    />
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className="w-[760px] border-t border-[#e0e0e0] py-8">
            <h2 className="text-[26px] font-semibold text-[#1d1d1f]">퀴즈</h2>
            <p className="mt-2 text-[14px] text-[#7a7a7a]">보기를 누르면 바로 채점됩니다.</p>
            <div className="mt-5 grid gap-4">
              {issueDocent.quizzes.map((quiz) => (
                <QuizCard key={quiz.quiz_id} quiz={quiz} />
              ))}
            </div>
          </section>
        </article>
      </main>

      {showArticles && (
        <AppModal title="원문 보기" onClose={() => setShowArticles(false)}>
          <div className="grid gap-4">
            {issueDocent.articles.map((article) => (
              <article
                key={article.article_id}
                className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-4"
              >
                <h3 className="ko-title text-[17px] font-semibold leading-6 text-[#1d1d1f]">
                  {article.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#7a7a7a]">
                  {article.press ?? "출처 미상"} · {formatIssueDocentDate(article.published_date)}
                </p>
                <a
                  className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#c96442]"
                  href={article.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  원문 열기
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </AppModal>
      )}

      {selectedTerm && (
        <AppModal title={selectedTerm.term} onClose={() => setSelectedTerm(null)}>
          <p className="text-[13px] font-semibold text-[#c96442]">{selectedTerm.category}</p>
          <p className="ko-body mt-3 text-[16px] leading-7 text-[#1d1d1f]">
            {selectedTerm.definition}
          </p>
        </AppModal>
      )}
    </div>
  );
}
