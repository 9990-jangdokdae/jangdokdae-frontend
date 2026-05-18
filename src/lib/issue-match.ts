import type { IssueDocentListItem } from "@/types/issueDocent";
import type { InterestProfile } from "@/types/jangdokdae";

export function matchesInterest(issue: IssueDocentListItem, profile: InterestProfile) {
  return (
    issue.sector_companies.some((group) => group.sector && profile.sectors.includes(group.sector)) ||
    issue.sector_companies.some((group) =>
      group.companies.some((company) => profile.companies.includes(company.name)),
    )
  );
}
