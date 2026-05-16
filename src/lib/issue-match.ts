import type { InterestProfile, Issue } from "@/types/jangdokdae";

// 기존 관심사 기반 노출 UX를 analyzer UI 확장 이후에도 그대로 유지한다.
export function matchesInterest(issue: Issue, profile: InterestProfile) {
  return (
    issue.sectors.some((sector) => profile.sectors.includes(sector)) ||
    issue.companies.some((company) => profile.companies.includes(company))
  );
}
