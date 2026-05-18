export interface InterestOption {
  id: string;
  label: string;
  description?: string;
  sector?: string;
}

export interface InterestProfile {
  sectors: string[];
  companies: string[];
}

export interface JuriniTerm {
  term: string;
  explanation: string;
}

export interface JuriniTranslation {
  title: string;
  explanation: string[];
  highlightExplanationIndex: number | null;
  terms: JuriniTerm[];
}

export type QuizKind = "term" | "issue";

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface AnalysisSection {
  title: string;
  summary: string;
}

export interface RelatedCompany {
  name: string;
  ticker?: string;
  subtitle?: string;
  currentPrice?: string;
  priceChangePct?: string;
}

export interface RelatedMarket {
  name: string;
  value?: string;
  changePct?: string;
  summary: string;
}

export interface KeyMetric {
  label: string;
  value: string;
  emphasis?: string;
}

export interface SidebarContext {
  relatedCompanies: RelatedCompany[];
  relatedMarkets: RelatedMarket[];
  keyMetrics: KeyMetric[];
}

export interface IssueSource {
  name: string;
  publishedAt: string;
}

export interface Issue {
  id: string;
  // Analyzer 상세/사이드바는 issue id가 아니라 cluster_id를 기준으로 조회한다.
  analysisClusterId?: string | null;
  title: string;
  collectedAt: string;
  source: IssueSource;
  sectors: string[];
  companies: string[];
  keywords: string[];
  translation: JuriniTranslation;
  // 요약 본문 아래에 붙는 analyzer 본문 섹션들이다.
  analysisSections: AnalysisSection[];
  // 우측 analyzer 사이드바에 쓰이는 보조 데이터다.
  sidebarContext: SidebarContext | null;
  quizzes: QuizQuestion[];
}

export interface User {
  id: string;
  nickname: string;
  provider: "kakao" | "google";
}
