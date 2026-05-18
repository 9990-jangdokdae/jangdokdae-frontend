import { apiFetch, apiFetchJson } from "@/lib/api";
import type {
  IssueDocentDetailResponse,
  IssueDocentListResponse,
} from "@/types/issueDocent";
import type {
  AnalysisSection,
  Issue,
  KeyMetric,
  QuizQuestion,
  RelatedCompany,
  RelatedMarket,
  SidebarContext,
} from "@/types/jangdokdae";

export const issueDocentListPath = "/api/v1/contents/issue-docent";

export function issueDocentDetailPath(id: string | number) {
  return `/api/v1/contents/issue-docent/${id}`;
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

export async function getIssueDocents(params: { limit?: number; offset?: number } = {}) {
  const limit = params.limit ?? 20;
  const offset = params.offset ?? 0;
  const searchParams = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  return apiFetchJson<IssueDocentListResponse>(
    `${issueDocentListPath}?${searchParams.toString()}`,
    { cache: "no-store" },
  );
}

export async function getIssueDocent(id: string | number) {
  return apiFetchJson<IssueDocentDetailResponse>(issueDocentDetailPath(id), {
    cache: "no-store",
  });
}

function dedupe(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

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

function mapSectorAndCompanies(groups: IssueDocentDetailResponse["sector_companies"]) {
  return {
    sectors: dedupe(groups.map((group) => group.sector ?? "")),
    companies: dedupe(groups.flatMap((group) => group.companies.map((company) => company.name))),
  };
}

function buildTerms(explanation: IssueDocentDetailResponse["explanation"]) {
  const seen = new Set<string>();
  const terms: Issue["translation"]["terms"] = [];

  for (const section of explanation ?? []) {
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

function mapListItemToIssue(item: IssueDocentListResponse["items"][number]): Issue {
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

function mapDetailToIssue(payload: IssueDocentDetailResponse): Issue {
  const { sectors, companies } = mapSectorAndCompanies(payload.sector_companies);
  const terms = buildTerms(payload.explanation ?? []);
  const explanation = payload.explanation.flatMap((section) =>
    (section.paragraphs ?? []).map((paragraph) => paragraph.text).filter(Boolean),
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

export async function fetchIssueDocentList(signal?: AbortSignal): Promise<Issue[]> {
  const response = await apiFetch(`${issueDocentListPath}?limit=30&offset=0`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("issue-docent list fetch failed");
  }

  const payload = (await response.json()) as IssueDocentListResponse;
  return payload.items.map(mapListItemToIssue);
}

export async function fetchIssueDocentDetail(issueDocentId: string, signal?: AbortSignal): Promise<Issue | null> {
  const response = await apiFetch(issueDocentDetailPath(issueDocentId), {
    signal,
    cache: "no-store",
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("issue-docent detail fetch failed");
  }

  const payload = (await response.json()) as IssueDocentDetailResponse;
  return mapDetailToIssue(payload);
}

// analyzer 상세 결합용 fetch다.
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

export function formatIssueDocentDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatIssueDocentDateTime(value: string) {
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
