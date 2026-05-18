import type { AnalysisSection } from "@/types/jangdokdae";

export interface AnalyzerCompanyResponse {
  name: string;
  ticker?: string | null;
  sector?: string | null;
  current_price?: string | null;
  price_change_pct?: string | null;
}

export interface AnalyzerMarketResponse {
  name: string;
  value?: string | null;
  change_pct?: string | null;
  summary?: string | null;
}

export interface AnalyzerMetricResponse {
  label: string;
  value: string;
  emphasis?: string | null;
}

export interface AnalyzerSidebarContextResponse {
  related_companies: AnalyzerCompanyResponse[];
  related_markets: AnalyzerMarketResponse[];
  key_metrics: AnalyzerMetricResponse[];
}

export interface AnalyzerDetailResponse {
  cluster_id?: string | null;
  analysis_summary?: {
    analysis_sections?: AnalysisSection[];
  };
  sidebar_context?: AnalyzerSidebarContextResponse;
}
