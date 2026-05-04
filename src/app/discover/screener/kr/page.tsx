import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CornerDownRight,
  LogIn,
  Search,
  Star,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "종목찾기 | 머니터링",
  description: "Moneytoring Korean stock screener clone",
};

interface StockRowData {
  rank: number;
  name: string;
  filter: string;
  price: string;
  change: string;
  marketCap: string;
  tradingValue: string;
  volume: string;
  logoFile: string;
  voice: string;
  fresh: boolean;
}

interface StrategyCardData {
  title: string;
  description: string;
  result: string;
  logos: string[];
  selected?: boolean;
  empty?: boolean;
}

const stockBase = "/images/moneytoring/stock_logo";
const siteMedia = "/images/moneytoring/site/_next/static/media";

const strategyCards: StrategyCardData[] = [
  {
    title: "오늘의 급등 종목",
    description: "하루 동안 가장 많이 오른 급등주",
    result: "선도전기 외 +99 종목",
    logos: ["A007610.svg", "A199820.svg", "A024840.svg"],
    selected: true,
  },
  {
    title: "주가와 거래량 동시 상승",
    description: "최근 시장 주목을 받고 있는 강세 종목",
    result: "대원전선우 외 +13 종목",
    logos: ["A006345.svg", "etf.svg", "A446540.svg"],
  },
  {
    title: "꾸준 성장주",
    description: "앞으로 안정적인 성장을 이룰 종목",
    result: "제룡전기 외 +99 종목",
    logos: ["A033100.svg", "A036090.svg", "A046940.svg"],
  },
  {
    title: "벤저민 그레이엄의 전략",
    description: "가치투자의 기초를 닦은 벤저민 그레이엄식의 전략",
    result: "현대글로비스 외 +25 종목",
    logos: ["A086280.svg", "A194700.svg", "A025880.svg"],
  },
  {
    title: "피터린치의 전략",
    description: "PER·PEG를 활용해 실적 대비 저평가된 성장주를 콕 집어주는 린치식 전략",
    result: "LG씨엔에스 외 +44 종목",
    logos: ["A064400.svg", "A267850.svg", "A099390.svg"],
  },
  {
    title: "워렌버핏의 전략",
    description: "오마하의 현인이라 불리는 워렌버핏식 내재가치 전략",
    result: "F&F홀딩스 외 +21 종목",
    logos: ["A007700.svg", "A081660.svg", "A009970.svg"],
  },
  {
    title: "윌리엄 오닐의 전략",
    description: "혁신적인 성장투자자 윌리엄 오닐의 고성장 모멘텀 전략",
    result: "한빛소프트 외 +26 종목",
    logos: ["A047080.svg", "A143240.svg", "A031440.svg"],
  },
  {
    title: "빌 애크먼의 전략",
    description: "행동주의 가치투자자 빌 애크먼의 주가 재평가 전략",
    result: "팜스코 외 +6 종목",
    logos: ["A036580.svg", "A282330.svg", "A214320.svg"],
  },
  {
    title: "알렉스 세서도트의 전략",
    description: "R&D에 과감히 투자하는 테크주 중심의 성장투자자 세서도트의 전략",
    result: "검색된 종목이 없어요",
    logos: [],
    empty: true,
  },
];

