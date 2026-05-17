/**
 * 섹터 목록 상수
 *
 * 백엔드 apps/src/config/sectors.py의 SECTORS와 동기화.
 * 섹터 추가·수정 시 두 파일을 함께 수정해야 한다.
 *
 * useSectors hook이 API로 전환되면 이 파일의 id 목록은 제거될 수 있다.
 */
import type { InterestOption } from "@/types/jangdokdae";

export const SECTOR_OPTIONS: InterestOption[] = [
  { id: "반도체", label: "반도체", description: "스마트폰·컴퓨터의 두뇌, 메모리·시스템 칩" },
  { id: "자동차/모빌리티", label: "자동차/모빌리티", description: "완성차·전기차·자율주행 관련 기업" },
  { id: "2차전지", label: "2차전지", description: "전기차·스마트폰에 들어가는 배터리 산업" },
  { id: "바이오/제약", label: "바이오/제약", description: "신약 개발·임상시험·의약품 제조 기업" },
  { id: "금융", label: "금융", description: "은행·증권·보험 등 돈을 다루는 산업" },
  { id: "통신", label: "통신", description: "스마트폰 통신망·인터넷 서비스 기업" },
  { id: "에너지/화학", label: "에너지/화학", description: "정유·석유화학·에너지 생산 기업" },
  { id: "조선", label: "조선", description: "LNG 운반선·컨테이너선을 건조하는 산업" },
  { id: "방산", label: "방산", description: "미사일·전투기 등 무기를 만드는 국방 산업" },
  { id: "철강/소재", label: "철강/소재", description: "건설·자동차에 쓰이는 금속·소재 기업" },
  { id: "유통/소비재", label: "유통/소비재", description: "마트·편의점·의류 등 생활소비 관련 기업" },
  { id: "부동산/건설", label: "부동산/건설", description: "아파트·인프라를 짓는 건설 기업" },
  { id: "IT/소프트웨어", label: "IT/소프트웨어", description: "AI·앱·게임·인터넷 플랫폼 기업" },
  { id: "엔터테인먼트/미디어", label: "엔터테인먼트/미디어", description: "K팝·드라마·영화 등 콘텐츠 산업" },
  { id: "기타", label: "기타", description: "위 분류에 속하지 않는 다양한 업종" },
];
