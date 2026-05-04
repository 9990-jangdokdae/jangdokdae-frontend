"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight, Clock3, Search, Star, X } from "lucide-react";
import {
  companyOptions,
  defaultInterestProfile,
  interestStorageKey,
  issues,
  matchesInterest,
  onboardingStorageKey,
  sectorOptions,
} from "@/lib/jangdokdae-data";
import type { InterestOption, InterestProfile, Issue } from "@/types/jangdokdae";

const demoAuthStorageKey = "jangdokdae.demo-auth.v1";

function readStoredProfile(): InterestProfile {
  if (typeof window === "undefined") return defaultInterestProfile;

  const stored = window.localStorage.getItem(interestStorageKey);
  if (!stored) return defaultInterestProfile;

  try {
    const parsed = JSON.parse(stored) as Partial<InterestProfile>;
    return {
      sectors: Array.isArray(parsed.sectors) ? parsed.sectors : defaultInterestProfile.sectors,
      companies: Array.isArray(parsed.companies) ? parsed.companies : defaultInterestProfile.companies,
    };
  } catch {
    return defaultInterestProfile;
  }
}

function formatCollectedAt(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function toggleItem(items: string[], item: string) {
  if (items.includes(item)) return items.filter((value) => value !== item);
  return [...items, item];
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="장독대 홈">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c96442] text-[20px] font-semibold text-white">장</span>
      <span className="leading-none">
        <span className={`block text-[20px] font-semibold ${inverse ? "text-[#ffffff]" : "text-[#1d1d1f]"}`}>장독대</span>
        <span className={`mt-1 block text-[11px] font-medium ${inverse ? "text-[#cccccc]" : "text-[#7a7a7a]"}`}>시장 독해를 대신 해드립니다</span>
      </span>
    </Link>
  );
}

