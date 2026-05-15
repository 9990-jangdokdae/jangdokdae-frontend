import { apiFetchJson } from "@/lib/api";
import type {
  IssueDocentDetailResponse,
  IssueDocentListResponse,
} from "@/types/issueDocent";

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
