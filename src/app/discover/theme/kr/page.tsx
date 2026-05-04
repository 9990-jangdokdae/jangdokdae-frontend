import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock3,
  HelpCircle,
  LogIn,
  Search,
  Star,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "테마찾기 | 머니터링",
  description: "Moneytoring Korean theme discovery clone",
};

interface ThemeCardData {
  title: string;
  cumulativeReturn: string;
  count: string;
  up: number;
  down: number;
  flat: number;
  logos: string[];
  spark: string;
}

interface ThemeRowData {
  rank: number;
  name: string;
  stockCount: number;
  up: number;
  down: number;
  flat: number;
  leader: string;
  leaderLogo: string;
  day: string;
  week: string;
  month: string;
  quarter: string;
  year: string;
}

const siteMedia = "/images/moneytoring/site/_next/static/media";
const stockBase = "/images/moneytoring/stock_logo";

const themeCards: ThemeCardData[] = [
  {
    title: "화력발전",
    cumulativeReturn: "+40.85%",
    count: "6개 종목 중",
    up: 1,
    down: 5,
    flat: 0,
    logos: ["A010060.svg", "A015760.png", "A078930.svg"],
    spark: "M0 40 L3 8 L15 8 L27 9 L39 8 L51 9 L63 8 L78 8",
  },
  {
    title: "차량대여",
    cumulativeReturn: "+10.12%",
    count: "3개 종목 중",
    up: 3,
    down: 0,
    flat: 0,
    logos: ["A089860.svg", "A403550.svg", "A038390.svg"],
    spark: "M0 22 L11 23 L22 24 L33 23 L44 24 L55 23 L66 23 L78 22",
  },
  {
    title: "운송장비임대",
    cumulativeReturn: "+9.14%",
    count: "7개 종목 중",
    up: 3,
    down: 4,
    flat: 0,
    logos: ["A065450.svg", "A010060.svg", "A089860.svg"],
    spark: "M0 32 L3 13 L15 14 L27 18 L39 18 L51 17 L63 18 L78 17",
  },
  {
    title: "전선",
    cumulativeReturn: "+5.65%",
    count: "20개 종목 중",
    up: 10,
    down: 10,
    flat: 0,
    logos: ["A004360.svg", "A010170.svg", "A001440.svg"],
    spark: "M0 28 L9 20 L18 22 L27 12 L36 11 L45 8 L54 9 L63 7 L72 10 L78 6",
  },
  {
    title: "요소수",
    cumulativeReturn: "+4.79%",
    count: "8개 종목 중",
    up: 5,
    down: 3,
    flat: 0,
    logos: ["A006340.png", "A025860.svg", "A001740.svg"],
    spark: "M0 18 L11 18 L22 17 L33 18 L44 15 L55 15 L66 12 L78 11",
  },
];

