import type { BackendIssueReading, InterestProfile, Issue } from "@/types/jangdokdae";
export { SECTOR_OPTIONS as sectorOptions } from "@/constants/sectors";
export { COMPANY_OPTIONS as companyOptions } from "@/constants/companies";

export const interestStorageKey = "jangdokdae.interest-profile.v1";

/** localStorage/서버 fallback용 빈 상태. "아무것도 선택 안 함"을 의미. */
export const defaultInterestProfile: InterestProfile = {
  sectors: [],
  companies: [],
};

/** 온보딩 첫 화면에 미리 선택되는 추천값. 사용자가 바로 수정 가능. */
export const ONBOARDING_INITIAL_PROFILE: InterestProfile = {
  sectors: ["반도체"],
  companies: ["삼성전자", "SK하이닉스"],
};

export const backendIssueReadings: BackendIssueReading[] = [
  {
    news_id: 1,
    issue_id: null,
    news_title: "저력의 삼성전자, 오픈AI 악재에도 장중 반등",
    collected_at: "2026-05-02T13:05:30.767Z",
    published_at: "2026.04.29",
    source_name: "줍줍 리포트",
    sector: ["AI", "반도체"],
    company: ["삼성전자", "SK하이닉스"],
    keyword: ["OpenAI", "메모리", "투자 심리", "AI 추론"],
    jurini_translation: {
      title: "저력의 삼성전자, 오픈AI 악재에도 장중 반등",
      explanation: [
        "29일 한국거래소에서 삼성전자와 SK하이닉스는 정규 시장 전인 프리마켓에서 약세를 보인 뒤 장 초반에도 하락했으나, 이후 상승으로 돌아서며 각각 2.59%, 0.15% 올랐습니다.",
        "앞서 외신은 오픈AI의 실적 부진과 데이터센터 비용 부담 우려를 보도하며 인공지능 밸류체인 전반의 투자 심리가 악화될 것으로 예상했습니다.",
        "하지만 유진투자증권은 이를 인공지능 생태계 전체가 아닌 특정 기업의 개별 문제로 보았으며, 최근의 시장 약세는 과거 급등에 따른 일시적인 조정이라고 분석했습니다.",
        "KB증권은 인공지능 추론 시대에 서버 D램 등 메모리 반도체의 중요성이 커짐에 따라, 생산 능력을 확보한 삼성전자의 가치가 재평가될 것으로 전망했습니다.",
      ],
      highlight_explanation_index: 0,
      terms: [
        { term: "프리마켓", explanation: "정규 주식 시장이 시작되기 전 정해진 시간에 주식을 거래할 수 있는 시장입니다." },
        { term: "밸류체인", explanation: "제품의 설계, 생산, 공급, 판매 등 가치가 생성되는 전체 과정을 연결된 사슬처럼 나타낸 것입니다." },
        { term: "투자 심리", explanation: "시장의 상황이나 뉴스에 대해 투자자들이 느끼는 주관적인 기대나 불안감을 의미합니다." },
        { term: "조정", explanation: "주가가 단기간에 많이 오른 뒤 과열을 식히기 위해 일시적으로 하락하거나 정체되는 현상입니다." },
        { term: "재평가", explanation: "기업이 가진 가치나 잠재력이 시장에서 새롭게 인정받아 주가에 반영되는 것을 의미합니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "1-term",
        kind: "term",
        question: "뉴스에서 말한 '투자 심리'에 가장 가까운 뜻은 무엇일까요?",
        options: ["투자자들이 시장을 바라보는 기대와 불안", "기업이 발표한 공식 순이익", "거래소가 정한 주식 가격", "회사가 보유한 현금 총액"],
        answer_index: 0,
        explanation: "투자 심리는 뉴스와 시장 상황을 본 투자자들의 기대, 불안, 선호가 섞인 분위기를 뜻합니다.",
      },
      {
        quiz_id: "1-issue",
        kind: "issue",
        question: "이 이슈에서 삼성전자와 SK하이닉스가 반등한 이유로 설명된 내용은 무엇인가요?",
        options: ["오픈AI 문제가 AI 생태계 전체의 문제로 보이지 않았기 때문", "오픈AI가 데이터센터 비용 부담을 모두 해소했기 때문", "반도체 종목이 장 초반부터 계속 상승했기 때문", "KB증권이 두 회사의 매수를 직접 권유했기 때문"],
        answer_index: 0,
        explanation: "기사 요약에서는 오픈AI 우려가 있었지만, 이를 개별 기업 문제로 보는 분석과 메모리 수요 기대가 반등 배경으로 제시됐습니다.",
      },
    ],
  },
  {
    news_id: 2,
    issue_id: null,
    news_title: "전기차 화재 우려에 배터리 안전 진단 기업 주목",
    collected_at: "2026-05-02T10:30:00.000Z",
    published_at: "2026.05.02",
    source_name: "장독대 데모 데이터",
    sector: ["2차전지"],
    company: ["LG에너지솔루션", "현대차"],
    keyword: ["배터리", "전기차", "안전 진단", "리콜"],
    jurini_translation: {
      title: "전기차 화재 우려에 배터리 안전 진단 기업 주목",
      explanation: [
        "전기차 화재 관련 보도가 이어지면서 시장에서는 배터리 안전을 미리 점검하는 기술과 서비스에 관심을 보이고 있습니다.",
        "배터리 기업과 완성차 기업은 화재 원인을 줄이고 소비자 불안을 낮추기 위해 검사 장비, 진단 소프트웨어, 리콜 대응 체계를 더 중요하게 보게 됩니다.",
        "다만 안전 이슈는 관련 기업에 기회가 될 수도 있지만, 동시에 품질 비용과 브랜드 신뢰 문제를 키울 수도 있어 차분히 확인해야 합니다.",
      ],
      highlight_explanation_index: 2,
      terms: [
        { term: "리콜", explanation: "제품에 문제가 있을 때 기업이 제품을 회수하거나 무상으로 고쳐주는 조치입니다." },
        { term: "품질 비용", explanation: "불량을 줄이거나 문제가 생긴 제품을 수리하고 보상하는 데 드는 비용입니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "2-term",
        kind: "term",
        question: "'리콜'은 어떤 상황을 말할까요?",
        options: ["문제가 있는 제품을 회수하거나 고쳐주는 조치", "회사가 새 공장을 짓는 투자", "주식을 일정 기간 팔지 못하게 하는 제도", "배당금을 현금으로 지급하는 절차"],
        answer_index: 0,
        explanation: "리콜은 제품 결함이나 안전 문제가 있을 때 기업이 제품을 회수하거나 수리하는 조치입니다.",
      },
      {
        quiz_id: "2-issue",
        kind: "issue",
        question: "이 이슈를 볼 때 함께 확인해야 할 주의점은 무엇인가요?",
        options: ["안전 진단 수요와 함께 품질 비용 부담도 커질 수 있다는 점", "전기차 기업은 배터리 안전과 무관하다는 점", "화재 보도가 나오면 모든 배터리 기업 실적이 즉시 좋아진다는 점", "리콜은 소비자 신뢰와 전혀 관계가 없다는 점"],
        answer_index: 0,
        explanation: "안전 이슈는 진단 기업에는 관심 요인이지만, 배터리와 완성차 기업에는 비용과 신뢰 리스크가 될 수도 있습니다.",
      },
    ],
  },
  {
    news_id: 3,
    issue_id: null,
    news_title: "금리 방향성 논쟁 속 은행주의 이자이익 전망 엇갈려",
    collected_at: "2026-05-01T16:40:00.000Z",
    published_at: "2026.05.01",
    source_name: "장독대 데모 데이터",
    sector: ["금융"],
    company: ["KB금융"],
    keyword: ["금리", "은행", "순이자마진", "대출"],
    jurini_translation: {
      title: "금리 방향성 논쟁 속 은행주의 이자이익 전망 엇갈려",
      explanation: [
        "시장에서는 앞으로 금리가 어떻게 움직일지에 따라 은행주의 이익 흐름이 달라질 수 있다고 보고 있습니다.",
        "은행은 예금으로 돈을 모으고 대출로 이자를 받기 때문에, 대출 금리와 예금 금리의 차이가 이익에 큰 영향을 줍니다.",
        "금리가 높게 유지되면 이자이익에는 도움이 될 수 있지만, 대출 부실이 늘면 손실 위험도 함께 커질 수 있습니다.",
      ],
      highlight_explanation_index: 2,
      terms: [
        { term: "순이자마진", explanation: "은행이 대출 이자로 벌어들인 수익에서 예금 이자 비용을 뺀 뒤 남는 이자 수익성 지표입니다." },
        { term: "대출 부실", explanation: "돈을 빌린 사람이 원금이나 이자를 제때 갚지 못하는 상황입니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "3-term",
        kind: "term",
        question: "'순이자마진'은 무엇을 보여주는 지표인가요?",
        options: ["은행의 이자 수익성을 보여주는 지표", "기업의 제품 판매량을 보여주는 지표", "주식의 하루 거래량만 보여주는 지표", "국가의 수출입 규모를 보여주는 지표"],
        answer_index: 0,
        explanation: "순이자마진은 은행이 예금과 대출 사이에서 얼마나 이자 수익을 남기는지 보여줍니다.",
      },
      {
        quiz_id: "3-issue",
        kind: "issue",
        question: "금리가 높게 유지될 때 은행주에서 함께 봐야 할 위험은 무엇인가요?",
        options: ["대출 부실이 늘어 손실 위험이 커질 수 있음", "은행이 이자를 전혀 받을 수 없음", "모든 예금자가 주식을 사야 함", "은행의 대출 사업이 법적으로 중단됨"],
        answer_index: 0,
        explanation: "높은 금리는 이자이익에 도움이 될 수 있지만, 빚을 갚기 어려운 사람이 늘면 대출 부실 위험이 커질 수 있습니다.",
      },
    ],
  },
  {
    news_id: 4,
    issue_id: null,
    news_title: "방산 수출 기대감에 항공우주 부품주 관심 확대",
    collected_at: "2026-05-01T09:20:00.000Z",
    published_at: "2026.05.01",
    source_name: "장독대 데모 데이터",
    sector: ["방산"],
    company: ["한화에어로스페이스"],
    keyword: ["방산", "수출", "항공우주", "수주"],
    jurini_translation: {
      title: "방산 수출 기대감에 항공우주 부품주 관심 확대",
      explanation: [
        "방산 기업의 해외 수출 기대가 커지면 완제품을 만드는 회사뿐 아니라 부품과 정비를 담당하는 기업에도 관심이 옮겨갈 수 있습니다.",
        "수출 계약은 한 번에 끝나는 매출이 아니라 생산, 납품, 유지보수로 이어질 수 있어 시장이 장기 흐름을 함께 봅니다.",
        "다만 실제 계약 규모, 납품 일정, 원가 부담이 확인되기 전까지는 기대감과 실적을 구분해서 봐야 합니다.",
      ],
      highlight_explanation_index: 1,
      terms: [
        { term: "수주", explanation: "기업이 제품이나 서비스를 공급하기로 계약을 따내는 것을 말합니다." },
        { term: "유지보수", explanation: "납품한 장비가 계속 잘 작동하도록 점검하고 고치는 활동입니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "4-term",
        kind: "term",
        question: "'수주'의 뜻으로 가장 적절한 것은 무엇인가요?",
        options: ["제품이나 서비스를 공급할 계약을 따내는 것", "회사가 주식을 새로 상장하는 것", "투자자가 주식을 모두 파는 것", "정부가 금리를 결정하는 것"],
        answer_index: 0,
        explanation: "수주는 기업이 고객과 공급 계약을 맺어 앞으로 매출로 이어질 수 있는 일을 따낸다는 뜻입니다.",
      },
      {
        quiz_id: "4-issue",
        kind: "issue",
        question: "방산 수출 기대감을 볼 때 구분해야 할 것은 무엇인가요?",
        options: ["기대감과 실제 계약 규모 및 실적", "제품 색상과 회사 로고", "주식 이름의 글자 수", "거래소 건물 위치"],
        answer_index: 0,
        explanation: "방산 수출 뉴스는 기대감을 만들 수 있지만, 실제 실적 영향은 계약 규모와 일정, 원가를 확인해야 판단할 수 있습니다.",
      },
    ],
  },
];

export function mapBackendIssueReadingToIssue(reading: BackendIssueReading): Issue {
  const id = String(reading.issue_id ?? reading.news_id);

  return {
    id,
    title: reading.jurini_translation.title || reading.news_title,
    collectedAt: reading.collected_at,
    source: {
      name: reading.source_name,
      publishedAt: reading.published_at,
    },
    sectors: reading.sector,
    companies: reading.company,
    keywords: reading.keyword,
    translation: {
      title: reading.jurini_translation.title,
      explanation: reading.jurini_translation.explanation,
      highlightExplanationIndex: reading.jurini_translation.highlight_explanation_index,
      terms: reading.jurini_translation.terms,
    },
    quizzes: reading.quizzes.map((quiz) => ({
      id: quiz.quiz_id,
      kind: quiz.kind,
      question: quiz.question,
      options: quiz.options,
      answerIndex: quiz.answer_index,
      explanation: quiz.explanation,
    })),
  };
}

export const issues: Issue[] = backendIssueReadings.map(mapBackendIssueReadingToIssue);

export function getIssueById(id: string) {
  return issues.find((issue) => issue.id === id);
}

export function matchesInterest(issue: Issue, profile: InterestProfile) {
  return (
    issue.sectors.some((sector) => profile.sectors.includes(sector)) ||
    issue.companies.some((company) => profile.companies.includes(company))
  );
}
