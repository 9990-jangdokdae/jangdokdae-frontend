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
    news_id: 7,
    issue_id: null,
    news_title: "'붉은사막' 흥행 대박…펄어비스 1분기 영업익 2천121억원(종합)",
    collected_at: "2026-05-16T10:20:00.000Z",
    published_at: "2026.05.12",
    source_name: "연합뉴스",
    sector: ["IT/소프트웨어", "엔터테인먼트/미디어"],
    company: ["펄어비스"],
    keyword: ["붉은사막", "어닝서프라이즈", "글로벌흥행", "게임실적", "패키지게임"],
    jurini_translation: {
      title: "'붉은사막' 흥행 대박…펄어비스 1분기 영업익 2천121억원(종합)",
      explanation: [
        "펄어비스는 신작 게임 '붉은사막' 흥행에 힘입어 올해 1분기 영업이익 2천121억 원을 기록했습니다. 전년 동기 대비 2천597.4% 늘어난 수치로, 시장 기대를 크게 웃도는 이른바 어닝 서프라이즈에 해당합니다.",
        "1분기 매출은 3천285억 원으로 419.6% 증가했고, 순이익도 큰 폭으로 늘었습니다. 특히 해외 매출 비중이 94%에 달했고, 북미·유럽이 81%를 차지해 붉은사막이 국내보다 해외에서 더 강한 흥행력을 보였다는 점이 확인됐습니다.",
        "회사 측은 검은사막 616억 원, 붉은사막 2천665억 원의 IP별 매출을 공개했고, 붉은사막의 플랫폼별 매출은 콘솔과 PC가 각각 절반 수준이었습니다. 다만 신작 출시 과정에서 인건비와 광고비, 지급수수료가 크게 늘어나 전체 영업비용도 함께 증가했습니다.",
        "펄어비스는 2분기에는 패키지 게임 특성상 초기 판매 집중 효과가 둔화될 수 있다고 설명했습니다. 대신 지속적인 업데이트와 DLC 연구, 그리고 차기작 '도깨비'와 '플랜 8' 개발을 통해 중장기 신작 사이클을 이어가겠다는 계획을 제시했습니다.",
      ],
      highlight_explanation_index: 1,
      terms: [
        { term: "어닝 서프라이즈", explanation: "기업의 실적이 시장 예상보다 훨씬 좋게 나오는 상황을 말합니다." },
        { term: "해외 매출 비중", explanation: "전체 매출 가운데 해외에서 벌어들인 매출이 차지하는 비율입니다." },
        { term: "패키지 게임", explanation: "출시 초기에 판매가 집중되는 콘솔·PC용 게임처럼 한 번 구매해 즐기는 형태의 게임을 뜻합니다." },
        { term: "DLC", explanation: "게임 출시 후 추가로 제공되는 다운로드형 콘텐츠를 말합니다." },
      ],
    },
    analysis_sections: [
      {
        title: "붉은사막 흥행이 만든 실적 변화",
        summary:
          "신작 '붉은사막'의 글로벌 흥행이 실적 급증의 핵심 배경이었습니다. 1분기 영업이익이 전년 동기 대비 2,597% 늘었고, 해외 매출 비중도 94%까지 올라가며 신작 성과가 숫자로 확인됐습니다. 단순한 일회성 이벤트가 아니라 북미·유럽 중심의 판매력이 실제 매출과 수익성으로 이어졌다는 점이 이번 실적의 가장 큰 변화입니다.",
      },
      {
        title: "다음 분기와 성장 전략",
        summary:
          "회사는 2분기에는 패키지 게임 특성상 매출이 다소 조정될 수 있다고 설명하면서도, 업데이트와 DLC 확대를 통해 판매량 방어를 시도하겠다고 밝혔습니다. 동시에 '도깨비'와 '플랜 8' 같은 차기작 개발에 집중하며 2~3년 주기의 신작 출시 리듬을 유지하겠다는 전략도 제시했습니다. 이번 실적은 현재 성과를 보여주는 동시에, 다음 작품들까지 이어지는 신작 사이클이 유지될 수 있는지를 함께 보게 만듭니다.",
      },
      {
        title: "주의할 점",
        summary:
          "실적이 크게 늘었지만 그 과정에서 인건비와 광고비, 지급수수료도 함께 급증했습니다. 신작 출시 초기 효과가 둔화된 뒤에도 판매량이 안정적으로 유지될 수 있는지, 차기작 개발이 계획대로 이어지는지가 이후 평가의 핵심이 될 가능성이 큽니다. 즉 이번 실적의 의미는 분명하지만, 패키지 게임 특유의 초기 집중 효과가 빠진 뒤에도 수익성이 버틸 수 있는지는 추가 확인이 필요합니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        {
          name: "펄어비스",
          ticker: "263750",
          subtitle: "게임 개발사",
          currentPrice: "47,200원",
          priceChangePct: "-6.72%",
        },
      ],
      relatedMarkets: [{ name: "게임 업종", summary: "신작이 한 번 터진 뒤에도 업데이트와 DLC로 판매가 이어지는지가 다음 실적을 가릅니다." }],
      keyMetrics: [
        { label: "붉은사막 판매량", value: "500만장" },
        { label: "1분기 영업이익", value: "2천121억원", emphasis: "2025년 연간 영업이익 -148억 원 적자 구간에서 흑자 전환 기대" },
        { label: "매출", value: "3천285억원", emphasis: "2025년 연간 매출 대비 -92.2% 하회" },
      ],
    },
    quizzes: [
      {
        quiz_id: "7-term",
        kind: "term",
        question: "'어닝 서프라이즈'라는 표현은 어떤 뜻에 가장 가깝나요?",
        options: ["실적이 시장 예상보다 훨씬 좋게 나온 상황", "회사가 예고 없이 상장폐지되는 상황", "주가가 하루 동안 거래되지 않는 상황", "영업이익이 항상 적자인 상황"],
        answer_index: 0,
        explanation: "어닝 서프라이즈는 기업 실적이 시장 예상보다 크게 좋게 나와 투자자들을 놀라게 하는 경우를 뜻합니다.",
      },
      {
        quiz_id: "7-issue",
        kind: "issue",
        question: "이번 펄어비스 실적 기사에서 가장 직접적인 실적 개선 배경으로 제시된 것은 무엇인가요?",
        options: ["'붉은사막'의 글로벌 흥행", "배당 확대 발표", "원자재 가격 하락", "대규모 자사주 소각"],
        answer_index: 0,
        explanation: "기사에서는 '붉은사막' 흥행이 매출과 영업이익 급증의 가장 핵심적인 배경으로 설명됐습니다.",
      },
    ],
  },
  {
    news_id: 9,
    issue_id: null,
    news_title: "외인 5.6조 매도에 8000 턱밑서 꺾인 코스피… 변동 폭 역대 2위",
    collected_at: "2026-05-16T10:25:00.000Z",
    published_at: "2026.05.12",
    source_name: "DB 샘플 기사",
    sector: ["반도체", "금융"],
    company: ["삼성전자", "SK하이닉스"],
    keyword: ["코스피급락", "국민배당금", "외국인순매도", "공매도대기자금", "피크아웃우려"],
    jurini_translation: {
      title: "외인 5.6조 매도에 8000 턱밑서 꺾인 코스피… 변동 폭 역대 2위",
      explanation: [
        "코스피는 장 초반 7,999.67까지 치솟으며 8,000선을 눈앞에 뒀지만, 이후 급격히 방향을 바꿔 7,643.15에 거래를 마쳤습니다. 장중 변동 폭은 577.96포인트에 달해 역대 두 번째 수준으로 기록됐습니다.",
        "하락을 주도한 것은 외국인과 기관이었습니다. 외국인은 5조6,100억 원, 기관은 1조2,100억 원을 순매도한 반면, 개인은 6조6,800억 원을 순매수하며 저가 매수에 나서는 등 수급 주체 간 시각 차이가 크게 벌어졌습니다.",
        "시장에서는 최근 5거래일 동안 1,200포인트 넘게 급등한 뒤 단기 과열 부담이 커진 상태에서, '국민배당금' 관련 정책 발언이 외국인 매도 심리를 자극했다는 해석이 나왔습니다. 원·달러 환율도 1,489.9원까지 오르며 위험 회피 심리를 보여줬습니다.",
        "동시에 대차거래 잔고가 182조9,670억 원으로 사상 최대치를 기록해 공매도 대기 자금이 빠르게 쌓였고, 투자자 예탁금도 크게 늘었습니다. 이는 시장이 반등 기대와 고점 경계 심리를 동시에 안고 있다는 뜻으로 읽힙니다.",
      ],
      highlight_explanation_index: 1,
      terms: [
        { term: "순매도", explanation: "산 금액보다 판 금액이 더 많은 상태를 뜻합니다." },
        { term: "대차거래 잔고", explanation: "공매도 등에 활용하기 위해 빌려간 주식이 아직 되돌려지지 않고 남아 있는 규모입니다." },
        { term: "피크아웃", explanation: "정점에 도달한 뒤 하락하거나 둔화될 것이라는 우려를 뜻합니다." },
        { term: "예탁금", explanation: "투자자가 주식 매수를 위해 증권 계좌에 맡겨 둔 대기 자금을 말합니다." },
      ],
    },
    analysis_sections: [
      {
        title: "시장 변동성이 커진 배경",
        summary:
          "코스피는 8,000선 돌파 직전까지 올랐다가 빠르게 하락 전환하며 시장 심리가 얼마나 예민한지 보여줬습니다. 최근 단기 급등에 따른 과열 부담이 누적된 상태에서 정책 불확실성이 더해지며, 상승 기대보다 고점 경계 심리가 더 강하게 작동한 흐름으로 볼 수 있습니다. 이번 급락은 단순 가격 조정이 아니라 시장 참여자들의 불안이 한꺼번에 드러난 사례에 가깝습니다.",
      },
      {
        title: "수급이 보여준 시각 차이",
        summary:
          "외국인과 기관은 대규모 순매도로 지수 하락을 주도했지만, 개인은 저가 매수에 나서며 정반대 선택을 했습니다. 이는 같은 장세를 두고도 외부 자금은 위험을 줄이려 했고, 개인은 단기 낙폭을 매수 기회로 본 셈입니다. 특히 삼성전자와 SK하이닉스 같은 시가총액 상위 종목도 함께 밀렸다는 점에서 이번 조정은 개별 종목보다 시장 전반의 수급 불균형 성격이 더 강했습니다.",
      },
      {
        title: "주의할 점",
        summary:
          "정책 발언이 외국인 심리에 미치는 영향과 공매도 대기 자금 확대는 이후 변동성을 더 키울 수 있는 변수입니다. 단기 반등이 나온다 해도, 과열 해소 없이 다시 상승 추세로 복귀한다고 단정하기는 어렵습니다. 결국 이번 시장 흔들림은 숫자상 급락보다도, 불확실성이 얼마나 빨리 진정되는지가 더 중요한 확인 포인트가 됩니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        {
          name: "삼성전자",
          ticker: "005930",
          subtitle: "반도체·전자",
          currentPrice: "270,500원",
          priceChangePct: "-8.61%",
        },
        {
          name: "SK하이닉스",
          ticker: "000660",
          subtitle: "메모리 반도체",
          currentPrice: "1,819,000원",
          priceChangePct: "-7.66%",
        },
      ],
      relatedMarkets: [
        {
          name: "KOSPI",
          value: "7,493.18",
          changePct: "-6.12%",
          summary: "지수가 흔들릴 때는 반등 자체보다 외국인 매도가 먼저 잦아드는지 보는 편이 더 중요합니다.",
        },
      ],
      keyMetrics: [
        { label: "KOSPI 지수", value: "7,493.18", emphasis: "일간 등락률 -6.12%" },
        { label: "SK하이닉스 주가 반응", value: "-2.28%", emphasis: "KOSPI(-6.12%) 대비 +3.84%p 강세" },
        { label: "순매도", value: "1조2,100억 원" },
      ],
    },
    quizzes: [
      {
        quiz_id: "9-term",
        kind: "term",
        question: "'순매도'는 어떤 상태를 말하나요?",
        options: ["산 금액보다 판 금액이 더 많은 상태", "판 금액보다 산 금액이 더 많은 상태", "주식을 전혀 거래하지 않은 상태", "배당금을 받은 뒤 세금을 내는 상태"],
        answer_index: 0,
        explanation: "순매도는 특정 투자 주체가 산 금액보다 판 금액이 더 많을 때 쓰는 표현입니다.",
      },
      {
        quiz_id: "9-issue",
        kind: "issue",
        question: "이번 코스피 급락 기사에서 하락을 주도한 주체로 설명된 것은 누구인가요?",
        options: ["외국인과 기관", "개인 투자자", "연기금만 단독으로", "코스닥 기업들"],
        answer_index: 0,
        explanation: "기사에서는 외국인과 기관이 대규모 순매도로 하락을 주도했고, 개인은 저가 매수에 나섰다고 설명했습니다.",
      },
    ],
  },
  {
    news_id: 10,
    issue_id: null,
    news_title: "피델리티, 반도체 장비 GST 주요주주 등극…SK하이닉스 공급 확대 베팅",
    collected_at: "2026-05-16T10:30:00.000Z",
    published_at: "2026.05.12",
    source_name: "DB 샘플 기사",
    sector: ["반도체", "철강/소재"],
    company: ["GST", "SK하이닉스", "SK실트론"],
    keyword: ["지분확대", "스크러버", "액침냉각", "실적최대", "친환경장비"],
    jurini_translation: {
      title: "피델리티, 반도체 장비 GST 주요주주 등극…SK하이닉스 공급 확대 베팅",
      explanation: [
        "글로벌 자산운용사 피델리티는 반도체 장비 업체 GST 지분을 한 달 만에 5.26%에서 9.10%까지 늘리며 주요 주주가 됐습니다. 시장에서는 이를 단순 재무 투자보다 GST의 장비 공급 확대 가능성을 높게 본 움직임으로 해석하고 있습니다.",
        "GST는 반도체 공정에서 유해가스를 정화하는 스크러버와 공정 온도를 제어하는 칠러를 만드는 회사입니다. 특히 SK하이닉스향 스크러버 공급 공정 수가 기존 1개에서 5개로 늘어나며, 올해부터 매출 확대 폭이 커질 수 있다는 기대가 붙고 있습니다.",
        "증권가에서는 GST의 올해 매출 4,147억 원, 영업이익 710억 원으로 역대 최대 실적을 예상하고 있습니다. 여기에 글로벌 파운드리 고객사 대상 칠러 데모와 친환경 장비 수요 증가가 더해지면, 기존 메모리 투자 확대 외에 추가 성장 여지도 생길 수 있다는 평가가 나옵니다.",
        "또한 전기가 통하지 않는 액체로 서버를 식히는 액침냉각 장비 역시 중장기 성장 동력으로 거론됩니다. 다만 이런 기대가 실제 수주와 실적으로 이어지는지, 고객사의 설비투자 속도가 유지되는지는 계속 확인이 필요합니다.",
      ],
      highlight_explanation_index: 1,
      terms: [
        { term: "스크러버", explanation: "반도체 공정에서 나오는 유해가스를 정화하는 장비입니다." },
        { term: "칠러", explanation: "공정 장비나 서버의 온도를 낮추고 일정하게 유지하는 냉각 장비입니다." },
        { term: "액침냉각", explanation: "전기가 통하지 않는 액체에 장비를 담가 열을 식히는 방식의 냉각 기술입니다." },
        { term: "CAPEX", explanation: "기업이 공장, 장비, 설비 같은 장기 자산에 투자하는 자본적 지출을 뜻합니다." },
        { term: "PoC", explanation: "기술이나 제품이 실제로 쓸 만한지 검증하는 시험 단계를 뜻합니다." },
      ],
    },
    analysis_sections: [
      {
        title: "지분 확대가 시사하는 변화",
        summary:
          "피델리티가 GST 지분을 빠르게 늘린 것은 단순한 수급 이벤트보다 실적 성장 가능성에 무게를 둔 판단으로 읽힙니다. 특히 SK하이닉스향 공급 확대와 글로벌 고객사 다변화 기대가 동시에 언급된다는 점에서, 시장은 GST를 메모리 투자 확대의 간접 수혜주로 해석하기 시작한 모습입니다. 이번 지분 확대는 외부 자금이 회사의 중장기 성장 서사에 본격적으로 반응했다는 신호로 볼 수 있습니다.",
      },
      {
        title: "공급 확대와 실적 모멘텀",
        summary:
          "GST는 올해부터 SK하이닉스향 스크러버 적용 공정 수가 본격적으로 늘어나며 매출 기반이 넓어지는 구간에 들어섰습니다. 여기에 TSMC향 칠러 공급 가능성과 친환경 장비 수요 증가가 더해지면, 기존 반도체 장비 매출 외에 추가 성장 동력도 확보할 수 있습니다. 즉 지금 시장이 보는 핵심은 단순한 지분 확대보다, 그 뒤에 붙어 있는 설비투자 확대와 실적 모멘텀의 연결성입니다.",
      },
      {
        title: "주의할 점",
        summary:
          "반도체 업황과 고객사의 CAPEX 집행 속도가 둔화되면 지금의 기대는 생각보다 빠르게 약해질 수 있습니다. 액침냉각이나 친환경 장비처럼 새 성장 동력이 실제 매출로 연결되기 전까지는, 관련 기대가 선반영되는 과정에서 변동성도 커질 수 있습니다. 결국 이번 이슈는 성장 가능성을 보여주지만, 실제 수주 확대와 수익성 확인이 뒤따르는지까지 함께 봐야 해석이 완성됩니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        {
          name: "GST",
          ticker: "083450",
          subtitle: "반도체 장비",
          currentPrice: "59,100원",
          priceChangePct: "-8.51%",
        },
        {
          name: "SK하이닉스",
          ticker: "000660",
          subtitle: "메모리 반도체",
          currentPrice: "1,819,000원",
          priceChangePct: "-7.66%",
        },
      ],
      relatedMarkets: [{ name: "반도체 장비", summary: "장비주는 기대만으로 오래 버티기보다, 고객사 공정 채택이 실제 매출로 찍히는지가 더 중요합니다." }],
      keyMetrics: [
        { label: "지분 확대 속도", value: "5.26% → 9.10%", emphasis: "한 달 새 +3.84%p 확대" },
        { label: "적용 공정 수", value: "1개 → 5개", emphasis: "고객사 내 채택 범위 약 5배 확대" },
        { label: "영업이익 전망", value: "710억원", emphasis: "2025년 연간 영업이익 대비 +19.9% 상회" },
      ],
    },
    quizzes: [
      {
        quiz_id: "10-term",
        kind: "term",
        question: "'스크러버'는 어떤 역할을 하는 장비인가요?",
        options: ["반도체 공정에서 유해가스를 정화하는 장비", "주가를 자동으로 계산하는 장비", "배당금을 지급하는 장비", "완성차를 조립하는 로봇"],
        answer_index: 0,
        explanation: "스크러버는 반도체·디스플레이 공정 등에서 나오는 유해가스를 정화하는 장비입니다.",
      },
      {
        quiz_id: "10-issue",
        kind: "issue",
        question: "이번 GST 기사에서 성장 기대의 핵심 배경으로 가장 직접적으로 언급된 것은 무엇인가요?",
        options: ["SK하이닉스향 공급 확대와 장비 적용 공정 증가", "정부의 배당 확대 정책", "원유 가격 급등", "소비재 할인 행사 확대"],
        answer_index: 0,
        explanation: "기사에서는 GST의 SK하이닉스향 공급 확대와 적용 공정 수 증가가 핵심 성장 배경으로 설명됐습니다.",
      },
    ],
  },
  {
    news_id: 4,
    issue_id: null,
    news_title: "[단독] 몸값 눈높이 낮춰…롯데손보 매각 재시동 [시그널]",
    collected_at: "2026-05-16T11:00:00.000Z",
    published_at: "2026.05.12",
    source_name: "서울경제 시그널",
    sector: ["금융", "보험"],
    company: ["롯데손해보험"],
    keyword: ["롯데손보매각", "IFRS17", "CSM", "자본적정성", "PEF"],
    jurini_translation: {
      title: "[단독] 몸값 눈높이 낮춰…롯데손보 매각 재시동 [시그널]",
      explanation: [
        "롯데손해보험 매각 절차가 다시 시작됐습니다. 최대주주 JKL파트너스는 예전처럼 높은 가격을 고수하기보다, 몸값을 현실적으로 낮춰 거래 성사 가능성을 높이는 쪽으로 방향을 잡은 것으로 보입니다.",
        "시장에서는 예전처럼 2조 원 수준이 아니라 1조 원대 초중반 정도가 거론됩니다. 다만 손해보험 사업에 새로 진출하려는 곳 입장에서는 선택지가 거의 없다는 점에서, 여전히 관심을 받을 만한 매물로 평가됩니다.",
        "기사에서 특히 강조한 건 단기 손익보다 CSM 같은 장기 수익성 지표입니다. IFRS17 환경에서 회계 비용 변동성은 커졌지만, 롯데손보의 CSM은 오히려 늘어났다는 점이 미래 수익성을 볼 때 중요하게 언급됐습니다.",
        "결국 이번 매각 이슈는 '얼마에 팔리느냐'만의 문제가 아니라, 회계 변화 속에서도 장기 보험 계약의 수익 기반이 얼마나 유지되고 있는지를 함께 봐야 하는 기사에 가깝습니다.",
      ],
      highlight_explanation_index: 2,
      terms: [
        { term: "PEF", explanation: "기업 지분을 사서 가치 개선 뒤 되파는 사모펀드 운용사를 뜻합니다." },
        { term: "IFRS17", explanation: "보험사의 수익과 비용을 예전보다 더 세밀하게 반영하도록 바뀐 새로운 보험회계 기준입니다." },
        { term: "CSM", explanation: "보험사가 앞으로 벌어들일 것으로 예상되는 계약 수익을 보여주는 핵심 지표입니다." },
        { term: "ROE", explanation: "자기자본 대비 얼마나 효율적으로 이익을 냈는지 보여주는 수익성 지표입니다." },
      ],
    },
    analysis_sections: [
      {
        title: "매각가가 낮아진 이유",
        summary:
          "이번 기사에서 가장 큰 변화는 롯데손보 몸값에 대한 기대치가 낮아졌다는 점입니다. 거래가 여러 차례 지연된 만큼, 최대주주가 높은 가격보다 실제 성사 가능성에 더 무게를 둔 것으로 읽힙니다. 즉 지금 시장은 '얼마까지 받을 수 있나'보다 '이번엔 실제로 팔릴 수 있나'를 더 중요하게 보고 있습니다.",
      },
      {
        title: "손익보다 CSM이 더 중요하게 읽히는 배경",
        summary:
          "보험업은 IFRS17 이후 단기 손익이 흔들려도 장기 계약 수익 기반이 유지되면 평가가 달라질 수 있습니다. 기사에서 롯데손보의 보험손익 감소보다 CSM 증가를 더 강조한 것도, 지금 단계에선 미래 수익성 체력이 더 중요한 판단 기준이기 때문입니다. 그래서 이번 매각 기사도 단순한 적자 뉴스가 아니라, 보험업 특유의 장기 수익 기반을 같이 읽어야 해석이 맞습니다.",
      },
      {
        title: "체크포인트",
        summary:
          "매각 성사 여부는 결국 가격 조정만으로 끝나지 않고, 금융당국 승인과 자본적정성 개선 계획까지 함께 봐야 합니다. 투자자 입장에서는 단순한 M&A 기대보다, CSM 증가가 실제로 수익 안정성으로 이어지는지와 규제 변수 정리가 얼마나 빠른지를 같이 확인할 필요가 있습니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        {
          name: "롯데손해보험",
          ticker: "000400",
          subtitle: "손해보험",
          currentPrice: "2,070원",
          priceChangePct: "-0.96%",
        },
      ],
      relatedMarkets: [
        {
          name: "보험업",
          summary: "보험주는 단기 이익보다 CSM처럼 앞으로 남아 있는 수익 기반이 얼마나 탄탄한지가 더 크게 작용할 때가 많습니다.",
        },
      ],
      keyMetrics: [
        { label: "JKL 보유 지분", value: "77%", emphasis: "최대주주가 협상 주도권을 쥔 구조입니다." },
        { label: "예상 몸값", value: "2조 원 → 1조 원대 초중반", emphasis: "거래 성사 가능성을 높이기 위한 눈높이 조정으로 읽힙니다." },
        { label: "CSM", value: "2조3200억 → 2조4800억", emphasis: "보수적 가정이 반영되는 와중에도 장기 수익 기반은 늘었습니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "4-term",
        kind: "term",
        question: "보험 기사에서 CSM은 무엇을 볼 때 중요한 지표인가요?",
        options: ["앞으로 남아 있는 보험 계약의 수익 기반", "하루 동안의 주가 변동폭", "공매도 잔고 규모", "배당금 지급 일정"],
        answer_index: 0,
        explanation: "CSM은 보험사가 장기 계약에서 앞으로 벌어들일 수익 기반을 보여주는 핵심 지표입니다.",
      },
      {
        quiz_id: "4-issue",
        kind: "issue",
        question: "이번 롯데손보 기사에서 매각 재시동의 핵심 변화로 가장 먼저 읽히는 것은 무엇인가요?",
        options: ["몸값 기대치를 낮추고 거래 성사 가능성에 무게를 둔 점", "보험업 전체의 배당 확대 정책", "원유 가격 급등", "해외 공장 증설 계획"],
        answer_index: 0,
        explanation: "기사에서는 2조 원보다 낮은 가격 수준을 열어두고 협상에 나서는 점이 핵심 변화로 제시됐습니다.",
      },
    ],
  },
  {
    news_id: 14,
    issue_id: null,
    news_title: "코스피 급락 버틴 LG전자…'외인 순매수 1위' 18%↑[핫종목](종합)",
    collected_at: "2026-05-16T11:05:00.000Z",
    published_at: "2026.05.12",
    source_name: "뉴스1",
    sector: ["유통/소비재", "자동차/모빌리티"],
    company: ["LG전자"],
    keyword: ["외국인순매수", "실적서프라이즈", "사업포트폴리오재평가", "전장", "로보틱스"],
    jurini_translation: {
      title: "코스피 급락 버틴 LG전자…'외인 순매수 1위' 18%↑[핫종목](종합)",
      explanation: [
        "LG전자는 코스피가 크게 흔들린 날에도 18% 급등하며 장을 마쳤습니다. 외국인이 그날 가장 많이 순매수한 종목이 LG전자였고, 덕분에 지수 급락 속에서도 주가가 강하게 버틴 모습입니다.",
        "시장에서는 이번 급등 배경을 단순한 단기 수급이 아니라, 생활가전의 수익성 유지와 전장·로보틱스 같은 신사업 기대가 함께 반영된 결과로 보고 있습니다. 특히 실적과 사업 포트폴리오 재평가가 동시에 붙었다는 점이 특징입니다.",
        "LG전자는 1분기 매출 23조7272억 원, 영업이익 1조6737억 원을 기록했고, 생활가전 사업본부도 최대 매출을 냈습니다. 증권가는 목표주가를 올리면서 가전, 전장, AI 데이터센터, 로봇으로 이어지는 사업 구조를 다시 볼 필요가 있다고 평가했습니다.",
        "즉 이 기사는 '하루 급등' 자체보다, 왜 외국인 자금이 이런 장세에서 LG전자에 집중됐는지를 읽는 게 더 중요합니다.",
      ],
      highlight_explanation_index: 2,
      terms: [
        { term: "순매수", explanation: "산 금액이 판 금액보다 더 많은 상태를 말합니다." },
        { term: "사업 포트폴리오 재평가", explanation: "회사의 여러 사업 조합을 시장이 이전보다 더 높게 평가하기 시작하는 상황입니다." },
        { term: "전장", explanation: "자동차 안에 들어가는 전자 부품과 시스템 사업을 뜻합니다." },
        { term: "로보틱스", explanation: "산업용·서비스용 로봇과 관련된 기술 및 사업 영역입니다." },
      ],
    },
    analysis_sections: [
      {
        title: "급락장 속에서도 강했던 이유",
        summary:
          "LG전자는 지수 전체가 흔들릴 때도 외국인 순매수 1위에 오르며 강하게 버텼습니다. 이건 단순히 시장 반등에 편승한 움직임이 아니라, 외국인 자금이 특정 종목을 따로 골라 담았다는 점에서 의미가 다릅니다. 결국 이번 강세는 시장 전체보다 기업 자체의 실적과 구조 변화 기대가 더 크게 반영된 사례로 볼 수 있습니다.",
      },
      {
        title: "실적과 사업 구조가 같이 재평가되는 구간",
        summary:
          "생활가전은 수익성을 지키고 있고, 전장과 로보틱스 같은 신사업은 추가 성장 스토리를 만들어주고 있습니다. 그래서 기사에서도 실적 숫자 하나보다, 가전·전장·AI DC·로봇으로 이어지는 사업 포트폴리오가 다시 평가받는다는 점이 더 중요하게 읽힙니다. 즉 LG전자는 전통 사업의 안정성과 신사업 기대가 동시에 붙는 구조로 해석되고 있습니다.",
      },
      {
        title: "체크포인트",
        summary:
          "단기 급등 이후에는 외국인 매수세가 하루 이벤트로 끝나는지, 아니면 실적과 목표주가 상향이 실제 재평가 흐름으로 이어지는지 확인이 필요합니다. 특히 관세나 원가 부담처럼 아직 남아 있는 변수 속에서도 전장과 신사업 기대가 계속 유지될지가 다음 관전 포인트가 됩니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        {
          name: "LG전자",
          ticker: "066570",
          subtitle: "가전·전장",
          currentPrice: "240,500원",
          priceChangePct: "+10.83%",
        },
      ],
      relatedMarkets: [
        {
          name: "가전·전장",
          summary: "전통 가전이 버텨주는 동안 전장과 로봇이 새 성장축으로 보이기 시작하면 재평가 폭이 더 커질 수 있습니다.",
        },
      ],
      keyMetrics: [
        { label: "주가 반응", value: "+18.00%", emphasis: "2021년 최고가와 100원 차이까지 올라온 하루였습니다." },
        { label: "외국인 순매수", value: "1131억원", emphasis: "그날 외국인이 가장 많이 산 종목이 LG전자였습니다." },
        { label: "1분기 영업이익", value: "1조6737억원", emphasis: "전년 동기 대비 +32.9%로 수익성 개선이 확인됐습니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "14-term",
        kind: "term",
        question: "'사업 포트폴리오 재평가'라는 표현은 무엇에 더 가깝나요?",
        options: ["회사의 여러 사업 구성이 이전보다 더 높게 평가받는 상황", "사업부를 모두 매각하는 상황", "단순히 하루 거래량이 늘어난 상황", "정부가 세금을 줄여주는 정책"],
        answer_index: 0,
        explanation: "사업 포트폴리오 재평가는 기존 사업과 신사업 조합을 시장이 더 높게 평가하기 시작하는 흐름을 뜻합니다.",
      },
      {
        quiz_id: "14-issue",
        kind: "issue",
        question: "이번 LG전자 기사에서 주가 급등의 직접 배경으로 가장 먼저 언급된 것은 무엇인가요?",
        options: ["외국인 순매수와 실적·신사업 기대", "대규모 유상증자", "원유 가격 급등", "배당 폐지"],
        answer_index: 0,
        explanation: "기사에서는 외국인 순매수와 함께 가전 수익성, 전장·신사업 기대가 급등 배경으로 설명됐습니다.",
      },
    ],
  },
  {
    news_id: 21,
    issue_id: null,
    news_title: "트럼프 따라 중국 간 젠슨 황 … 美빅테크 동반 상승",
    collected_at: "2026-05-16T11:10:00.000Z",
    published_at: "2026.05.13",
    source_name: "매일경제",
    sector: ["해외 기술주", "반도체"],
    company: ["엔비디아", "마이크론", "포드"],
    keyword: ["미중갈등완화", "대중수출규제", "CATL", "ESS", "방중사절단"],
    jurini_translation: {
      title: "트럼프 따라 중국 간 젠슨 황 … 美빅테크 동반 상승",
      explanation: [
        "미국과 중국의 정상회담을 앞두고, 중국 사업 비중이 높은 미국 기술주들이 일제히 올랐습니다. 시장은 이번 움직임을 단순 뉴스 반응이 아니라, 미·중 갈등이 조금 완화될 수 있다는 기대가 반영된 결과로 보고 있습니다.",
        "특히 젠슨 황 엔비디아 CEO가 트럼프 대통령의 방중 사절단에 동행한다는 소식은 상징성이 컸습니다. 시장은 이를 AI 반도체처럼 규제 민감도가 높은 분야에서도 긴장이 조금 누그러질 수 있는 신호로 읽었습니다.",
        "엔비디아, 마이크론, 퀄컴, 애플, 테슬라 같은 빅테크가 모두 오르고, 포드는 CATL 협력 기대까지 겹치며 더 큰 폭으로 상승했습니다. 즉 이번 기사는 실적보다도 외교 이벤트가 기업별 중국 노출도와 연결되며 주가에 반영된 사례에 가깝습니다.",
        "다만 이런 기대는 회담 이후 실제 정책 변화나 규제 완화가 따라와야 오래갈 수 있습니다.",
      ],
      highlight_explanation_index: 1,
      terms: [
        { term: "대중수출규제", explanation: "미국 기업이 중국에 특정 기술이나 제품을 수출하지 못하게 제한하는 정책입니다." },
        { term: "ESS", explanation: "전기를 저장해두었다가 필요할 때 쓰는 에너지저장장치입니다." },
        { term: "CATL", explanation: "전기차 배터리로 잘 알려진 중국의 대형 배터리 기업입니다." },
      ],
    },
    analysis_sections: [
      {
        title: "방중 사절단이 시장에 준 신호",
        summary:
          "이번 기사에서 주가를 움직인 핵심은 실적이 아니라 외교 이벤트였습니다. 젠슨 황이 사절단에 포함됐다는 사실만으로도, 시장은 미국의 대중 규제 강도가 다소 누그러질 수 있다는 가능성을 먼저 가격에 반영했습니다. 즉 숫자 자체보다 '이제 관계가 조금 풀릴 수 있나'라는 기대가 먼저 움직인 장면에 가깝습니다.",
      },
      {
        title: "중국 노출도가 높은 기업들이 먼저 반응한 이유",
        summary:
          "엔비디아와 마이크론, 퀄컴처럼 중국 매출이나 공급망 노출도가 큰 기업들이 함께 오른 건 우연이 아닙니다. 시장은 이런 종목들을 통해 미·중 관계 개선 기대를 가장 빠르게 표현했습니다. 그래서 이번 상승은 개별 기업 호재라기보다, 중국 변수에 민감한 기술주 묶음이 한꺼번에 반응한 흐름으로 보는 편이 맞습니다.",
      },
      {
        title: "체크포인트",
        summary:
          "정상회담 뉴스만으로 이어진 기대는 실제 규제 완화나 사업 환경 개선이 확인되지 않으면 금방 약해질 수 있습니다. 특히 AI 반도체나 배터리처럼 정책 민감도가 큰 업종은 말 한마디보다 후속 조치가 더 중요합니다. 결국 이번 주가 반응은 시작점일 뿐, 실제 제도 변화가 이어지는지까지 봐야 해석이 완성됩니다.",
      },
    ],
    sidebar_context: {
      relatedCompanies: [
        { name: "엔비디아", subtitle: "AI 반도체", priceChangePct: "+2.29%" },
        { name: "마이크론", subtitle: "메모리 반도체", priceChangePct: "+4.83%" },
        { name: "포드", subtitle: "완성차", priceChangePct: "+13.18%" },
      ],
      relatedMarkets: [
        {
          name: "미국 기술주",
          summary: "외교 이벤트가 실적보다 먼저 움직일 때는, 기대가 정책으로 이어지는지 확인하는 속도가 더 중요합니다.",
        },
      ],
      keyMetrics: [
        { label: "엔비디아 상승률", value: "+2.29%", emphasis: "젠슨 황 방중 동행 소식이 직접 자극이 됐습니다." },
        { label: "마이크론 상승률", value: "+4.83%", emphasis: "중국 노출도가 큰 반도체주가 함께 강세를 보였습니다." },
        { label: "포드 상승률", value: "+13.18%", emphasis: "CATL 협력 기대가 ESS 성장 스토리와 연결됐습니다." },
      ],
    },
    quizzes: [
      {
        quiz_id: "21-term",
        kind: "term",
        question: "'대중수출규제'는 어떤 의미에 가장 가깝나요?",
        options: ["미국 기업의 중국 수출을 제한하는 정책", "중국이 미국 주식을 사는 제도", "미국 정부의 금리 인하 정책", "기업이 배당금을 지급하는 방식"],
        answer_index: 0,
        explanation: "대중수출규제는 미국 기업이 중국에 특정 기술·제품을 수출하지 못하게 제한하는 정책을 뜻합니다.",
      },
      {
        quiz_id: "21-issue",
        kind: "issue",
        question: "이번 기사에서 미국 기술주가 함께 오른 가장 직접적인 배경은 무엇인가요?",
        options: ["미·중 관계 완화 기대가 커진 점", "미국 기준금리 급락", "대규모 자사주 소각", "원자재 가격 하락"],
        answer_index: 0,
        explanation: "기사에서는 정상회담과 방중 사절단 이슈를 계기로 미·중 갈등 완화 기대가 주가에 반영됐다고 설명했습니다.",
      },
    ],
  },
];

export function mapBackendIssueReadingToIssue(reading: BackendIssueReading): Issue {
  const id = String(reading.issue_id ?? reading.news_id);
  const normalizedSidebarContext = reading.sidebar_context
    ? {
        ...reading.sidebar_context,
        relatedCompanies: reading.sidebar_context.relatedCompanies.map((company) => ({
          ...company,
          subtitle: company.subtitle ?? (company as { sector?: string }).sector,
        })),
      }
    : null;

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
    analysisSections: reading.analysis_sections ?? [],
    sidebarContext: normalizedSidebarContext,
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
