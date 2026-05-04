import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Link2,
  LogIn,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  Share2,
  Star,
  ThumbsUp,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "삼성전자 | 머니터링",
  description: "Moneytoring Samsung Electronics brief clone",
};

type Trend = "up" | "down" | "flat";

interface VoiceChip {
  label: string;
  value?: string;
  trend?: Trend;
  logo?: string;
}

interface MarketVoice {
  title: string;
  summary: string;
  source: string;
  time: string;
  image?: string;
  count?: string;
  chips: VoiceChip[];
}

interface CommunityPost {
  name: string;
  avatar: string;
  body: string;
  time: string;
  likes: number;
  comments: number;
  copies: number;
}

const siteMedia = "/images/moneytoring/site/_next/static/media";
const logoBase = "/images/moneytoring/stock_logo";
const voiceImageBase = "/images/moneytoring/market_voice_v2/document/image";

const tabs = ["브리프", "기업정보", "재무정보", "투자지표", "실적전망", "밸류체인"];
const filterTabs = ["전체", "공시", "뉴스", "텔레그램", "유튜브", "IR"];

const metrics = [
  { title: "기업규모", rows: [["시가총액", "1,289.1조원"], ["매출액", "333.6조원"]] },
  { title: "수익성", rows: [["영업이익", "43.6조원"], ["EPS", "7,243원"]] },
  { title: "가치평가", rows: [["PER", "30.44배"], ["PBR", "3.45배"], ["PSR", "3.86배"]] },
  { title: "매매동향", rows: [["외국인", "-846,776주"], ["기관", "158,684주"], ["개인", "617,556주"]] },
];