function Header({
  isLoggedIn,
  onOpenLogin,
  onLogout,
}: {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 h-[64px] border-b border-[#e0e0e0] bg-[#ffffff]/95 backdrop-blur">
      <div className="flex h-full items-center px-8">
        <BrandMark />
        <nav className="ml-[220px] flex items-center gap-1 text-[14px] font-semibold text-[#1d1d1f]">
          {["오늘의 독해", "이슈", "마켓 정보"].map((item, index) => (
            <Link
              key={item}
              href={index === 0 ? "/" : index === 1 ? "/mv" : index === 2 ? "/market/indices" : "#"}
              className={`rounded-full px-3 py-2 ${index === 0 ? "bg-[#f7f8fa] text-[#1d1d1f]" : "hover:bg-[#fbfcfd]"}`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <button className="ml-3 flex h-9 w-[220px] items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-3 text-[13px] text-[#7a7a7a]">
          <Search className="h-[17px] w-[17px]" />
          이슈, 종목, 용어 검색
        </button>
        <Bell className="ml-auto h-5 w-5 text-[#7a7a7a]" />
        {isLoggedIn ? (
          <div className="ml-7 flex items-center gap-2">
            <button
              className="h-10 rounded-lg border border-[#e0e0e0] bg-white px-4 text-[14px] font-semibold text-[#1d1d1f]"
              type="button"
            >
              데모 사용자
            </button>
            <button
              className="h-10 rounded-lg bg-[#1d1d1f] px-4 text-[14px] font-semibold text-white transition hover:bg-[#333333]"
              onClick={onLogout}
              type="button"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            className="ml-7 h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white transition hover:bg-[#b65335]"
            onClick={onOpenLogin}
            type="button"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

function Rail({ onOpenInterests }: { onOpenInterests: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <button
        className={`fixed right-3 top-[76px] z-40 grid h-8 w-8 place-items-center rounded-full border border-[#e0e0e0] bg-[#ffffff] text-[#7a7a7a] transition hover:bg-[#fbfcfd] hover:text-[#1d1d1f] ${
          collapsed ? "shadow-[0_8px_24px_rgba(20,20,19,0.08)]" : ""
        }`}
        onClick={() => setCollapsed((value) => !value)}
        type="button"
        aria-label={collapsed ? "우측 패널 펼치기" : "우측 패널 접기"}
        aria-expanded={!collapsed}
      >
        {collapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      <aside
        className={`fixed bottom-0 right-0 top-[64px] z-30 flex w-16 flex-col items-center gap-6 border-l border-[#f0f0f0] bg-[#ffffff] pt-[68px] text-[#7a7a7a] transition-transform duration-200 ${
          collapsed ? "translate-x-full" : "translate-x-0"
        }`}
        aria-hidden={collapsed}
      >
          <div className="flex flex-col items-center gap-1 text-[11px]"><Clock3 className="h-5 w-5" />최근 본</div>
          <button className="flex flex-col items-center gap-1 text-[11px] text-[#1d1d1f]" onClick={onOpenInterests} type="button">
            <Star className="h-5 w-5 fill-[#c96442] text-[#c96442]" />
            내 관심
          </button>
      </aside>
    </>
  );
}

function OptionGrid({
  options,
  selected,
  onToggle,
}: {
  options: InterestOption[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button
            key={option.id}
            className={`min-h-[82px] rounded-lg border p-4 text-left transition ${
              active ? "border-[#c96442] bg-[#fff1ec] shadow-[0_0_0_1px_#c96442]" : "border-[#e0e0e0] bg-white hover:border-[#c96442]/60"
            }`}
            onClick={() => onToggle(option.id)}
          >
            <span className="block text-[15px] font-semibold text-[#1d1d1f]">{option.label}</span>
            {option.description && <span className="mt-2 block text-[13px] leading-5 text-[#7a7a7a]">{option.description}</span>}
          </button>
        );
      })}
    </div>
  );
}

function InterestEditor({
  profile,
  onChange,
  compact = false,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-7">
      <section>
        <p className="mb-3 text-[13px] font-semibold text-[#7a7a7a]">관심 섹터</p>
        <OptionGrid
          options={sectorOptions}
          selected={profile.sectors}
          onToggle={(sector) => onChange({ ...profile, sectors: toggleItem(profile.sectors, sector) })}
        />
      </section>
      <section>
        <p className="mb-3 text-[13px] font-semibold text-[#7a7a7a]">관심 종목</p>
        <OptionGrid
          options={companyOptions}
          selected={profile.companies}
          onToggle={(company) => onChange({ ...profile, companies: toggleItem(profile.companies, company) })}
        />
      </section>
      {!compact && <p className="text-[13px] leading-5 text-[#7a7a7a]">섹터는 최소 1개 이상 선택해야 오늘의 관심 이슈가 만들어져요. 종목은 지금 몰라도 괜찮습니다.</p>}
    </div>
  );
}

function Onboarding({
  profile,
  onChange,
  onComplete,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const canContinue = step === 1 ? profile.sectors.length > 0 : profile.sectors.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/45 px-6">
      <section className="grid max-h-[88vh] w-[920px] grid-cols-[310px_1fr] overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_24px_80px_rgba(20,20,19,0.22)]">
        <div className="bg-[#000000] p-8 text-[#ffffff]">
          <BrandMark inverse />
          <div className="mt-16">
            <p className="text-[13px] font-semibold text-[#cccccc]">첫 로그인 온보딩</p>
            <h1 className="mt-4 text-[36px] font-normal leading-[1.12]">오늘 읽을 시장을 먼저 골라볼까요.</h1>
            <p className="mt-5 text-[15px] leading-6 text-[#cccccc]">장독대는 선택한 관심사와 가까운 이슈를 먼저 꺼내두고, 어려운 뉴스를 쉬운 말과 퀴즈로 바꿔 보여줍니다.</p>
          </div>
          <div className="mt-16 flex gap-2">
            <span className={`h-2 flex-1 rounded-full ${step === 1 ? "bg-[#c96442]" : "bg-[#333333]"}`} />
            <span className={`h-2 flex-1 rounded-full ${step === 2 ? "bg-[#c96442]" : "bg-[#333333]"}`} />
          </div>
        </div>

        <div className="overflow-y-auto p-8">
          <p className="text-[13px] font-semibold text-[#c96442]">{step} / 2</p>
          <h2 className="mt-2 text-[28px] font-semibold text-[#1d1d1f]">{step === 1 ? "관심 섹터를 선택하세요" : "관심 종목을 선택하세요"}</h2>
          <p className="mt-3 text-[15px] leading-6 text-[#7a7a7a]">
            {step === 1 ? "넓은 관심사를 먼저 고르면 내 관심 이슈의 기준이 됩니다." : "아는 종목만 골라도 충분합니다. 나중에 우측 내 관심에서 바꿀 수 있어요."}
          </p>

          <div className="mt-7">
            {step === 1 ? (
              <OptionGrid
                options={sectorOptions}
                selected={profile.sectors}
                onToggle={(sector) => onChange({ ...profile, sectors: toggleItem(profile.sectors, sector) })}
              />
            ) : (
              <OptionGrid
                options={companyOptions}
                selected={profile.companies}
                onToggle={(company) => onChange({ ...profile, companies: toggleItem(profile.companies, company) })}
              />
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button className="h-10 rounded-lg px-4 text-[14px] font-semibold text-[#7a7a7a] hover:bg-[#fbfcfd]" onClick={() => setStep(1)} disabled={step === 1}>
              이전
            </button>
            {step === 1 ? (
              <button className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white disabled:bg-[#e0e0e0] disabled:text-[#7a7a7a]" disabled={!canContinue} onClick={() => setStep(2)}>
                다음
              </button>
            ) : (
              <button className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white disabled:bg-[#e0e0e0] disabled:text-[#7a7a7a]" disabled={!canContinue} onClick={onComplete}>
                장독대 시작하기
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginModal({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("demo@jangdokdae.ai");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");

    if (!email.includes("@")) {
      setError("이메일 형식으로 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/45 px-6" onClick={onClose}>
      <section
        className="w-[460px] rounded-xl bg-[#ffffff] p-7 shadow-[0_24px_80px_rgba(20,20,19,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#c96442]">데모 로그인</p>
            <h2 className="mt-2 text-[28px] font-semibold text-[#1d1d1f]">장독대 시작하기</h2>
            <p className="mt-3 text-[14px] leading-6 text-[#7a7a7a]">로그인하면 관심사 선택 온보딩을 바로 확인할 수 있어요.</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]" aria-label="로그인 닫기" onClick={onClose} type="button">
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>
        </div>

        <form className="mt-7 space-y-4" onSubmit={submitLogin}>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]">이메일</span>
            <input
              className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-[15px] text-[#1d1d1f] outline-none transition focus:border-[#c96442] focus:ring-2 focus:ring-[#c96442]/15"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="demo@jangdokdae.ai"
              type="email"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]">비밀번호</span>
            <input
              className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-[15px] text-[#1d1d1f] outline-none transition focus:border-[#c96442] focus:ring-2 focus:ring-[#c96442]/15"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              type="password"
            />
          </label>

          {error && <p className="rounded-lg bg-[#fff1ec] px-4 py-3 text-[13px] font-semibold text-[#b65335]">{error}</p>}
          {notice && <p className="rounded-lg bg-[#fbfcfd] px-4 py-3 text-[13px] font-semibold text-[#7a7a7a]">{notice}</p>}

          <button className="h-12 w-full rounded-lg bg-[#c96442] text-[15px] font-semibold text-white transition hover:bg-[#b65335]" type="submit">
            로그인
          </button>
        </form>

        <div className="mt-5 flex justify-center gap-2 text-[13px] text-[#7a7a7a]">
          <span>처음이신가요?</span>
          <button
            className="font-semibold text-[#c96442] hover:text-[#b65335]"
            onClick={() => {
              setError("");
              setNotice("데모에서는 로그인으로 바로 체험할 수 있어요.");
            }}
            type="button"
          >
            회원가입
          </button>
        </div>
      </section>
    </div>
  );
}

function InterestDrawer({
  profile,
  onChange,
  onClose,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/25" onClick={onClose}>
      <aside className="ml-auto h-full w-[460px] overflow-y-auto bg-[#ffffff] p-7 shadow-[-18px_0_50px_rgba(20,20,19,0.16)]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#c96442]">내 관심</p>
            <h2 className="mt-2 text-[26px] font-semibold text-[#1d1d1f]">관심 섹터와 종목</h2>
            <p className="mt-3 text-[14px] leading-6 text-[#7a7a7a]">선택을 바꾸면 홈의 내 관심 이슈가 바로 다시 정렬됩니다.</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]" aria-label="닫기" onClick={onClose}>
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>
        </div>
        <div className="mt-8">
          <InterestEditor profile={profile} onChange={onChange} compact />
        </div>
      </aside>
    </div>
  );
}

function IssueCard({ issue, featured = false }: { issue: Issue; featured?: boolean }) {
  return (
    <Link
      href={`/mv/${issue.id}`}
      className={`group block rounded-lg border border-[#e0e0e0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c96442] hover:shadow-[0_12px_30px_rgba(20,20,19,0.08)] ${
        featured ? "min-h-[230px]" : "min-h-[190px]"
      }`}
    >
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#7a7a7a]">
        <span>{issue.source.name}</span>
        <span className="h-1 w-1 rounded-full bg-[#e0e0e0]" />
        <span>{formatCollectedAt(issue.collectedAt)} 수집</span>
      </div>
      <h3 className="ko-title mt-4 text-[21px] font-semibold leading-7 text-[#1d1d1f] group-hover:text-[#b65335]">{issue.title}</h3>
      <p className="ko-body mt-4 line-clamp-3 text-[15px] leading-6 text-[#1d1d1f]">{issue.translation.explanation[0]}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[...issue.sectors, ...issue.companies].map((tag) => (
          <span key={tag} className="ko-label rounded-full bg-[#fbfcfd] px-3 py-1 text-[12px] font-semibold text-[#7a7a7a]">{tag}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center text-[14px] font-semibold text-[#c96442]">
        쉽게 읽기
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function IssueSection({ title, description, items, empty }: { title: string; description: string; items: Issue[]; empty?: string }) {
  return (
    <section className="py-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="ko-title text-[26px] font-semibold text-[#1d1d1f]">{title}</h2>
          <p className="ko-body mt-2 text-[14px] text-[#7a7a7a]">{description}</p>
        </div>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {items.map((issue, index) => <IssueCard key={issue.id} issue={issue} featured={index === 0} />)}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[#e0e0e0] bg-[#fbfcfd] p-7 text-[15px] leading-6 text-[#7a7a7a]">{empty}</div>
      )}
    </section>
  );
}

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState<InterestProfile>(defaultInterestProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInterests, setShowInterests] = useState(false);

  useEffect(() => {
    window.queueMicrotask(() => {
      const storedProfile = readStoredProfile();
      const loggedIn = window.localStorage.getItem(demoAuthStorageKey) === "true";
      setProfile(storedProfile);
      setIsLoggedIn(loggedIn);
      setShowOnboarding(false);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(interestStorageKey, JSON.stringify(profile));
  }, [hydrated, profile]);

  const personalizedIssues = useMemo(() => issues.filter((issue) => matchesInterest(issue, profile)), [profile]);
  const handleDemoLogin = () => {
    window.localStorage.setItem(demoAuthStorageKey, "true");
    window.localStorage.removeItem(onboardingStorageKey);
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowOnboarding(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(demoAuthStorageKey);
    window.localStorage.removeItem(onboardingStorageKey);
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowOnboarding(false);
  };

  const completeOnboarding = () => {
    window.localStorage.setItem(onboardingStorageKey, "true");
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header isLoggedIn={isLoggedIn} onOpenLogin={() => setShowLogin(true)} onLogout={handleLogout} />
      <Rail onOpenInterests={() => setShowInterests(true)} />

      <main className="mx-[100px] w-[1176px] bg-[#ffffff] pb-24 pt-8">
        <section className="border-b border-[#e0e0e0] pb-10">
          <div>
            <h1 className="max-w-[760px] text-[64px] font-normal leading-[1.04] text-[#1d1d1f]">
              시장 독해를
              <span className="mt-2 block w-fit rounded-lg bg-[#000000] px-4 py-2 text-[#ffffff]">대신 해드립니다</span>
            </h1>
          </div>
        </section>

        <IssueSection
          title="내 관심 이슈"
          description="온보딩에서 고른 섹터와 종목에 맞춰 먼저 보여드려요."
          items={personalizedIssues}
          empty="아직 선택한 관심사와 딱 맞는 이슈가 없어요. 우측 내 관심에서 관심사를 넓히거나 아래 전체 시장 이슈를 확인해보세요."
        />

        <IssueSection
          title="오늘의 전체 시장 이슈"
          description="관심사 밖의 흐름도 놓치지 않도록 함께 모아두었습니다."
          items={issues}
        />
      </main>

      <footer className="border-t border-[#e0e0e0] bg-[#ffffff] px-8 py-10 text-[13px] leading-6 text-[#7a7a7a]">
        <strong className="text-[#1d1d1f]">장독대</strong>
        <p className="mt-2">제공되는 정보는 학습과 시장 이해를 위한 콘텐츠이며, 특정 종목의 매수 또는 매도 권유가 아닙니다.</p>
      </footer>

      {hydrated && showOnboarding && <Onboarding profile={profile} onChange={setProfile} onComplete={completeOnboarding} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleDemoLogin} />}
      {showInterests && <InterestDrawer profile={profile} onChange={setProfile} onClose={() => setShowInterests(false)} />}
    </div>
  );
}
