/**
 * 섹터별 대표 종목 상수
 *
 * 온보딩 및 관심 종목 선택에 사용되는 큐레이션 목록.
 * 종목 추가·수정 시 이 파일만 편집한다.
 */
import type { InterestOption } from "@/types/jangdokdae";

export const COMPANY_OPTIONS: InterestOption[] = [
  // 반도체
  { id: "삼성전자", label: "삼성전자", sector: "반도체", description: "갤럭시 스마트폰·반도체를 만드는 세계 최대 전자회사" },
  { id: "SK하이닉스", label: "SK하이닉스", sector: "반도체", description: "HBM·D램 메모리 반도체 전문 기업" },
  { id: "한미반도체", label: "한미반도체", sector: "반도체", description: "HBM 적층에 쓰이는 반도체 장비 전문 기업" },
  { id: "DB하이텍", label: "DB하이텍", sector: "반도체", description: "8인치 파운드리 전문, 전력반도체 강자" },
  { id: "이오테크닉스", label: "이오테크닉스", sector: "반도체", description: "레이저 마킹·다이싱 반도체 장비 제조사" },

  // 자동차/모빌리티
  { id: "현대차", label: "현대차", sector: "자동차/모빌리티", description: "쏘나타·아이오닉 등을 만드는 국내 1위 완성차 제조사" },
  { id: "기아", label: "기아", sector: "자동차/모빌리티", description: "K5·EV6 등을 만드는 완성차, 현대차그룹 계열" },
  { id: "현대모비스", label: "현대모비스", sector: "자동차/모빌리티", description: "전동화 부품·자율주행 시스템을 공급하는 부품사" },
  { id: "HL만도", label: "HL만도", sector: "자동차/모빌리티", description: "제동·조향·ADAS 부품을 공급하는 자동차 부품사" },

  // 2차전지
  { id: "LG에너지솔루션", label: "LG에너지솔루션", sector: "2차전지", description: "전기차 배터리 세계 2위 제조사" },
  { id: "삼성SDI", label: "삼성SDI", sector: "2차전지", description: "전기차·IT기기용 배터리 전문 기업" },
  { id: "에코프로비엠", label: "에코프로비엠", sector: "2차전지", description: "양극재 국내 1위, 전기차 배터리 핵심 소재 제조" },
  { id: "포스코퓨처엠", label: "포스코퓨처엠", sector: "2차전지", description: "양극재·음극재를 생산하는 배터리 소재 기업" },
  { id: "엘앤에프", label: "엘앤에프", sector: "2차전지", description: "하이니켈 양극재 전문, 테슬라·LG에너지솔루션 공급사" },

  // 바이오/제약
  { id: "셀트리온", label: "셀트리온", sector: "바이오/제약", description: "바이오시밀러(복제 항체 의약품) 개발·판매 기업" },
  { id: "삼성바이오로직스", label: "삼성바이오로직스", sector: "바이오/제약", description: "글로벌 바이오의약품 위탁 생산(CMO) 세계 1위" },
  { id: "한미약품", label: "한미약품", sector: "바이오/제약", description: "비만·당뇨 치료제 개발로 글로벌 시장 공략 중" },
  { id: "유한양행", label: "유한양행", sector: "바이오/제약", description: "렉라자(폐암 표적치료제) 개발로 주목받는 제약사" },
  { id: "녹십자", label: "녹십자", sector: "바이오/제약", description: "혈액제제·백신 전문 제약사" },

  // 금융
  { id: "KB금융", label: "KB금융", sector: "금융", description: "KB국민은행을 보유한 국내 최대 금융그룹" },
  { id: "신한지주", label: "신한지주", sector: "금융", description: "신한은행·카드·증권을 아우르는 금융 지주사" },
  { id: "하나금융지주", label: "하나금융지주", sector: "금융", description: "하나은행·하나증권을 보유한 금융 지주사" },
  { id: "우리금융지주", label: "우리금융지주", sector: "금융", description: "우리은행 중심의 금융 지주사" },
  { id: "삼성생명", label: "삼성생명", sector: "금융", description: "국내 최대 생명보험사, 삼성금융 계열의 핵심" },

  // 통신
  { id: "SK텔레콤", label: "SK텔레콤", sector: "통신", description: "5G 이동통신 국내 1위, AI·구독 사업 확장 중" },
  { id: "KT", label: "KT", sector: "통신", description: "유·무선 통신과 기업 IT 서비스를 제공하는 통신사" },
  { id: "LG유플러스", label: "LG유플러스", sector: "통신", description: "이동통신 3위, 콘텐츠·B2B 사업 강화 중" },

  // 에너지/화학
  { id: "LG화학", label: "LG화학", sector: "에너지/화학", description: "석유화학·배터리 소재를 만드는 화학 대기업" },
  { id: "SK이노베이션", label: "SK이노베이션", sector: "에너지/화학", description: "정유·화학·배터리를 아우르는 종합 에너지 기업" },
  { id: "에쓰오일", label: "에쓰오일", sector: "에너지/화학", description: "사우디 아람코 계열 정유·석유화학 기업" },
  { id: "한화솔루션", label: "한화솔루션", sector: "에너지/화학", description: "태양광·화학을 아우르는 한화그룹 화학 계열사" },
  { id: "한국전력", label: "한국전력", sector: "에너지/화학", description: "전국 전력망을 운영하는 국내 유일의 전력 공기업" },

  // 조선
  { id: "HD한국조선해양", label: "HD한국조선해양", sector: "조선", description: "LNG 운반선·컨테이너선 건조 세계 1위 조선사" },
  { id: "한화오션", label: "한화오션", sector: "조선", description: "방산 특수선·LNG선 제조, 구 대우조선해양" },
  { id: "삼성중공업", label: "삼성중공업", sector: "조선", description: "LNG·드릴십 등 고부가 선박 전문 조선사" },
  { id: "HD현대중공업", label: "HD현대중공업", sector: "조선", description: "엔진·해양설비까지 아우르는 종합 중공업사" },
  { id: "현대미포조선", label: "현대미포조선", sector: "조선", description: "중형 선박 건조 특화, HD현대 계열 조선사" },

  // 방산
  { id: "한화에어로스페이스", label: "한화에어로스페이스", sector: "방산", description: "항공기 엔진·K9 자주포 등을 만드는 방산 대기업" },
  { id: "LIG넥스원", label: "LIG넥스원", sector: "방산", description: "유도탄·전자전 시스템 등 방산 전문 중견기업" },
  { id: "현대로템", label: "현대로템", sector: "방산", description: "K2 전차·자주포 및 철도 차량 제조사" },
  { id: "한국항공우주", label: "한국항공우주", sector: "방산", description: "FA-50 경공격기·수리온 헬기를 만드는 항공방산사" },
  { id: "한화시스템", label: "한화시스템", sector: "방산", description: "레이더·전자전·위성통신 방산 전자 전문 기업" },

  // 철강/소재
  { id: "POSCO홀딩스", label: "POSCO홀딩스", sector: "철강/소재", description: "국내 최대 철강사, 배터리 소재로 사업 전환 중" },
  { id: "현대제철", label: "현대제철", sector: "철강/소재", description: "자동차·건설용 철강재 제조, 현대차그룹 계열" },
  { id: "고려아연", label: "고려아연", sector: "철강/소재", description: "아연·은·인듐 제련 세계 1위, 이차전지 소재 진출" },
  { id: "동국제강", label: "동국제강", sector: "철강/소재", description: "후판·형강 중심의 철강 전문 기업" },
  { id: "풍산", label: "풍산", sector: "철강/소재", description: "동(구리) 압연·방산 탄약을 생산하는 소재 기업" },

  // 유통/소비재
  { id: "이마트", label: "이마트", sector: "유통/소비재", description: "대형마트와 SSG닷컴을 운영하는 국내 최대 유통사" },
  { id: "CJ제일제당", label: "CJ제일제당", sector: "유통/소비재", description: "햇반·비비고 등 식품과 바이오 사업을 보유한 기업" },
  { id: "아모레퍼시픽", label: "아모레퍼시픽", sector: "유통/소비재", description: "설화수·이니스프리 등 K뷰티를 대표하는 화장품사" },
  { id: "오뚜기", label: "오뚜기", sector: "유통/소비재", description: "라면·케첩·마요네즈 등 가정 식품 전문 기업" },
  { id: "KT&G", label: "KT&G", sector: "유통/소비재", description: "담배·홍삼 제조·수출, 고배당 우량주로 유명" },

  // 부동산/건설
  { id: "현대건설", label: "현대건설", sector: "부동산/건설", description: "아파트·해외 플랜트를 짓는 국내 1위 건설사" },
  { id: "GS건설", label: "GS건설", sector: "부동산/건설", description: "자이 아파트 브랜드로 유명한 건설·인프라 기업" },
  { id: "DL이앤씨", label: "DL이앤씨", sector: "부동산/건설", description: "e편한세상 브랜드, 구 대림산업 건설 부문" },
  { id: "대우건설", label: "대우건설", sector: "부동산/건설", description: "푸르지오 아파트와 해외 플랜트·인프라 시공사" },
  { id: "HDC현대산업개발", label: "HDC현대산업개발", sector: "부동산/건설", description: "아이파크 브랜드 아파트·복합개발 전문 건설사" },

  // IT/소프트웨어
  { id: "NAVER", label: "NAVER", sector: "IT/소프트웨어", description: "검색·쇼핑·웹툰을 운영하는 국내 최대 인터넷 플랫폼" },
  { id: "카카오", label: "카카오", sector: "IT/소프트웨어", description: "카카오톡·카카오페이 등 모바일 생활 플랫폼" },
  { id: "크래프톤", label: "크래프톤", sector: "IT/소프트웨어", description: "배틀그라운드로 글로벌 시장을 장악한 게임사" },
  { id: "엔씨소프트", label: "엔씨소프트", sector: "IT/소프트웨어", description: "리니지 시리즈·TL 등 MMORPG 전문 게임사" },
  { id: "더존비즈온", label: "더존비즈온", sector: "IT/소프트웨어", description: "ERP·회계 기업용 소프트웨어 국내 1위" },

  // 기타
  { id: "대한항공", label: "대한항공", sector: "기타", description: "국내 1위 항공사, 화물·MRO 사업도 운영" },
  { id: "현대글로비스", label: "현대글로비스", sector: "기타", description: "자동차 물류·해운을 담당하는 현대차그룹 계열 물류사" },
  { id: "한국가스공사", label: "한국가스공사", sector: "기타", description: "천연가스 도입·공급을 전담하는 공기업" },

  // 엔터테인먼트/미디어
  { id: "HYBE", label: "HYBE", sector: "엔터테인먼트/미디어", description: "BTS·뉴진스 등을 보유한 K팝 엔터테인먼트 대기업" },
  { id: "SM엔터테인먼트", label: "SM엔터테인먼트", sector: "엔터테인먼트/미디어", description: "EXO·에스파 등 아이돌을 제작하는 K팝 레이블" },
  { id: "JYP엔터테인먼트", label: "JYP엔터테인먼트", sector: "엔터테인먼트/미디어", description: "트와이스·스트레이키즈를 보유한 K팝 레이블" },
  { id: "YG엔터테인먼트", label: "YG엔터테인먼트", sector: "엔터테인먼트/미디어", description: "블랙핑크·BIGBANG 등을 보유한 K팝 레이블" },
  { id: "CJ ENM", label: "CJ ENM", sector: "엔터테인먼트/미디어", description: "tvN·OCN·엠넷을 운영하는 종합 콘텐츠·커머스 기업" },
];
