import { apiFetch } from "@/lib/api";
import type {
  AnalysisSection,
  Issue,
  JuriniTerm,
  KeyMetric,
  QuizQuestion,
  RelatedCompany,
  RelatedMarket,
  SidebarContext,
} from "@/types/jangdokdae";

interface BackendMatchedTerm {
  term: string;
  definition: string;
}

interface BackendExplanationParagraph {
  text: string;
  matched_terms: BackendMatchedTerm[];
}

interface BackendExplanationSection {
  section_type: string;
  title: string;
  paragraphs: BackendExplanationParagraph[];
}

interface BackendSourceArticle {
  article_id: string;
  title: string;
  press: string | null;
  published_date: string;
  url: string;
}

interface BackendIssueDocentQuiz {
  quiz_id: string;
  kind: "term" | "issue";
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
}

interface BackendSectorCompany {
  name: string;
}

interface BackendSectorCompanies {
  sector: string | null;
  companies: BackendSectorCompany[];
}

interface BackendIssueDocentListItem {
  id: number;
  cluster_id: number;
  title: string;
  teaser: string;
  sector_companies: BackendSectorCompanies[];
  article_count: number;
  created_at: string;
}

interface BackendIssueDocentListResponse {
  items: BackendIssueDocentListItem[];
  total: number;
  limit: number;
  offset: number;
}

interface BackendIssueDocentDetailResponse extends BackendIssueDocentListItem {
  explanation: BackendExplanationSection[];
  articles: BackendSourceArticle[];
  quizzes: BackendIssueDocentQuiz[];
}

interface BackendAnalyzerCompany {
  name: string;
  ticker?: string | null;
  sector?: string | null;
  current_price?: string | null;
  price_change_pct?: string | null;
}

interface BackendAnalyzerMarket {
  name: string;
  value?: string | null;
  change_pct?: string | null;
}

interface BackendAnalyzerMetric {
  label: string;
  value: string;
  emphasis?: string | null;
}

interface BackendAnalyzerSidebarContext {
  related_companies: BackendAnalyzerCompany[];
  related_markets: BackendAnalyzerMarket[];
  key_metrics: BackendAnalyzerMetric[];
}

interface BackendAnalyzerDetailResponse {
  cluster_id?: string | null;
  analysis_summary?: {
    analysis_sections?: AnalysisSection[];
  };
  sidebar_context?: BackendAnalyzerSidebarContext;
}

