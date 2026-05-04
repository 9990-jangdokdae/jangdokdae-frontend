# Frontend Data Contract Notes

This document describes the temporary response shape currently expected by the
Jangdokdae frontend MVP.

The source of truth for the final API response and LLM output schema belongs to
the backend/data repositories. This note is a frontend consumer reference only.

## Issue Detail Payload

The issue detail UI currently expects an issue-like object with metadata,
translated beginner-friendly content, terms, and quizzes.

```ts
interface Issue {
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
```

## Jurini Translation

`explanation` remains a string array to stay close to the current PoC output.
The highlighted paragraph is selected by `highlightExplanationIndex`.

```ts
interface JuriniTranslation {
  title: string;
  explanation: string[];
  highlightExplanationIndex: number | null;
  terms: JuriniTerm[];
}
```

### Highlight Rule

`highlightExplanationIndex` is the 0-based index of the most important paragraph
inside `explanation`.

- Use at most one highlighted paragraph.
- Use `null` when no paragraph is clearly worth highlighting.
- Prefer the paragraph that contains the core market reaction, the key cause,
  or the link between the issue and affected companies/sectors.
- Do not highlight simple background, source attribution, or secondary outlook.

## Quiz

The MVP uses two multiple-choice questions per issue: one term quiz and one
issue-understanding quiz.

```ts
interface QuizQuestion {
  id: string;
  kind: "term" | "issue";
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
```

`explanation` in `QuizQuestion` means the answer explanation shown after the
user selects an option.