const marketVoices: MarketVoice[] = [
  {
    title: "경기도 동탄·광교 아파트 20억 원 돌파 임박",
    summary: "동탄과 광교의 주요 아파트 단지가 삼성전자와 SK하이닉스 반도체 클러스터 수혜 기대감에 신고가 행진을 이어가고 있습니다.",
    source: "선진짱 주식공부방",
    time: "43분 전",
    image: "d53df0d4-dc3c-4c98-8055-cfc74eaaaa6f.jpg",
    count: "2",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "반도체", value: "-1.58%", trend: "down" },
      { label: "GTX", value: "-3.54%", trend: "down" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
    ],
  },
  {
    title: "삼성전자 파운드리와 메모리 시너지로 기업가치 상승 기대",
    summary: "메모리 회복과 첨단 패키징, 파운드리 수주 확대가 맞물리며 삼성전자의 중장기 기업가치 재평가 기대가 커지고 있습니다.",
    source: "메이저경제TV",
    time: "3시간 전",
    image: "de866e98-82a6-4aa6-af32-e63594028a22.jpg",
    count: "4",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
      { label: "엔비디아", value: "-1.80%", trend: "down", logo: "NVDA.svg" },
    ],
  },
  {
    title: "필라델피아 반도체 지수 상승세 멈추며 증시 변동성 우려 커져",
    summary: "미국 반도체 지수 조정과 빅테크 실적 발표를 앞둔 경계감이 국내 반도체 대표주 수급에도 부담으로 작용하고 있습니다.",
    source: "이데일리",
    time: "5시간 전",
    image: "960a04a1-5776-4f6d-8c38-13b761e1b25e.jpg",
    count: "5",
    chips: [
      { label: "반도체", value: "-1.58%", trend: "down" },
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
    ],
  },
  {
    title: "삼성·SK하이닉스 2024년 1분기 영업이익 급증",
    summary: "AI 서버용 고대역폭 메모리 수요와 범용 메모리 가격 반등이 맞물리며 국내 메모리 업체의 실적 개선 속도가 빨라지고 있습니다.",
    source: "한국경제TV",
    time: "7시간 전",
    image: "25fae27b-8e92-412e-80bd-a0d5f7d4c60f.jpg",
    count: "3",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
      { label: "HBM", value: "-2.83%", trend: "down" },
    ],
  },
  {
    title: "삼성전자·LG유플러스 노조, 성과급 갈등 심화",
    summary: "성과급 제도 개편과 임금 협상을 둘러싼 노사 갈등이 장기화되며 주요 대기업의 비용 부담과 생산 차질 우려가 부각됩니다.",
    source: "연합뉴스",
    time: "8시간 전",
    image: "e30edb53-5384-45da-8757-1b6927228726.jpg",
    count: "6",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "LG유플러스", value: "+1.12%", trend: "up", logo: "A032640.svg" },
    ],
  },
  {
    title: "이재용, 실리콘밸리서 엔비디아와 협력 확대 논의",
    summary: "AI 반도체 공급망과 차세대 메모리 협력 논의가 이어지며 삼성전자의 글로벌 빅테크 네트워크가 다시 주목받고 있습니다.",
    source: "테크M",
    time: "10시간 전",
    image: "4b731593-b4a1-4da6-b411-36d17600fe20.jpg",
    count: "3",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "엔비디아", value: "-1.80%", trend: "down", logo: "NVDA.svg" },
      { label: "구글", value: "+0.64%", trend: "up", logo: "GOOGL.svg" },
    ],
  },
  {
    title: "삼성전자·SK하이닉스, 2026년 주가 수익률 급등",
    summary: "메모리 업황 회복과 AI 인프라 투자 확대가 반도체 대형주의 실적 추정치 상향으로 이어지고 있습니다.",
    source: "머니투데이",
    time: "12시간 전",
    image: "76f8d1d4-7a67-44fd-85f1-0a6c69781a1e.jpg",
    count: "5",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
      { label: "TSMC", value: "+0.36%", trend: "up", logo: "TSM.svg" },
    ],
  },
  {
    title: "삼성 파운드리, 실리콘 포토닉스 광모듈 대량 생산 돌입",
    summary: "데이터센터 전력 효율을 높이는 광모듈 생산 확대가 차세대 패키징과 파운드리 경쟁력 강화로 연결될 전망입니다.",
    source: "전자신문",
    time: "15시간 전",
    image: "904a5139-ae5c-4c91-a963-752e619dafb6.jpg",
    count: "4",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "광모듈", value: "+0.27%", trend: "up" },
      { label: "파운드리", value: "-1.22%", trend: "down" },
    ],
  },
  {
    title: "삼성·SK, 2027년까지 D램 공급 부족 전망",
    summary: "AI 서버 투자 확대로 고성능 D램 수요가 견조하게 이어지는 가운데 증설 속도는 제한적이라는 분석이 나왔습니다.",
    source: "디일렉",
    time: "18시간 전",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "SK하이닉스", value: "-0.54%", trend: "down", logo: "A000660.svg" },
      { label: "D램", value: "-1.73%", trend: "down" },
    ],
  },
  {
    title: "삼성전자·TSMC, 반도체 시장 주도권 경쟁 본격화",
    summary: "첨단 공정 수율과 패키징 기술이 글로벌 고객사 확보의 핵심 변수로 떠오르며 양사의 투자 경쟁이 확대되고 있습니다.",
    source: "블로터",
    time: "20시간 전",
    image: "07e31e09-0857-4076-ae14-b3ad017adbc5.jpg",
    count: "4",
    chips: [
      { label: "삼성전자", value: "-2.43%", trend: "down", logo: "A005930.svg" },
      { label: "TSMC", value: "+0.36%", trend: "up", logo: "TSM.svg" },
      { label: "반도체", value: "-1.58%", trend: "down" },
    ],
  },
];

const communityPosts: CommunityPost[] = [
  {
    name: "llllllllll",
    avatar: "/images/moneytoring/profile/default/krong.png",
    body: "삼전 지금 들어가도 되나요?",
    time: "33분 전",
    likes: 3,
    comments: 9,
    copies: 0,
  },
  {
    name: "EagleEye",
    avatar: "/images/moneytoring/profile/default/oinky.png",
    body: "반도체 업황은 살아나는데 주가는 계속 흔들리네요. 실적 확인하고 분할로 대응합니다.",
    time: "1시간 전",
    likes: 12,
    comments: 5,
    copies: 2,
  },
  {
    name: "밍슈부자만들기",
    avatar: "/images/moneytoring/profile/kakao:3617150390/e60fef08d88bb0492709c3e8664e9eac.jpeg",
    body: "오늘 외국인 매도세가 강해서 종가 흐름을 봐야 할 것 같습니다.",
    time: "2시간 전",
    likes: 8,
    comments: 3,
    copies: 1,
  },
  {
    name: "korea5847",
    avatar: "/images/moneytoring/profile/default/grry.png",
    body: "HBM 뉴스 나올 때마다 반응은 오는데 추세 전환은 아직 멀어 보입니다.",
    time: "3시간 전",
    likes: 4,
    comments: 2,
    copies: 0,
  },
  {
    name: "워렌버디",
    avatar: "/images/moneytoring/profile/default/clucky.png",
    body: "시총 대비 이익 체력이 다시 좋아지는 구간이라 조정 때 관심 있게 보고 있습니다.",
    time: "4시간 전",
    likes: 17,
    comments: 6,
    copies: 3,
  },
];