const rawRows = `1|선도전기||6,500원|+30.00%|540억원|472.5억원|8,792,901|A007610.svg||
2|제일일렉트릭||16,640원|+30.00%|2,844.2억원|1,323.4억원|8,607,334|A199820.svg||
3|KBI메탈|필터 +2|3,925원|+29.97%|1,054.3억원|235.5억원|6,308,418|A024840.svg|KBI메탈, 원영하이텍 103억 원에 인수 예고|N
4|폴라리스AI||9,630원|+29.96%|1,077.9억원|110.4억원|1,194,750|A039980.svg|폴라리스AI, 중국 유비테크와 로봇 국내 공급 협력|N
5|오로라||16,280원|+29.93%|1,348.6억원|157.3억원|982,954|A039830.svg|오로라, 2026년 1분기 영업이익 45.9% 급증|N
6|와이씨켐||15,240원|+29.92%|2,370.9억원|144.6억원|954,826|A112290.svg||
7|나노엔텍||7,350원|+29.86%|2,156.1억원|367.3억원|5,376,015|A039860.svg||
8|피앤씨테크||6,720원|+29.73%|336.5억원|200.1억원|3,064,137|A237750.svg||
9|대원전선|필터 +2|12,670원|+25.82%|7,896.3억원|7,051.5억원|58,859,582|A006340.png|대원전선, AI 데이터센터 확장에 주가 20.9% 급등|N
10|비나텍||174,600원|+23.74%|1조원|956.3억원|571,724|A126340.svg||
11|롯데케미칼||116,900원|+23.70%|4조원|1,165.2억원|1,076,094|A011170.svg||
12|LS에코에너지||89,100원|+22.56%|2.2조원|1,016억원|1,184,287|A229640.svg|LS에코에너지 희토류 사업 강화로 핵심 소재 공급사 변신|N
13|에스투더블유|필터 +2|25,250원|+21.69%|2,234.6억원|411.1억원|1,655,534|488280.png|S2W와 텔레픽스, 안보 AI 정보 협력 강화|
14|지놈앤컴퍼니||7,690원|+21.10%|2,230억원|177.4억원|2,359,312|A314130.svg|지놈앤컴퍼니, EP0089 원료의약품 공급 완료|N
15|대원전선우|필터 +2|7,980원|+20.36%|173.8억원|286.2억원|3,760,769|A006345.svg||
16|LS머트리얼즈||32,150원|+19.74%|1.8조원|4,746.6억원|15,552,335|A417200.svg||
17|옴니시스템||1,061원|+19.62%|526.8억원|51.6억원|5,224,853|A057540.svg||
18|싸이맥스||39,500원|+18.98%|3,626.8억원|304.1억원|802,838|A160980.png||
19|코스텍시스||48,650원|+17.80%|3,220.3억원|176.9억원|396,743|A355150.svg||
20|오가닉티코스메틱||268원|+17.03%|574.8억원|302억원|115,413,531|A900300.svg||
21|이수화학|필터 +2|11,430원|+16.63%|2,576.8억원|1,065.4억원|9,007,328|A005950.svg||
22|홈캐스트||2,215원|+16.15%|661.6억원|61.8억원|2,687,205|A064240.svg||
23|잇츠한불||13,120원|+15.90%|2,482.4억원|62.5억원|463,047|A226320.svg||
24|대한전선|필터 +2|52,800원|+15.03%|8.6조원|1조원|20,440,715|A001440.svg|대한전선, 신안 태양광에 154kV 해저케이블 공급|
25|대한유화||180,700원|+14.51%|1조원|252.7억원|145,565|A006650.svg|대한유화·여천NCC, 나프타 수급 안정화에 가동률 확대|N
26|LS네트웍스|필터 +2|4,640원|+14.29%|3,199.4억원|254.6억원|5,512,873|A000680.svg||
27|유진테크놀로지||4,265원|+13.28%|260.8억원|41.6억원|984,717|A240600.svg||
28|한선엔지니어링|필터 +2|21,650원|+12.82%|3,693.4억원|301.1억원|1,444,973|A452280.svg||
29|키스트론|필터 +2|5,490원|+12.50%|871억원|48억원|924,092|475430.png||
30|디와이에이||1,010원|+12.47%|420억원|89.7억원|8,193,838|A002880.svg||
31|티씨머티리얼즈||7,340원|+12.23%|2,291.5억원|687.8억원|9,431,590|125020.png||
32|에치에프알||28,250원|+12.10%|3,353.9억원|188억원|667,292|A230240.svg||
33|모티브링크||9,000원|+11.66%|998.7억원|105.7억원|1,171,634|A463480.svg||
34|에스엔시스||46,500원|+11.24%|3,944.5억원|211.6억원|470,735|0008Z0.png|에스엔시스, 2023~2025년 매출 16.6% 성장|N
35|제룡산업|필터 +2|11,140원|+10.74%|2,012억원|1,225.6억원|10,945,493|A147830.svg||
36|메가터치|필터 +2|7,190원|+10.28%|1,692.8억원|74억원|1,052,583|A446540.svg|티에스이, 메가터치 유증에 지분율 40.7%로 현상 유지|N
37|서진시스템||56,500원|+10.14%|3.1조원|2,671.9억원|4,718,638|A178320.svg|서진시스템, 에너지 저장장치 1206억 공급계약 체결|
38|에스아이리소스||337원|+9.42%|220.5억원|69.9억원|19,907,072|A065420.svg||
39|롯데정밀화학|필터 +2|70,500원|+9.30%|1.7조원|181.6억원|259,453|A004000.svg|롯데정밀화학, 반도체 소재 생산 확대에 주가 상승 기대|N
40|HS효성||63,800원|+9.06%|2,179.7억원|70.3억원|111,536|A487570.svg||
41|S-Oil||129,400원|+9.01%|13.4조원|1,326.4억원|1,043,244|A010950.svg|SK이노베이션, 아시아 수출 확대와 고도화 투자 가속|N
42|SIMPAC|필터 +2|6,100원|+8.93%|3,660.8억원|49.9억원|806,474|A009160.svg||
43|LS마린솔루션||38,400원|+8.78%|1.8조원|331.1억원|893,984|A060370.svg|LS마린솔루션, 939억 규모 해상풍력 수출 계약 해지|
44|에스티큐브||22,250원|+8.54%|1.4조원|123.6억원|567,478|A052020.svg||
45|핌스||2,065원|+8.51%|435억원|7.6억원|375,048|A347770.svg||
46|지투파워|필터 +2|15,070원|+8.34%|2,602.5억원|366.1억원|2,450,878|A388050.svg|한국 엔지니어링, 2025년 수주 3년 연속 최대치 기록|
47|오픈놀||4,505원|+8.16%|409.4억원|218.1억원|4,729,156|A440320.svg||
48|동국제강|필터 +2|16,370원|+8.12%|7,510.7억원|336.3억원|2,007,143|A460860.svg|동국제강 1분기 영업이익 호조에 목표주가 상향|
49|큐리옥스바이오시스템즈||101,400원|+7.87%|1.6조원|99.1억원|100,124|A445680.png||
50|아모센스||23,550원|+7.78%|2,560.3억원|168.4억원|710,823|A357580.svg||
51|스틱인베스트먼트||10,460원|+7.72%|3,764.6억원|30.3억원|290,415|A026890.svg||
52|코세스||45,700원|+7.66%|7,040.3억원|79.3억원|178,460|A089890.svg||
53|한화엔진||87,300원|+7.64%|6.8조원|1,157.4억원|1,372,858|A082740.svg|HD현대중공업, 685MW 발전엔진 미 에너지사에 공급|
54|두산퓨얼셀||56,600원|+7.60%|3.4조원|742.7억원|1,321,735|A336260.svg||
55|쓰리빌리언||13,780원|+7.57%|4,068.6억원|42.3억원|311,099|A394800.svg||
56|금양그린파워||16,150원|+7.45%|1,821.6억원|77.4억원|485,341|A282720.svg||
57|삼화콘덴서||69,600원|+7.41%|6,736억원|498.4억원|717,344|A001820.svg|삼화콘덴서 1분기 MLCC 사업 매출 성장세|N
58|현대로템|필터 +2|262,500원|+7.36%|26.7조원|3,311.9억원|1,252,773|A064350.svg|현대로템, 폴란드서 K2 전차 생산 협력 확대|N
59|SAMG엔터||46,050원|+7.09%|4,296.5억원|193.7억원|419,622|A419530.svg||
60|SK이터닉스||58,900원|+7.09%|1.9조원|1,634.4억원|2,744,763|A475150.svg||
61|퓨릿|필터 +2|13,140원|+7.00%|2,110.8억원|44억원|343,477|A445180.svg||
62|마녀공장||16,800원|+6.94%|2,575.4억원|113억원|660,487|A439090.png||
63|SK이노베이션||142,200원|+6.92%|22.5조원|2,982.9억원|2,107,193|A096770.svg|SK온, 헝가리 배터리 공장 3곳 매각 추진|N
64|수성웹툰||1,221원|+6.82%|206.6억원|2.9억원|238,519|A084180.svg||
65|DH오토리드||2,940원|+6.72%|436억원|3.8억원|130,570|A290120.svg||
66|지아이이노베이션||16,810원|+6.66%|1조원|113.8억원|681,918|A358570.svg|유한양행, 알레르기 치료제 GI-301 시장 진출 기대|N
67|에스바이오메딕스||36,900원|+6.65%|4,285.3억원|34.8억원|97,102|A304360.svg||
68|씨이랩||7,110원|+6.60%|625.8억원|25.4억원|365,611|A189330.svg|씨이랩, AI 솔루션 신제품과 비용 최적화 기술 공개|N
69|롯데지주||31,125원|+6.59%|2.9조원|172.9억원|566,005|A004990.svg|롯데백화점, 외국인 할인 범위 잠실 롯데타운 확대|N
70|SNT다이내믹스||58,600원|+6.55%|1.8조원|154.8억원|257,605|A003570.svg||
71|DL||75,000원|+6.53%|1.5조원|183.4억원|248,835|A000210.svg|DL이앤씨, 압구정5구역 재건축 공사비·금융조건 대폭 개선|N
72|피델릭스||1,309원|+6.42%|407.5억원|10.4억원|806,177|A032580.svg||
73|경인양행||5,140원|+6.42%|2,010.1억원|90.7억원|1,788,724|A012610.svg||
74|블리츠웨이엔터테인먼트||1,200원|+6.38%|562.6억원|29억원|2,268,596|A369370.svg|블리츠웨이, 배용준 등기이사에 주식 8.63% 확보|N
75|피엠티||7,050원|+6.33%|717.4억원|43.5억원|622,439|A147760.svg||
76|프로텍|필터 +2|82,500원|+6.31%|8,536억원|53.9억원|67,423|A053610.svg||
77|지앤비에스 에코||8,420원|+6.31%|2,521억원|601.3억원|6,990,835|A382800.png||
78|하나머티리얼즈||81,100원|+6.29%|1.5조원|184억원|230,754|A166090.svg|하나머티리얼즈, 1분기 실적 시장 기대치 상회|
79|그리드위즈||26,350원|+6.25%|1,969.8억원|168.3억원|635,049|A453450.svg||
80|토모큐브||57,100원|+6.13%|7,200.2억원|69.4억원|121,555|A475960.svg|토모큐브, 3D 홀로토모그래피로 유리기판 결함 검출 강화|N
81|세명전기|필터 +3|13,530원|+6.12%|1,943.9억원|705.2억원|5,093,198|A017510.svg||
82|유니드||97,200원|+6.11%|6,199.1억원|46.1억원|48,832|A014830.svg||
83|두산퓨얼셀1우||9,210원|+6.11%|1,160억원|8.7억원|95,519|A33626K.svg||
84|에이엔피||754원|+6.05%|335억원|12.6억원|1,629,612|A015260.svg||
85|SK케미칼||61,100원|+5.89%|9,981.4억원|45.6억원|75,998|A285130.svg||
86|나노캠텍||725원|+5.84%|258.1억원|15.3억원|2,127,815|A091970.svg||
87|꿈비||4,720원|+5.83%|652.7억원|42.3억원|890,132|A407400.svg||
88|동원수산||7,140원|+5.78%|314.1억원|8.1억원|111,831|A030720.svg|동원수산, 비핵심 자산 정리로 기업가치 제고 추진|N
89|대창||1,631원|+5.77%|1,405.4억원|246.8억원|14,549,659|A012800.svg||
90|동양이엔피|필터 +2|34,300원|+5.70%|2,550.6억원|39.6억원|116,864|A079960.svg||
91|코위버||9,850원|+5.69%|913.1억원|53.2억원|534,367|A056360.svg||
92|진흥기업||1,432원|+5.68%|1,971.1억원|398.6억원|27,217,409|A002780.svg||
93|HS효성첨단소재||278,500원|+5.49%|1.2조원|128.7억원|47,051|A298050.svg||
94|비츠로테크|필터 +2|17,770원|+5.46%|4,414.7억원|474.6억원|2,595,038|A042370.svg||
95|코오롱||69,600원|+5.45%|8,519.1억원|75.4억원|110,610|A002020.svg|코오롱티슈진 TG-C, 17년 장기 안전성 입증|N
96|원티드랩||4,235원|+5.35%|392.6억원|68.9억원|1,615,823|A376980.svg||
97|피플바이오||1,420원|+5.34%|316.4억원|2.8억원|195,343|A304840.svg|피플바이오, 5월 판교서 임시주총 개최|
98|아우딘퓨쳐스||764원|+5.09%|276.6억원|9.2억원|1,163,252|A227610.svg||
99|SK가스|필터 +2|280,000원|+5.07%|2.5조원|90.8억원|31,986|A018670.svg||
100|S-Oil우||61,000원|+4.81%|2,340.8억원|20.7억원|34,020|A010955.svg||`;