const themeRows: ThemeRowData[] = [
  { rank: 1, name: "개성공단", stockCount: 15, up: 2, down: 13, flat: 0, leader: "한국전력", leaderLogo: "A015760.png", day: "+45.08%", week: "+47.71%", month: "+65.27%", quarter: "+50.13%", year: "+145.01%" },
  { rank: 2, name: "화력발전", stockCount: 6, up: 1, down: 5, flat: 0, leader: "OCI홀딩스", leaderLogo: "A010060.svg", day: "+40.85%", week: "+43.95%", month: "+76.47%", quarter: "+93.19%", year: "+192.82%" },
  { rank: 3, name: "모바일기기", stockCount: 22, up: 3, down: 15, flat: 4, leader: "삼성전자", leaderLogo: "A005930.svg", day: "+27.53%", week: "+29.17%", month: "+56.90%", quarter: "+38.14%", year: "+174.09%" },
  { rank: 4, name: "비금속광물", stockCount: 10, up: 1, down: 8, flat: 1, leader: "일진홀딩스", leaderLogo: "A015860.svg", day: "+25.73%", week: "+28.22%", month: "+40.85%", quarter: "+43.58%", year: "+54.93%" },
  { rank: 5, name: "차량대여", stockCount: 3, up: 3, down: 0, flat: 0, leader: "롯데렌탈", leaderLogo: "A089860.svg", day: "+10.12%", week: "+17.72%", month: "+24.74%", quarter: "+15.85%", year: "+18.24%" },
  { rank: 6, name: "운송장비임대", stockCount: 7, up: 3, down: 4, flat: 0, leader: "빅텍", leaderLogo: "A065450.svg", day: "+9.14%", week: "+14.18%", month: "+19.47%", quarter: "+11.04%", year: "+55.97%" },
  { rank: 7, name: "시멘트", stockCount: 17, up: 3, down: 13, flat: 1, leader: "삼표시멘트", leaderLogo: "A038500.svg", day: "+7.70%", week: "+10.36%", month: "+14.15%", quarter: "+31.71%", year: "+54.69%" },
  { rank: 8, name: "가공/석회", stockCount: 18, up: 3, down: 14, flat: 1, leader: "삼표시멘트", leaderLogo: "A038500.svg", day: "+7.31%", week: "+9.97%", month: "+13.84%", quarter: "+31.20%", year: "+52.85%" },
  { rank: 9, name: "카메라모듈", stockCount: 28, up: 10, down: 14, flat: 4, leader: "삼성전기", leaderLogo: "A009150.png", day: "+6.00%", week: "+13.26%", month: "+53.53%", quarter: "+77.13%", year: "+212.71%" },
  { rank: 10, name: "연예기획사", stockCount: 15, up: 4, down: 8, flat: 3, leader: "하이브", leaderLogo: "A352820.svg", day: "+5.92%", week: "+8.37%", month: "+6.36%", quarter: "-13.90%", year: "-4.50%" },
];

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

function LogoStack({ logos }: { logos: string[] }) {
  return (
    <div className="flex w-[58px] shrink-0">
      {logos.map((logo, index) => (
        <Image
          key={`${logo}-${index}`}
          src={`${stockBase}/${logo}`}
          alt=""
          width={22}
          height={22}
          className={`h-[22px] w-[22px] rounded-full border border-white bg-white object-contain ${index > 0 ? "-ml-[8px]" : ""}`}
        />
      ))}
    </div>
  );
}

function ThemeCard({ card }: { card: ThemeCardData }) {
  return (
    <article className="h-[168px] w-[300px] shrink-0 rounded-[22px] bg-[#f5f8f9] p-5">
      <div className="flex items-start">
        <h3 className="text-[18px] font-black leading-6 text-[#061725]">{card.title}</h3>
        <Star className="ml-auto h-4 w-4 fill-[#dbe4e9] text-[#dbe4e9]" />
      </div>
      <div className="mt-6 grid grid-cols-[1fr_86px] items-end">
        <div>
          <p className="text-[11px] font-black text-[#334552]">누적 수익률</p>
          <strong className="mt-1 block text-[26px] font-black leading-none text-[#ff403a]">{card.cumulativeReturn}</strong>
        </div>
        <svg viewBox="0 0 82 48" className="h-12 w-[82px]" aria-hidden="true">
          <path d={`${card.spark} L78 48 L0 48 Z`} fill="#ffb7b2" opacity=".42" />
          <path d={card.spark} fill="none" stroke="#ff403a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-5 flex items-center">
        <LogoStack logos={card.logos} />
        <span className="ml-1 text-[13px] font-bold text-[#5f6d78]">{card.count}</span>
        <span className="ml-auto flex items-center gap-2 text-[12px] font-black">
          <span className="text-[#ff403a]">▲ {card.up}</span>
          <span className="text-[#1477ff]">▼ {card.down}</span>
          <span className="text-[#8a969f]">- {card.flat}</span>
        </span>
      </div>
    </article>
  );
}

