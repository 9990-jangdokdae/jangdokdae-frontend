export interface InterestOption {
  id: string;
  label: string;
  description?: string;
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

export interface BackendTerm {
  term: string;
  explanation: string;
}

export interface BackendJuriniTranslation {
  title: string;
  explanation: string[];
  highlight_explanation_index: number | null;
  terms: BackendTerm[];
}

export interface BackendQuizQuestion {
  quiz_id: string;
  kind: QuizKind;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
}

export interface BackendIssueReading {
  news_id: number | string;
  issue_id: number | string | null;
  news_title: string;
  collected_at: string;
  published_at: string;
  source_name: string;
  sector: string[];
  company: string[];
  keyword: string[];
  jurini_translation: BackendJuriniTranslation;
  analysis_sections?: AnalysisSection[];
  sidebar_context?: SidebarContext;
  quizzes: BackendQuizQuestion[];
}

export interface IssueSource {
  name: string;
  publishedAt: string;
}

export interface Issue {
  id: string;
  title: string;
  collectedAt: string;
  source: IssueSource;
  sectors: string[];
  companies: string[];
  keywords: string[];
  translation: JuriniTranslation;
  analysisSections: AnalysisSection[];
  sidebarContext: SidebarContext | null;
  quizzes: QuizQuestion[];
}

export interface User {
  id: string;
  nickname: string;
  provider: "kakao" | "google";
}
