import { SECTOR_OPTIONS } from "@/constants/sectors";
import type { InterestOption } from "@/types/jangdokdae";

// TODO: GET /api/v1/sectors 엔드포인트가 준비되면 fetch로 교체
export function useSectors(): InterestOption[] {
  return SECTOR_OPTIONS;
}
