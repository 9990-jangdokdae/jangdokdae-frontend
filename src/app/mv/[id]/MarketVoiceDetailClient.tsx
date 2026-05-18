"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Activity, BookOpenCheck, Check, Cpu, Gamepad2, X } from "lucide-react";
import { InterestRail } from "@/components/InterestRail";
import { Header } from "@/components/Header";
import { fetchAnalyzerDetail, fetchIssueDocentDetail } from "@/lib/issue-docent";
import { apiFetch } from "@/lib/api";
import type {
  AnalysisSection,
  JuriniTerm,
  KeyMetric,
  QuizQuestion,
  RelatedCompany,
  RelatedMarket,
} from "@/types/jangdokdae";

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

function InlineTermsText({
  text,
  terms,
  onOpenTerm,
  className,
}: {
  text: string;
  terms: JuriniTerm[];
  onOpenTerm: (term: JuriniTerm) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {splitParagraphByTerms(text, terms).map((part, index) => (
        part.term ? (
          <TermTooltip key={`${part.text}-${index}`} term={part.term} onOpen={onOpenTerm} />
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        )
      ))}
    </div>
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

function AnalysisCard({
  section,
  terms,
  onOpenTerm,
}: {
  section: AnalysisSection;
  terms: JuriniTerm[];
  onOpenTerm: (term: JuriniTerm) => void;
}) {
  return (
    <article className="rounded-[22px] border border-[#eceef2] bg-white px-7 py-6 shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
      <h2 className="ko-title text-[26px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">{section.title}</h2>
      <InlineTermsText
        text={section.summary}
        terms={terms}
        onOpenTerm={onOpenTerm}
        className="ko-body mt-4 text-[16px] leading-8 text-[#35363a]"
      />
    </article>
  );
}

function RelatedCompanyItem({ company }: { company: RelatedCompany }) {
  return (
    <div className="rounded-[18px] border border-[#eef1f5] bg-[#fbfcfd] px-4 py-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-[#1d1d1f]">{company.name}</p>
          {(company.ticker || company.subtitle) && (
            <p className="mt-0.5 break-keep text-[12px] leading-5 text-[#7a7a7a]">
              {[company.ticker, company.subtitle].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {(company.currentPrice || company.priceChangePct) && (
          <div className="shrink-0 text-right">
            {company.currentPrice && <p className="whitespace-nowrap text-[14px] font-semibold text-[#1d1d1f]">{company.currentPrice}</p>}
            {company.priceChangePct && <p className="mt-0.5 whitespace-nowrap text-[12px] font-semibold text-[#2d6cdf]">{company.priceChangePct}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricItem({
  metric,
  terms,
  onOpenTerm,
}: {
  metric: KeyMetric;
  terms: JuriniTerm[];
  onOpenTerm: (term: JuriniTerm) => void;
}) {
  return (
    <div className="rounded-[18px] border border-[#eef1f5] bg-[#ffffff] px-4 py-2.5">
      <p className="text-[12px] font-semibold text-[#7a7a7a]">{metric.label}</p>
      <p className="mt-1 text-[17px] font-semibold text-[#1d1d1f]">{metric.value}</p>
      {metric.emphasis && (
        <InlineTermsText
          text={metric.emphasis}
          terms={terms}
          onOpenTerm={onOpenTerm}
          className="mt-0.5 text-[12px] font-medium leading-5 text-[#2d6cdf]"
        />
      )}
    </div>
  );
}

function getMarketIcon(name: string) {
  if (name.includes("게임")) return Gamepad2;
  if (name.includes("반도체")) return Cpu;
  return Activity;
}

function MarketItem({
  market,
  terms,
  onOpenTerm,
}: {
  market: RelatedMarket;
  terms: JuriniTerm[];
  onOpenTerm: (term: JuriniTerm) => void;
}) {
  const Icon = getMarketIcon(market.name);
  return (
    <div className="rounded-[20px] border border-[#e8eef9] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 shadow-[0_8px_24px_rgba(45,108,223,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#edf4ff] text-[#2d6cdf]">
            <Icon className="h-4 w-4" />
          </span>
          <p className="text-[12px] font-bold tracking-[0.08em] text-[#2d6cdf] uppercase">{market.name}</p>
        </div>
        {(market.value || market.changePct) && (
          <div className="shrink-0 text-right">
            {market.value && <p className="whitespace-nowrap text-[15px] font-semibold text-[#1d1d1f]">{market.value}</p>}
            {market.changePct && <p className="mt-1 whitespace-nowrap text-[13px] font-bold text-[#2d6cdf]">{market.changePct}</p>}
          </div>
        )}
      </div>
      <InlineTermsText
        text={market.summary}
        terms={terms}
        onOpenTerm={onOpenTerm}
        className="ko-body mt-2 text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[#1f2430]"
      />
    </div>
  );
}

function SidebarCard({
  companies,
  markets,
  metrics,
  terms,
  onOpenTerm,
}: {
  companies: RelatedCompany[];
  markets: RelatedMarket[];
  metrics: KeyMetric[];
  terms: JuriniTerm[];
  onOpenTerm: (term: JuriniTerm) => void;
}) {
  const motionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = motionRef.current;
    if (!element) return;

    let frameId = 0;
    let currentOffset = 0;
    let targetOffset = 0;
    let lastScrollY = window.scrollY;

    const applyStyles = (offset: number) => {
      const lift = Math.abs(offset);
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
      element.style.boxShadow = `0 ${12 + lift * 1.8}px ${36 + lift * 4}px rgba(20,20,19,${0.05 + lift * 0.006})`;
    };

    const settle = () => {
      currentOffset += (targetOffset - currentOffset) * 0.16;
      targetOffset *= 0.86;
      applyStyles(currentOffset);

      if (Math.abs(currentOffset) > 0.1 || Math.abs(targetOffset) > 0.1) {
        frameId = window.requestAnimationFrame(settle);
      } else {
        currentOffset = 0;
        targetOffset = 0;
        applyStyles(0);
        frameId = 0;
      }
    };

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const delta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      targetOffset = Math.max(-6, Math.min(6, delta * 0.18));

      if (!frameId) {
        frameId = window.requestAnimationFrame(settle);
      }
    };

    applyStyles(0);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="sticky top-24 w-[410px] self-start">
      <div
        ref={motionRef}
        className="space-y-3 rounded-[28px] border border-[#e8ebf0] bg-white px-4 py-4 will-change-transform"
      >
        <section>
          <div className="grid gap-2.5">
            {companies.map((company) => <RelatedCompanyItem key={`${company.name}-${company.ticker ?? ""}`} company={company} />)}
          </div>
        </section>

        <section className="border-t border-[#eef1f5] pt-3.5">
          <div className="grid gap-2.5">
            {markets.map((market) => (
              <MarketItem
                key={`${market.name}-${market.summary}`}
                market={market}
                terms={terms}
                onOpenTerm={onOpenTerm}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-[#eef1f5] pt-3.5">
          <div className="grid gap-2.5">
            {metrics.map((metric) => (
              <MetricItem
                key={`${metric.label}-${metric.value}`}
                metric={metric}
                terms={terms}
                onOpenTerm={onOpenTerm}
              />
            ))}
          </div>
        </section>

      </div>
    </aside>
  );
}

export function MarketVoiceDetailClient() {
  const params = useParams<{ id: string }>();
  const [issue, setIssue] = useState<null | {
    id: string;
    analysisClusterId?: string | null;
    title: string;
    collectedAt: string;
    source: { name: string; publishedAt: string };
    sectors: string[];
    companies: string[];
    keywords: string[];
    translation: {
      title: string;
      explanation: string[];
      highlightExplanationIndex: number | null;
      terms: JuriniTerm[];
    };
    analysisSections: AnalysisSection[];
    sidebarContext: {
      relatedCompanies: RelatedCompany[];
      relatedMarkets: RelatedMarket[];
      keyMetrics: KeyMetric[];
    } | null;
    quizzes: QuizQuestion[];
  }>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sheetTerm, setSheetTerm] = useState<JuriniTerm | null>(null);
  const [sidebarContext, setSidebarContext] = useState<{
    relatedCompanies: RelatedCompany[];
    relatedMarkets: RelatedMarket[];
    keyMetrics: KeyMetric[];
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadIssue = async () => {
      try {
        setIsLoading(true);
        // issue-docent 상세를 먼저 읽고, analyzer는 cluster_id 기준으로 뒤에서 결합한다.
        const nextIssue = await fetchIssueDocentDetail(params.id, controller.signal);
        if (!nextIssue) {
          setIssue(null);
          setSidebarContext(null);
          return;
        }

        setIssue(nextIssue);
        setSidebarContext(nextIssue.sidebarContext);

        const clusterId = nextIssue.analysisClusterId;
        if (!clusterId) return;

        // 본문 분석 섹션과 live sidebar를 분리해서 붙여,
        // 기존 요약/퀴즈 흐름을 건드리지 않고 analyzer만 확장한다.
        const [analysisResult, sidebarResponse] = await Promise.allSettled([
          fetchAnalyzerDetail(clusterId, controller.signal),
          apiFetch(`/api/v1/analysis/sidebar-context/${clusterId}`, {
            signal: controller.signal,
            cache: "no-store",
          }),
        ]);

        if (analysisResult.status === "fulfilled") {
          setIssue((current) =>
            current
              ? {
                  ...current,
                  analysisSections: analysisResult.value.analysisSections,
                  sidebarContext: analysisResult.value.sidebarContext ?? current.sidebarContext,
                }
              : current,
          );
          if (analysisResult.value.sidebarContext) {
            setSidebarContext(analysisResult.value.sidebarContext);
          }
        }

        if (sidebarResponse.status === "fulfilled" && sidebarResponse.value.ok) {
          const payload = await sidebarResponse.value.json();
          const liveRelatedCompanies = (payload?.related_companies ?? []).map((company: { name: string; ticker?: string; subtitle?: string; sector?: string; current_price?: string; currentPrice?: string; price_change_pct?: string; priceChangePct?: string }) => ({
            name: company.name,
            ticker: company.ticker,
            subtitle: company.subtitle ?? company.sector,
            currentPrice: company.current_price ?? company.currentPrice,
            priceChangePct: company.price_change_pct ?? company.priceChangePct,
          }));
          const liveRelatedMarkets = (payload?.related_markets ?? []).map((market: { name: string; value?: string; change_pct?: string; changePct?: string; summary?: string }) => ({
            name: market.name,
            value: market.value,
            changePct: market.change_pct ?? market.changePct,
            summary: market.summary ?? "",
          }));
          const liveMetrics = (payload?.key_metrics ?? []).map((metric: KeyMetric) => ({
            label: metric.label,
            value: metric.value,
            emphasis: metric.emphasis,
          }));

          // 초기 sidebarContext가 없어도 live 응답만으로 바로 렌더될 수 있게 유지한다.
          setSidebarContext((current) => ({
            relatedCompanies: liveRelatedCompanies.length > 0 ? liveRelatedCompanies : (current?.relatedCompanies ?? []),
            relatedMarkets:
              liveRelatedMarkets.length > 0
                ? liveRelatedMarkets.map((market: RelatedMarket) => ({
                    ...market,
                    summary:
                      market.summary
                      || current?.relatedMarkets.find((item: RelatedMarket) => item.name === market.name)?.summary
                      || "",
                  }))
                : (current?.relatedMarkets ?? []),
            keyMetrics: liveMetrics.length > 0 ? liveMetrics : (current?.keyMetrics ?? []),
          }));
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadIssue();

    return () => controller.abort();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
        <Header activeIndex={1} />
        <InterestRail />
        <main className="mx-[120px] w-[920px] bg-[#ffffff] pb-24 pt-16">
          <section className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-8">
            <p className="text-[13px] font-semibold text-[#c96442]">불러오는 중</p>
            <h1 className="ko-title mt-3 text-[30px] font-semibold leading-[1.25] text-[#1d1d1f]">이슈 상세를 불러오고 있어요.</h1>
          </section>
        </main>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
        <Header activeIndex={1} />
        <InterestRail />
        <main className="mx-[120px] w-[920px] bg-[#ffffff] pb-24 pt-16">
          <section className="rounded-lg border border-[#e0e0e0] bg-[#fbfcfd] p-8">
            <p className="text-[13px] font-semibold text-[#c96442]">이슈를 찾을 수 없습니다</p>
            <h1 className="ko-title mt-3 text-[30px] font-semibold leading-[1.25] text-[#1d1d1f]">요청한 뉴스 ID에 해당하는 독해가 없어요.</h1>
            <p className="ko-body mt-3 text-[15px] leading-6 text-[#7a7a7a]">현재 상세 URL은 백엔드의 news_id를 기준으로 연결됩니다.</p>
            <Link className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#1d1d1f] px-4 text-[14px] font-semibold text-white" href="/mv">
              이슈 목록으로 이동
            </Link>
          </section>
        </main>
      </div>
    );
  }

  const highlightIndex = issue.translation.highlightExplanationIndex;
  const tags = uniqueTags([...issue.sectors, ...issue.companies, ...issue.keywords]);

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header activeIndex={1} />
      <InterestRail />

      <main className="mx-[100px] w-[1220px] bg-[#ffffff] pb-24 pt-8">
        <div className="flex items-start gap-10">
        <article className="w-[770px]">
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

          <section className="w-full space-y-6 py-8">
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

          {issue.analysisSections.length > 0 && (
            <section className="w-full border-t border-[#e0e0e0] py-8">
              <div className="grid gap-5">
                {issue.analysisSections.map((section) => (
                  <AnalysisCard
                    key={section.title}
                    section={section}
                    terms={issue.translation.terms}
                    onOpenTerm={setSheetTerm}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="w-full border-t border-[#e0e0e0] py-8">
            <h2 className="text-[26px] font-semibold text-[#1d1d1f]">퀴즈</h2>
            <p className="mt-2 text-[14px] text-[#7a7a7a]">보기를 누르면 바로 채점됩니다.</p>
            <div className="mt-5 grid gap-4">
              {issue.quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
            </div>
          </section>
        </article>
        {sidebarContext && (
          <SidebarCard
            companies={sidebarContext.relatedCompanies}
            markets={sidebarContext.relatedMarkets}
            metrics={sidebarContext.keyMetrics}
            terms={issue.translation.terms}
            onOpenTerm={setSheetTerm}
          />
        )}
        </div>
      </main>
      {sheetTerm && <TermBottomSheet term={sheetTerm} onClose={() => setSheetTerm(null)} />}
    </div>
  );
}