function QueryBuilder() {
  return (
    <section className="mt-11">
      <div className="flex items-center">
        <h2 className="text-[24px] font-black leading-8 text-[#142434]">조건으로 테마찾기</h2>
        <span className="ml-auto pt-10 text-[12px] font-semibold text-[#9aa6ae]">2026-04-30 15:50 KST 기준</span>
      </div>
      <div className="mt-6 flex items-center gap-3 text-[17px] font-bold text-[#61707b]">
        <button className="flex h-9 items-center gap-1 border-b border-[#aeb9c1] text-[#142434]">
          돈이 몰리는
          <ChevronDown className="h-4 w-4" />
        </button>
        <span>테마들 중에서</span>
        <button className="ml-3 flex h-9 items-center gap-1 border-b border-[#aeb9c1] text-[#142434]">
          1일
          <ChevronDown className="h-4 w-4" />
        </button>
        <span>동안 수익률이 가장 높은 5개 테마에요</span>
      </div>
      <div className="relative mt-12 flex h-[168px] overflow-hidden">
        <div className="flex gap-4">
          {themeCards.map((card) => <ThemeCard key={card.title} card={card} />)}
        </div>
        <button className="absolute right-1 top-[65px] grid h-10 w-10 place-items-center rounded-xl border border-[#dbe4e9] bg-white text-[#405260] shadow-sm">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function InterestThemes() {
  const chips = ["AI", "반도체", "양자컴퓨터", "메모리반도체", "광통신장비", "방산", "데이터센터", "국제유가", "풍력발전설비", "우주항공"];

  return (
    <section className="mt-[90px]">
      <div className="flex items-center">
        <h2 className="text-[24px] font-black leading-8 text-[#142434]">인기 관심 테마</h2>
        <HelpCircle className="ml-1 h-4 w-4 fill-[#74828c] text-white" />
      </div>
      <div className="mt-5 flex gap-2">
        {chips.map((chip) => (
          <button key={chip} className="h-9 rounded-full bg-[#f1f5f7] px-4 text-[14px] font-bold text-[#405260]">
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
}

function ReturnText({ value }: { value: string }) {
  return <span className={value.startsWith("-") ? "text-[#1477ff]" : "text-[#ff403a]"}>{value}</span>;
}

function ThemeTableHeader() {
  return (
    <div className="mt-4">
      <div className="grid h-10 grid-cols-[44px_44px_190px_140px_200px_250px_90px_90px_90px_90px_90px] items-center border-y border-[#e7edf1] text-[13px] font-semibold text-[#7f8d97]">
        <span />
        <span />
        <span>테마정보</span>
        <span className="text-center">종목 수</span>
        <span>기업 등락 추이</span>
        <span>대표 종목</span>
        <span className="col-span-5 text-center">테마 수익률</span>
      </div>
      <div className="grid h-10 grid-cols-[44px_44px_190px_140px_200px_250px_90px_90px_90px_90px_90px] items-center border-b border-[#e7edf1] text-[13px] font-bold text-[#61707b]">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        {["1일 ↓", "1주 ↕", "1달 ↕", "3달 ↕", "1년 ↕"].map((label, index) => (
          <span key={label} className={`text-center ${index === 0 ? "text-[#263845]" : ""}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function ThemeRow({ row }: { row: ThemeRowData }) {
  return (
    <div className="grid h-[58px] grid-cols-[44px_44px_190px_140px_200px_250px_90px_90px_90px_90px_90px] items-center border-b border-[#edf2f5] text-[14px] font-semibold text-[#263845]">
      <div className="grid place-items-center">
        <Star className="h-[17px] w-[17px] fill-[#e2e9ee] text-[#e2e9ee]" />
      </div>
      <span className="text-[#94a1aa]">{row.rank}</span>
      <span className="font-black text-[#2a3b48]">{row.name}</span>
      <span className="text-center">{row.stockCount}</span>
      <span className="flex gap-4 text-[12px] font-black">
        <span className="text-[#ff403a]">▲ {row.up}</span>
        <span className="text-[#1477ff]">▼ {row.down}</span>
        <span className="text-[#9aa6ae]">- {row.flat}</span>
      </span>
      <span className="flex items-center gap-2">
        <Image src={`${stockBase}/${row.leaderLogo}`} alt="" width={24} height={24} className="h-6 w-6 rounded-full bg-white object-contain" />
        {row.leader}
      </span>
      <span className="text-center"><ReturnText value={row.day} /></span>
      <span className="text-center"><ReturnText value={row.week} /></span>
      <span className="text-center"><ReturnText value={row.month} /></span>
      <span className="text-center"><ReturnText value={row.quarter} /></span>
      <span className="text-center"><ReturnText value={row.year} /></span>
    </div>
  );
}

function ThemeList() {
  return (
    <section className="mt-[62px]">
      <h2 className="text-[26px] font-black leading-8 text-[#142434]">테마 리스트</h2>
      <div className="mt-5 flex gap-5 border-b border-[#e7edf1] text-[14px] font-black">
        <button className="h-9 text-[#8a969f]">관심 테마</button>
        <button className="relative h-9 text-[#142434]">
          전체 테마
          <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#142434]" />
        </button>
      </div>
      <ThemeTableHeader />
      <div>
        {themeRows.map((row) => <ThemeRow key={row.rank} row={row} />)}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 text-[16px] font-black">
        <ChevronsLeft className="h-5 w-5 text-[#e6edf1]" />
        <ChevronLeft className="h-5 w-5 text-[#e6edf1]" />
        {[1, 2, 3, 4, 5].map((page) => (
          <button key={page} className={`grid h-8 w-8 place-items-center rounded-full ${page === 1 ? "bg-[#dfe7ec] text-[#142434]" : "text-[#111820]"}`}>
            {page}
          </button>
        ))}
        <ChevronRight className="h-5 w-5 text-[#b8c3cb]" />
        <ChevronsRight className="h-5 w-5 text-[#b8c3cb]" />
      </div>
    </section>
  );
}

function Notice() {
  return (
    <section className="mt-[58px] flex gap-3 text-[#95a2ab]">
      <span className="mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#aeb9c1] text-[11px] font-black text-white">i</span>
      <div>
        <h2 className="text-[14px] font-black text-[#7c8994]">주의사항</h2>
        <p className="mt-2 text-[13px] font-medium leading-5">
          테마찾기의 테마, 종목은 객관적 지표(적용조건)에 따라 자동 추출된 것으로, 당사의 주관적 의견이나 투자 권유가 반영되지 않았습니다.
          <br />
          투자 제안, 권유, 자문 목적이 아닌 단순 참고용 자료임을 유의하시기 바랍니다.
        </p>
      </div>
    </section>
  );
}

export default function KoreanThemeDiscoveryPage() {
  return (
    <div className="min-w-[1376px] bg-white text-[#142434]">
      <Header />
      <RightRail />
      <main className="mx-8 mb-16 w-[1312px] pt-5">
        <section className="flex items-end gap-4">
          <Link href="/discover/screener/kr" className="pb-3 text-[28px] font-black leading-9 text-[#a5b0b9]">
            종목찾기
          </Link>
          <h1 className="border-b-2 border-[#111820] pb-[10px] text-[28px] font-black leading-9 tracking-normal">테마찾기</h1>
        </section>

        <section className="mt-7 flex gap-2">
          <button className="h-10 rounded-full bg-[#111820] px-5 text-[15px] font-bold text-white">한국</button>
          <button className="h-10 rounded-full bg-[#eef3f6] px-5 text-[15px] font-bold text-[#8d99a3]">미국</button>
        </section>

        <QueryBuilder />
        <InterestThemes />
        <ThemeList />
        <Notice />
      </main>
    </div>
  );
}
