/**
 * 섹터 목록 상수
 *
 * 백엔드 apps/src/config/sectors.py의 SECTORS와 동기화.
 * 섹터 추가·수정 시 두 파일을 함께 수정해야 한다.
 */
import type { InterestOption } from "@/types/jangdokdae";

export const SECTOR_OPTIONS: InterestOption[] = [
  { id: "반도체",              label: "반도체",              description: "메모리, 장비, 소재" },
  { id: "자동차/모빌리티",     label: "자동차/모빌리티",     description: "완성차, 전기차, 부품" },
  { id: "2차전지",             label: "2차전지",             description: "배터리, 소재, 전기차" },
  { id: "바이오/제약",         label: "바이오/제약",         description: "제약, 임상, 헬스케어" },
  { id: "금융",                label: "금융",                description: "은행, 증권, 금리" },
  { id: "통신",                label: "통신",                description: "이동통신, 인터넷, 플랫폼" },
  { id: "에너지/화학",         label: "에너지/화학",         description: "유가, 정유, 석화" },
  { id: "조선",                label: "조선",                description: "선박, 해양플랜트" },
  { id: "방산",                label: "방산",                description: "수출, 항공우주, 국방" },
  { id: "철강/소재",           label: "철강/소재",           description: "철강, 비철금속, 소재" },
  { id: "유통/소비재",         label: "유통/소비재",         description: "유통, 식음료, 의류" },
  { id: "부동산/건설",         label: "부동산/건설",         description: "건설, 리츠, 부동산" },
  { id: "IT/소프트웨어",       label: "IT/소프트웨어",       description: "AI, SaaS, 게임" },
  { id: "엔터테인먼트/미디어", label: "엔터테인먼트/미디어", description: "K팝, 드라마, 콘텐츠" },
  { id: "기타",                label: "기타",                description: "그 외 업종" },
];