const stockRows: StockRowData[] = rawRows.split("\n").map((line) => {
  const [rank, name, filter, price, change, marketCap, tradingValue, volume, logoFile, voice, fresh] = line.split("|");
  return {
    rank: Number(rank),
    name,
    filter,
    price,
    change,
    marketCap,
    tradingValue,
    volume,
    logoFile,
    voice,
    fresh: fresh === "N",
  };
});

function StockLogo({ row }: { row: StockRowData }) {
  if (!row.logoFile) {
    return <span className="grid h-8 w-8 place-items-center rounded-full bg-[#edf2f5] text-[11px] font-bold text-[#72818c]">{row.name.slice(0, 1)}</span>;
  }

  return <Image src={`${stockBase}/${row.logoFile}`} alt={`${row.name} 로고`} width={32} height={32} className="h-8 w-8 rounded-full bg-white object-contain" />;
}

function Header() {
  const nav = [
    { label: "마켓보이스", href: "/mv" },
    { label: "종목 발굴", href: "/discover/screener/kr", active: true },
    { label: "마켓 정보", href: "/market/indices" },
    { label: "커뮤니티", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-40 h-[60px] border-b border-[#ecf1f3] bg-white">
      <div className="flex h-full items-center px-8">
        <Link href="/" aria-label="Moneytoring home">
          <Image src={`${siteMedia}/header.d044c11b.svg`} alt="Moneytoring" width={145} height={22} className="h-[22px] w-[145px]" />
        </Link>
        <nav className="ml-[250px] flex items-center gap-1 text-[14px] font-semibold text-[#405260]">
          {nav.map((item) => (
            <Link
              key={item.label}
              className={`rounded-full px-3 py-2 ${item.active ? "bg-[#f0ffc4] text-[#146307]" : "hover:bg-[#f5f8f9]"}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="ml-3 flex h-8 w-[200px] items-center gap-2 rounded-full bg-[#e4ebf0] px-3 text-[13px] text-[#6c7983]">
          <Search className="h-[18px] w-[18px] text-[#97a2ab]" />
          검색어를 입력하세요
        </button>
        <Bell className="ml-auto h-5 w-5 text-[#87949e]" />
        <button className="ml-8 h-10 rounded-xl bg-[#beff00] px-5 text-[15px] font-semibold text-[#05121f]">로그인</button>
      </div>
    </header>
  );
}

function RightRail() {
  return (
    <aside className="fixed right-0 top-[60px] z-30 flex w-16 flex-col items-center gap-6 bg-white pt-4 text-[#72818c]">
      <LogIn className="h-5 w-5" />
      <div className="flex flex-col items-center gap-1 text-[11px]">
        <Clock3 className="h-5 w-5" />
        최근 본
      </div>
      <div className="flex flex-col items-center gap-1 text-[11px]">
        <Star className="h-5 w-5 fill-[#72818c]" />
        내 관심
      </div>
      <div className="h-px w-8 bg-[#e7edf1]" />
      <div className="flex flex-col items-center gap-1 text-[11px]">
        <UsersRound className="h-5 w-5" />
        함께투자
      </div>
    </aside>
  );
}

function StrategyCard({ card }: { card: StrategyCardData }) {
  return (
    <article
      className={`h-[140px] w-[300px] shrink-0 rounded-[24px] border p-5 ${
        card.selected ? "border-[#53f000] bg-[#fbfff0]" : "border-[#e3eaee] bg-white"
      }`}
    >
      <h3 className="truncate text-[17px] font-bold leading-6 text-[#142434]">{card.title}</h3>
      <p className="mt-2 line-clamp-2 h-10 text-[14px] leading-5 text-[#60707d]">{card.description}</p>
      <div className="mt-4 flex items-center">
        {card.empty ? (
          <span className="text-[14px] font-semibold text-[#a0abb4]">{card.result}</span>
        ) : (
          <>
            <div className="flex w-[58px] shrink-0">
              {card.logos.map((logo, index) => (
                <Image
                  key={`${card.title}-${logo}`}
                  src={`${stockBase}/${logo}`}
                  alt=""
                  width={28}
                  height={28}
                  className={`h-7 w-7 rounded-full border border-white bg-white object-contain ${index > 0 ? "-ml-[10px]" : ""}`}
                />
              ))}
            </div>
            <span className="truncate text-[14px] font-semibold text-[#4a5965]">{card.result}</span>
          </>
        )}
      </div>
    </article>
  );
}

function TableHeader() {
  return (
    <div className="grid h-10 grid-cols-[44px_46px_300px_150px_140px_190px_190px_180px] items-center border-y border-[#e7edf1] bg-white px-2 text-[13px] font-semibold text-[#8b98a3]">
      <span />
      <span />
      <span>종목 정보</span>
      <span className="text-right">현재가</span>
      <span className="flex items-center justify-end gap-1 text-right text-[#4b5964]">등락률 <ChevronDown className="h-4 w-4" /></span>
      <span className="flex items-center justify-end gap-1 text-right">시가총액(전일 종가) <ChevronDown className="h-4 w-4" /></span>
      <span className="flex items-center justify-end gap-1 text-right">거래대금 <ChevronDown className="h-4 w-4" /></span>
      <span className="flex items-center justify-end gap-1 text-right">거래량 <ChevronDown className="h-4 w-4" /></span>
    </div>
  );
}

function StockRow({ row }: { row: StockRowData }) {
  return (
    <>
      <div className="grid h-12 grid-cols-[44px_46px_300px_150px_140px_190px_190px_180px] items-center border-b border-[#edf2f5] px-2 text-[13px] font-semibold text-[#142434]">
        <div className="grid place-items-center">
          <Star className="h-[19px] w-[19px] text-[#b9c2c9]" />
        </div>
        <span className="text-[#60707d]">{row.rank}</span>
        <div className="flex min-w-0 items-center gap-3">
          <StockLogo row={row} />
          <span className="truncate">{row.name}</span>
          {row.filter && <span className="rounded-md bg-[#eaffbf] px-[6px] py-[2px] text-[11px] font-bold text-[#2e8a00]">{row.filter}</span>}
        </div>
        <span className="text-right">{row.price}</span>
        <span className="text-right text-[#f6493e]">{row.change}</span>
        <span className="text-right">{row.marketCap}</span>
        <span className="text-right">{row.tradingValue}</span>
        <span className="text-right">{row.volume}</span>
      </div>
      {row.voice && (
        <div className="grid h-12 grid-cols-[44px_46px_300px_150px_140px_190px_190px_180px] items-center border-b border-[#edf2f5] px-2 text-[13px] font-semibold text-[#6c7983]">
          <span />
          <span />
          <div className="col-span-4 flex min-w-0 items-center gap-2 pl-11">
            <CornerDownRight className="h-4 w-4 shrink-0 text-[#b1bcc5]" />
            <span className="truncate">{row.voice}</span>
            {row.fresh && <span className="text-[12px] font-black text-[#47bd00]">N</span>}
          </div>
        </div>
      )}
    </>
  );
}

export default function KoreanScreenerPage() {
  return (
    <div className="min-w-[1376px] bg-white text-[#142434]">
      <Header />
      <RightRail />

      <main className="mx-8 mb-16 w-[1312px] pt-4">
        <section className="flex items-end gap-7">
          <h1 className="border-b-2 border-[#111820] pb-[10px] text-[28px] font-bold leading-9 tracking-normal">종목찾기</h1>
          <Link href="/discover/theme/kr" className="pb-3 text-[28px] font-bold leading-9 text-[#a5b0b9]">
            테마찾기
          </Link>
        </section>

        <section className="mt-8 flex gap-2">
          <button className="h-10 rounded-full bg-[#111820] px-5 text-[15px] font-bold text-white">한국</button>
          <button className="h-10 rounded-full bg-[#eef3f6] px-5 text-[15px] font-bold text-[#8d99a3]">미국</button>
        </section>

        <section className="relative mt-3 flex h-[156px] items-center overflow-hidden">
          <button className="absolute left-0 z-10 hidden h-8 w-8 place-items-center rounded-lg border border-[#dbe4e9] bg-white text-[#65727d]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-4">
            {strategyCards.map((card) => (
              <StrategyCard key={card.title} card={card} />
            ))}
          </div>
          <button className="absolute right-1 top-[62px] z-10 grid h-8 w-8 place-items-center rounded-lg border border-[#dbe4e9] bg-white text-[#65727d] shadow-sm">
            <ChevronRight className="h-5 w-5" />
          </button>
        </section>

        <section className="mt-8">
          <h2 className="text-[24px] font-bold leading-8">오늘의 급등 종목</h2>
          <p className="mt-5 w-[900px] whitespace-pre-line text-[15px] font-medium leading-[24px] text-[#60707d]">
            {`최근 급격히 상승한 종목들이에요. 단기적인 시장 흐름을 빠르게 파악하고, 트렌디한 종목들을 찾고자 할 때 참고할 수 있어요.
급등 종목은 대개 특정 뉴스, 긍정적인 실적 발표, 산업 내 호재 등으로 인해 투자자들의 주목을 받고 있어요.`}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[13px] font-bold">
            <span className="rounded-full bg-[#eff4f6] px-3 py-[7px] text-[#72818c]">적용 조건</span>
            <span className="rounded-full bg-[#eaffbf] px-3 py-[7px] text-[#1c7f00]">시가총액 &gt; 100억</span>
          </div>

          <div className="mt-8 flex items-center">
            <span className="text-[15px] font-bold text-[#142434]">전체 종목 100 / 개별 종목 100</span>
            <div className="ml-auto flex items-center gap-2 text-[14px] font-bold text-[#4a5965]">
              <CheckCircle2 className="h-5 w-5 fill-[#beff00] text-[#111820]" />
              ETF 제외
            </div>
          </div>

          <div className="mt-5">
            <TableHeader />
            <div>
              {stockRows.map((row) => (
                <StockRow key={row.rank} row={row} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 flex gap-3 rounded-2xl bg-[#f5f8f9] px-6 py-5 text-[#6c7983]">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#aeb9c1] text-[12px] font-bold">i</span>
          <div>
            <h2 className="text-[14px] font-bold text-[#405260]">주의사항</h2>
            <p className="mt-2 text-[13px] font-medium leading-5">
              종목찾기 내 종목은 객관적 지표(적용조건)에 따라 자동 추출된 것으로, 당사의 주관적 의견이나 투자 권유가 반영되지 않았습니다.
              <br />
              투자 제안, 권유, 자문 목적이 아닌 단순 참고용 자료임을 유의하시기 바랍니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