function Header() {
  const nav = [
    { label: "마켓보이스", href: "/mv" },
    { label: "종목 발굴", href: "/discover/screener/kr" },
    { label: "마켓 정보", href: "/market/indices" },
    { label: "커뮤니티", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-40 h-[60px] border-b border-[#ecf1f3] bg-white">
      <div className="flex h-full items-center px-8">
        <Link href="/" aria-label="Moneytoring home">
          <Image
            src={`${siteMedia}/header.d044c11b.svg`}
            alt="Moneytoring"
            width={145}
            height={22}
            className="h-[22px] w-[145px]"
          />
        </Link>
        <nav className="ml-[250px] flex items-center gap-1 text-[14px] font-semibold text-[#405260]">
          {nav.map((item) => (
            <Link key={item.label} className="rounded-full px-3 py-2 hover:bg-[#f5f8f9]" href={item.href}>
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

function CommunityPanel() {
  return (
    <aside className="fixed right-16 top-[60px] z-20 h-[calc(100vh-60px)] w-[352px] overflow-hidden bg-[#eef3f6]">
      <div className="flex h-full flex-col px-4 pb-[76px] pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-black text-[#102231]">
            삼성전자 <span className="text-[#83909a]">의 커뮤니티</span>
          </h2>
          <button className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[13px] font-bold text-[#5c6a75]">
            최신순
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-hidden">
          {communityPosts.map((post) => (
            <article key={`${post.name}-${post.time}`} className="border-b border-[#dde7ec] py-4">
              <div className="flex items-center">
                <Image src={post.avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                <div className="ml-2 min-w-0 flex-1">
                  <div className="truncate text-[13px] font-black text-[#132534]">{post.name}</div>
                  <div className="text-[11px] font-medium text-[#83909a]">{post.time}</div>
                </div>
                <button className="rounded-full bg-white px-3 py-[6px] text-[12px] font-black text-[#1a2a37]">+ 팔로우</button>
              </div>
              <p className="mt-3 text-[14px] font-semibold leading-5 text-[#263845]">{post.body}</p>
              <div className="mt-3 flex items-center gap-4 text-[12px] font-bold text-[#7d8b95]">
                <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" />{post.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" />{post.comments}</span>
                <span className="flex items-center gap-1"><Copy className="h-4 w-4" />{post.copies}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <button className="absolute bottom-4 left-4 flex h-12 w-[320px] items-center justify-center gap-2 rounded-2xl bg-[#beff00] text-[15px] font-black text-[#05121f] shadow-sm">
        <Send className="h-4 w-4" />
        글쓰기
      </button>
    </aside>
  );
}

function StockHero() {
  return (
    <section className="px-8 pt-6">
      <div className="flex items-start">
        <div className="relative h-16 w-16">
          <Image src={`${logoBase}/A005930.svg`} alt="Samsung Electronics" width={64} height={64} className="h-16 w-16 rounded-full" />
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#e4ebf0]">
            <Star className="h-4 w-4 fill-[#93a0aa] text-[#93a0aa]" />
          </span>
        </div>
        <div className="ml-4 pt-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-black text-[#071827]">삼성전자</h1>
            <span className="rounded-full bg-[#eef3f6] px-2 py-[3px] text-[12px] font-bold text-[#6d7b86]">005930</span>
            <span className="rounded-full bg-[#eef3f6] px-2 py-[3px] text-[12px] font-bold text-[#6d7b86]">코스피</span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <strong className="text-[32px] font-black leading-none text-[#061725]">220,500원</strong>
            <span className="pb-[3px] text-[15px] font-black text-[#1676ed]">-5,500원(-2.43%)</span>
            <span className="pb-[4px] text-[12px] font-semibold text-[#85929c]">26.05.03 00:29 KST</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {["소캠", "고령화", "반도체"].map((tag) => (
              <span key={tag} className="rounded-full bg-[#f1f5f7] px-3 py-[7px] text-[13px] font-black text-[#283946]">{tag}</span>
            ))}
            <span className="rounded-full bg-[#f1f5f7] px-3 py-[7px] text-[13px] font-black text-[#5e6c77]">24개 테마 더보기</span>
            <button className="grid h-8 w-8 place-items-center rounded-full bg-[#e4ebf0]"><Plus className="h-4 w-4 text-[#61707b]" /></button>
          </div>
        </div>
        <div className="ml-auto mt-6 flex gap-2 text-[#74828c]">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-[#eef3f6]"><Link2 className="h-4 w-4" /></button>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-[#eef3f6]"><Share2 className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

function StockTabs() {
  return (
    <div className="mt-8 border-b border-[#e7edf1] px-8">
      <nav className="flex gap-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`relative h-[45px] text-[16px] font-black ${index === 0 ? "text-[#061725]" : "text-[#82909a]"}`}
          >
            {tab}
            {index === 0 && <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#05121f]" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

function IssueHeader() {
  return (
    <div className="mb-4 flex items-center">
      <h2 className="text-[22px] font-black text-[#071827]">주요 이슈</h2>
      <button className="ml-3 flex h-[26px] w-[48px] items-center rounded-full bg-[#1ec765] p-[3px]">
        <span className="ml-auto h-5 w-5 rounded-full bg-white shadow" />
      </button>
      <div className="ml-auto flex items-center gap-2">
        {["1분", "일", "주", "월", "분기", "년"].map((label, index) => (
          <button key={label} className={`h-8 rounded-lg px-3 text-[13px] font-black ${index === 0 ? "bg-[#e6f4ff] text-[#1378f2]" : "bg-[#f1f5f7] text-[#6f7e89]"}`}>
            {label}
          </button>
        ))}
        <button className="flex h-8 items-center gap-1 rounded-lg bg-[#101820] px-3 text-[13px] font-black text-white">
          <Image src={`${siteMedia}/icon-candle.9cd225c1.svg`} alt="" width={14} height={14} />
          캔들
        </button>
        <button className="flex h-8 items-center gap-1 rounded-lg bg-[#eef3f6] px-3 text-[13px] font-black text-[#6b7984]">
          <Image src={`${siteMedia}/icon-line.5344d4a3.svg`} alt="" width={14} height={14} />
          라인
        </button>
        <button className="flex h-8 items-center gap-1 rounded-lg bg-[#eef3f6] px-3 text-[13px] font-black text-[#394a57]">
          <Image src={`${siteMedia}/icon-full.9de3f5e2.svg`} alt="" width={14} height={14} />
          상세 차트 열기
        </button>
      </div>
    </div>
  );
}

function StockChart() {
  const candles = [
    [22, 176, 142, "down"], [40, 164, 132, "up"], [58, 150, 118, "down"], [76, 138, 108, "down"], [94, 128, 100, "up"],
    [112, 142, 112, "up"], [130, 158, 124, "down"], [148, 146, 116, "up"], [166, 132, 102, "up"], [184, 122, 92, "down"],
    [202, 116, 84, "up"], [220, 126, 96, "down"], [238, 152, 116, "down"], [256, 174, 138, "down"], [274, 158, 122, "up"],
    [292, 140, 108, "up"], [310, 126, 94, "up"], [328, 136, 104, "down"], [346, 160, 126, "down"], [364, 184, 146, "down"],
    [382, 172, 136, "up"], [400, 156, 120, "up"], [418, 138, 108, "down"], [436, 130, 96, "up"], [454, 116, 86, "up"],
    [472, 108, 80, "down"], [490, 126, 94, "down"], [508, 144, 108, "up"], [526, 132, 100, "down"], [544, 154, 118, "down"],
  ] as const;

  return (
    <div className="h-[380px] w-[624px] rounded-[8px] bg-white">
      <svg viewBox="0 0 624 380" className="h-full w-full" aria-label="삼성전자 주가 차트">
        {[36, 86, 136, 186, 236, 286].map((y) => <line key={y} x1="6" x2="580" y1={y} y2={y} stroke="#edf2f5" />)}
        {["350,000", "300,000", "250,000", "200,000", "150,000", "100,000"].map((label, index) => (
          <text key={label} x="588" y={40 + index * 50} fill="#7f8d97" fontSize="11">{label}</text>
        ))}
        <line x1="6" x2="580" y1="172" y2="172" stroke="#cbd6dd" strokeDasharray="4 4" />
        <rect x="556" y="160" width="62" height="22" rx="4" fill="#1676ed" />
        <text x="562" y="175" fill="white" fontSize="11" fontWeight="700">220,500</text>
        {candles.map(([x, y1, y2, kind], index) => {
          const color = kind === "up" ? "#ef4b45" : "#207fe5";
          return (
            <g key={`${x}-${index}`}>
              <line x1={x} x2={x} y1={Math.min(y1, y2) - 14} y2={Math.max(y1, y2) + 14} stroke={color} strokeWidth="1" />
              <rect x={x - 5} y={Math.min(y1, y2)} width="10" height={Math.abs(y2 - y1)} rx="1" fill={color} />
            </g>
          );
        })}
        {[
          { x: 100, y: 110, label: "1" },
          { x: 218, y: 88, label: "2" },
          { x: 330, y: 118, label: "3" },
          { x: 452, y: 86, label: "4" },
        ].map(({ x, y, label }) => (
          <g key={label}>
            <circle cx={x} cy={y} r="11" fill="#bfff00" stroke="#0a1825" strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="900" fill="#071827">{label}</text>
          </g>
        ))}
        {[22, 40, 58, 76, 94, 112, 130, 148, 166, 184, 202, 220, 238, 256, 274, 292, 310, 328, 346, 364, 382, 400, 418, 436, 454, 472, 490, 508, 526, 544].map((x, index) => (
          <rect key={x} x={x - 5} y={318 - (index % 7) * 6} width="10" height={24 + (index % 7) * 6} fill={index % 3 === 0 ? "#ef4b45" : "#207fe5"} opacity=".45" />
        ))}
        {["2026", "2월", "3월", "4월", "5월"].map((label, index) => (
          <text key={label} x={40 + index * 128} y="372" fontSize="11" fill="#71808b">{label}</text>
        ))}
      </svg>
    </div>
  );
}

function IssueCard() {
  return (
    <aside className="h-[380px] w-[320px] rounded-[18px] border border-[#dce5ea] bg-white p-5">
      <div className="flex border-b border-[#e7edf1] text-[15px] font-black">
        <button className="relative h-10 pr-5 text-[#05121f]">
          이슈
          <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#05121f]" />
        </button>
        <button className="h-10 px-5 text-[#8a969f]">출처</button>
      </div>
      <div className="mt-5">
        <div className="text-[13px] font-black text-[#1676ed]">26.04.07</div>
        <h3 className="mt-2 text-[20px] font-black leading-[1.35] text-[#071827]">삼성전자 1분기 역대 최대 실적 기록</h3>
        <p className="mt-4 text-[14px] font-semibold leading-[1.75] text-[#405260]">
          삼성전자가 1분기 매출 133조원, 영업이익 57.2조원으로 전년 대비 각각 68%, 755% 증가한 실적을 발표했습니다. 메모리 가격 회복과 AI 반도체 수요가 실적 개선을 견인했습니다.
        </p>
      </div>
    </aside>
  );
}

function MetricCard({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <section className="h-[136px] flex-1 rounded-[16px] border border-[#dfe8ed] bg-white p-4">
      <h3 className="text-[15px] font-black text-[#132534]">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-[#80909a]">{label}</span>
            <span className={`font-black ${value.startsWith("-") ? "text-[#1676ed]" : "text-[#1a2b38]"}`}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiBriefing() {
  return (
    <section className="mt-6 flex min-h-[76px] items-center rounded-[18px] bg-[#eef3f6] px-5">
      <Image src={`${siteMedia}/ai-polygon-left.25eaa28a.svg`} alt="" width={24} height={44} />
      <div className="mx-4 grid h-10 min-w-[82px] place-items-center rounded-full bg-[#0b1824] text-[13px] font-black text-[#beff00]">AI 브리핑</div>
      <p className="line-clamp-2 flex-1 text-[15px] font-bold leading-6 text-[#243542]">
        삼성전자 노조의 대규모 총파업 예고와 성과급 상한 폐지 요구가 노사 갈등을 심화시키고 있습니다. 반도체 업황 회복 기대는 유지되지만 단기 수급 변동성은 커지는 흐름입니다.
      </p>
      <button className="ml-5 flex items-center gap-1 text-[13px] font-black text-[#5d6b76]">
        더보기
        <ChevronRight className="h-4 w-4" />
      </button>
      <Image src={`${siteMedia}/ai-polygon-right.5abaf4b6.svg`} alt="" width={24} height={44} className="ml-3" />
    </section>
  );
}

function SourceIcon({ label }: { label: string }) {
  const map: Record<string, string> = {
    공시: "icon-disclosure.6229b5fb.svg",
    뉴스: "icon-news.8377e0cb.svg",
    텔레그램: "icon-telegram.1d679e80.svg",
    유튜브: "icon-youtube.a0c9b97c.svg",
    IR: "icon-ir.3b43a847.svg",
  };
  const icon = map[label];
  return icon ? <Image src={`${siteMedia}/${icon}`} alt="" width={15} height={15} /> : null;
}

function VoiceChip({ chip }: { chip: VoiceChip }) {
  const color = chip.trend === "up" ? "text-[#ef3934]" : chip.trend === "down" ? "text-[#1477ff]" : "text-[#6d7b86]";
  return (
    <span className="flex h-7 items-center gap-1 rounded-full bg-[#f2f6f8] px-2 text-[12px] font-black text-[#405260]">
      {chip.logo && <Image src={`${logoBase}/${chip.logo}`} alt="" width={16} height={16} className="h-4 w-4 rounded-full" />}
      {chip.label}
      {chip.value && <span className={color}>{chip.value}</span>}
    </span>
  );
}

function MarketVoiceRow({ voice }: { voice: MarketVoice }) {
  return (
    <article className="flex min-h-[178px] border-b border-[#e7edf1] py-5">
      <div className="min-w-0 flex-1 pr-6">
        <h3 className="text-[20px] font-black leading-7 text-[#071827]">{voice.title}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] font-semibold leading-6 text-[#52616c]">{voice.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {voice.chips.map((chip) => <VoiceChip key={`${voice.title}-${chip.label}`} chip={chip} />)}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-[#8a969f]">
          <SourceIcon label="뉴스" />
          <span>{voice.source}</span>
          <span className="h-1 w-1 rounded-full bg-[#b4bec6]" />
          <span>{voice.time}</span>
        </div>
      </div>
      {voice.image && (
        <div className="relative h-[144px] w-[256px] shrink-0 overflow-hidden rounded-[12px] bg-[#dce5ea]">
          <Image src={`${voiceImageBase}/${voice.image}`} alt="" fill sizes="256px" className="object-cover" />
          {voice.count && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2 py-[3px] text-[12px] font-black text-white">
              {voice.count}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function MarketVoiceSection() {
  return (
    <section className="mt-9">
      <div className="flex items-center">
        <h2 className="text-[24px] font-black text-[#071827]">관련 마켓보이스</h2>
        <button className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-[#eef3f6] text-[#74828c]">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-5 flex items-center">
        <div className="flex gap-2">
          {filterTabs.map((tab, index) => (
            <button key={tab} className={`flex h-9 items-center gap-1 rounded-full px-4 text-[14px] font-black ${index === 0 ? "bg-[#151e27] text-white" : "bg-[#f1f5f7] text-[#5f6d78]"}`}>
              <SourceIcon label={tab} />
              {tab}
            </button>
          ))}
        </div>
        <button className="ml-auto flex h-9 items-center gap-1 rounded-full bg-[#f1f5f7] px-4 text-[14px] font-black text-[#5f6d78]">
          최신순
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2">
        {marketVoices.map((voice) => <MarketVoiceRow key={voice.title} voice={voice} />)}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <button className="grid h-8 w-8 place-items-center rounded-full text-[#9aa6ae]"><ChevronLeft className="h-4 w-4" /></button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button key={page} className={`grid h-8 w-8 place-items-center rounded-full text-[14px] font-black ${page === 1 ? "bg-[#0f1c28] text-white" : "text-[#6c7983]"}`}>
            {page}
          </button>
        ))}
        <button className="grid h-8 w-8 place-items-center rounded-full text-[#5d6b76]"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

export default function StockBriefPage() {
  return (
    <div className="min-w-[1376px] bg-white text-[#142434]">
      <Header />
      <RightRail />
      <CommunityPanel />
      <main className="w-[1024px] pb-16">
        <StockHero />
        <StockTabs />
        <section className="px-8 pt-6">
          <IssueHeader />
          <div className="flex gap-4">
            <StockChart />
            <IssueCard />
          </div>
          <div className="mt-4 flex gap-3">
            {metrics.map((metric) => <MetricCard key={metric.title} title={metric.title} rows={metric.rows} />)}
          </div>
          <AiBriefing />
          <MarketVoiceSection />
        </section>
      </main>
    </div>
  );
}
