import type { InterestProfile } from "@/types/jangdokdae";

export { SECTOR_OPTIONS as sectorOptions } from "@/constants/sectors";
export { COMPANY_OPTIONS as companyOptions } from "@/constants/companies";

export const interestStorageKey = "jangdokdae.interest-profile.v1";

export const defaultInterestProfile: InterestProfile = {
  sectors: [],
  companies: [],
};

export const ONBOARDING_INITIAL_PROFILE: InterestProfile = {
  sectors: ["반도체"],
  companies: ["삼성전자", "SK하이닉스"],
};
