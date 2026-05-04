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
  quizzes: QuizQuestion[];
}
