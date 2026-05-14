/**
 * 섹터별 대표 종목 상수
 *
 * 온보딩 및 관심 종목 선택에 사용되는 큐레이션 목록.
 * 종목 추가·수정 시 이 파일만 편집한다.
 */
import type { InterestOption } from "@/types/jangdokdae";

export const COMPANY_OPTIONS: InterestOption[] = [
  // 반도체
  { id: "삼성전자",          label: "삼성전자",          description: "반도체" },
  { id: "SK하이닉스",        label: "SK하이닉스",        description: "반도체" },
  // 자동차/모빌리티
  { id: "현대차",            label: "현대차",            description: "자동차/모빌리티" },
  { id: "기아",              label: "기아",              description: "자동차/모빌리티" },
  // 2차전지
  { id: "LG에너지솔루션",    label: "LG에너지솔루션",    description: "2차전지" },
  { id: "삼성SDI",           label: "삼성SDI",           description: "2차전지" },
  // 바이오/제약
  { id: "셀트리온",          label: "셀트리온",          description: "바이오/제약" },
  { id: "삼성바이오로직스",  label: "삼성바이오로직스",  description: "바이오/제약" },
  // 금융
  { id: "KB금융",            label: "KB금융",            description: "금융" },
  { id: "신한지주",          label: "신한지주",          description: "금융" },
  // 통신
  { id: "SK텔레콤",          label: "SK텔레콤",          description: "통신" },
  { id: "KT",                label: "KT",                description: "통신" },
  // 에너지/화학
  { id: "LG화학",            label: "LG화학",            description: "에너지/화학" },
  { id: "롯데케미칼",        label: "롯데케미칼",        description: "에너지/화학" },
  // 조선
  { id: "HD한국조선해양",    label: "HD한국조선해양",    description: "조선" },
  { id: "한화오션",          label: "한화오션",          description: "조선" },
  // 방산
  { id: "한화에어로스페이스", label: "한화에어로스페이스", description: "방산" },
  { id: "LIG넥스원",         label: "LIG넥스원",         description: "방산" },
  // 철강/소재
  { id: "POSCO홀딩스",       label: "POSCO홀딩스",       description: "철강/소재" },
  { id: "현대제철",          label: "현대제철",          description: "철강/소재" },
  // 유통/소비재
  { id: "이마트",            label: "이마트",            description: "유통/소비재" },
  { id: "롯데쇼핑",          label: "롯데쇼핑",          description: "유통/소비재" },
  // 부동산/건설
  { id: "현대건설",          label: "현대건설",          description: "부동산/건설" },
  { id: "GS건설",            label: "GS건설",            description: "부동산/건설" },
  // IT/소프트웨어
  { id: "NAVER",             label: "NAVER",             description: "IT/소프트웨어" },
  { id: "카카오",            label: "카카오",            description: "IT/소프트웨어" },
  // 엔터테인먼트/미디어
  { id: "HYBE",              label: "HYBE",              description: "엔터테인먼트/미디어" },
  { id: "SM엔터테인먼트",    label: "SM엔터테인먼트",    description: "엔터테인먼트/미디어" },
];