function dedupe(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

// Server analyzer 응답(snake_case)을 프론트 sidebar shape으로 맞춘다.
function mapSidebarContext(sidebar?: BackendAnalyzerSidebarContext | null): SidebarContext | null {
  if (!sidebar) return null;

  const relatedCompanies: RelatedCompany[] = (sidebar.related_companies ?? []).map((company) => ({
    name: company.name,
    ticker: company.ticker ?? undefined,
    subtitle: company.sector ?? undefined,
    currentPrice: company.current_price ?? undefined,
    priceChangePct: company.price_change_pct ?? undefined,
  }));

  const relatedMarkets: RelatedMarket[] = (sidebar.related_markets ?? []).map((market) => ({
    name: market.name,
    value: market.value ?? undefined,
    changePct: market.change_pct ?? undefined,
    summary: "",
  }));

  const keyMetrics: KeyMetric[] = (sidebar.key_metrics ?? []).map((metric) => ({
    label: metric.label,
    value: metric.value,
    emphasis: metric.emphasis ?? undefined,
  }));

  return {
    relatedCompanies,
    relatedMarkets,
    keyMetrics,
  };
}

function buildTerms(explanation: BackendExplanationSection[]): JuriniTerm[] {
  const seen = new Set<string>();
  const terms: JuriniTerm[] = [];

  for (const section of explanation) {
    for (const paragraph of section.paragraphs ?? []) {
      for (const term of paragraph.matched_terms ?? []) {
        const key = `${term.term}::${term.definition}`;
        if (seen.has(key)) continue;
        seen.add(key);
        terms.push({
          term: term.term,
          explanation: term.definition,
        });
      }
    }
  }

  return terms;
}

function mapSectorAndCompanies(sectorCompanies: BackendSectorCompanies[]) {
  const sectors = dedupe(
    sectorCompanies
      .map((item) => item.sector ?? "")
  );

  const companies = dedupe(
    sectorCompanies.flatMap((item) => item.companies.map((company) => company.name))
  );

  return { sectors, companies };
}

function mapListItemToIssue(item: BackendIssueDocentListItem): Issue {
  const { sectors, companies } = mapSectorAndCompanies(item.sector_companies);

  return {
    id: String(item.id),
    analysisClusterId: String(item.cluster_id),
    title: item.title,
    collectedAt: item.created_at,
    source: {
      name: "장독대 이슈",
      publishedAt: item.created_at,
    },
    sectors,
    companies,
    keywords: [],
    translation: {
      title: item.title,
      explanation: [item.teaser],
      highlightExplanationIndex: null,
      terms: [],
    },
    analysisSections: [],
    sidebarContext: null,
    quizzes: [],
  };
}

export async function fetchIssueDocentList(signal?: AbortSignal): Promise<Issue[]> {
  // 목록/홈은 issue-docent를 단일 소스로 쓰고, analyzer는 상세에서 cluster_id로 결합한다.
  const response = await apiFetch("/api/v1/contents/issue-docent?limit=30&offset=0", {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("issue-docent list fetch failed");
  }

  const payload = (await response.json()) as BackendIssueDocentListResponse;
  return payload.items.map(mapListItemToIssue);
}

export async function fetchIssueDocentDetail(issueDocentId: string, signal?: AbortSignal): Promise<Issue | null> {
  // 상세 기본 본문(요약/용어/퀴즈)은 issue-docent가 책임진다.
  const response = await apiFetch(`/api/v1/contents/issue-docent/${issueDocentId}`, {
    signal,
    cache: "no-store",
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("issue-docent detail fetch failed");
  }

  const payload = (await response.json()) as BackendIssueDocentDetailResponse;
  const { sectors, companies } = mapSectorAndCompanies(payload.sector_companies);
  const terms = buildTerms(payload.explanation ?? []);
  const explanation = payload.explanation.flatMap((section) =>
    (section.paragraphs ?? []).map((paragraph) => paragraph.text).filter(Boolean)
  );
  const firstArticle = payload.articles[0];

  return {
    id: String(payload.id),
    analysisClusterId: String(payload.cluster_id),
    title: payload.title,
    collectedAt: payload.created_at,
    source: {
      name: firstArticle?.press ?? "장독대 이슈",
      publishedAt: firstArticle?.published_date ?? payload.created_at,
    },
    sectors,
    companies,
    keywords: [],
    translation: {
      title: payload.title,
      explanation: explanation.length > 0 ? explanation : [payload.teaser],
      highlightExplanationIndex: null,
      terms,
    },
    analysisSections: [],
    sidebarContext: null,
    quizzes: (payload.quizzes ?? []).map(
      (quiz): QuizQuestion => ({
        id: quiz.quiz_id,
        kind: quiz.kind,
        question: quiz.question,
        options: quiz.options,
        answerIndex: quiz.answer_index,
        explanation: quiz.explanation,
      }),
    ),
  };
}

// Analyzer 전용 본문 섹션과 초기 sidebar는 cluster_id 기준으로 별도 조회한다.
export async function fetchAnalyzerDetail(
  clusterId: string,
  signal?: AbortSignal,
): Promise<{
  analysisSections: AnalysisSection[];
  sidebarContext: SidebarContext | null;
}> {
  const response = await apiFetch(`/api/v1/analysis/detail/${clusterId}`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("analyzer detail fetch failed");
  }

  const payload = (await response.json()) as BackendAnalyzerDetailResponse;
  return {
    analysisSections: payload.analysis_summary?.analysis_sections ?? [],
    sidebarContext: mapSidebarContext(payload.sidebar_context),
  };
}
