import { apiFetch, apiFetchJson } from "@/lib/api";
import type {
  AnalyzerDetailResponse,
  AnalyzerSidebarContextResponse,
} from "@/types/analyzer";
import type {
  IssueDocentDetailResponse,
  IssueDocentListResponse,
} from "@/types/issueDocent";
import type {
  AnalysisSection,
  KeyMetric,
  RelatedCompany,
  RelatedMarket,
  SidebarContext,
} from "@/types/jangdokdae";

export const issueDocentListPath = "/api/v1/contents/issue-docent";

export function issueDocentDetailPath(id: string | number) {
  return `/api/v1/contents/issue-docent/${id}`;
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

function mapSidebarContext(
  sidebar?: AnalyzerSidebarContextResponse | null,
  currentSidebar?: SidebarContext | null,
): SidebarContext | null {
  if (!sidebar) return null;

  const currentMarketSummaries = new Map(
    (currentSidebar?.relatedMarkets ?? []).map((market) => [market.name, market.summary]),
  );

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
    summary: market.summary ?? currentMarketSummaries.get(market.name) ?? "",
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

  const payload = (await response.json()) as AnalyzerDetailResponse;
  return {
    analysisSections: payload.analysis_summary?.analysis_sections ?? [],
    sidebarContext: mapSidebarContext(payload.sidebar_context),
  };
}

// cluster_id로 analyzer 사이드바 데이터를 가져와 현재 값과 병합한다.
export async function fetchAnalyzerSidebarContext(
  clusterId: string,
  signal?: AbortSignal,
  currentSidebar?: SidebarContext | null,
): Promise<SidebarContext | null> {
  const response = await apiFetch(`/api/v1/analysis/sidebar-context/${clusterId}`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("analyzer sidebar fetch failed");
  }

  const payload = (await response.json()) as AnalyzerSidebarContextResponse;
  return mapSidebarContext(payload, currentSidebar);
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
