"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight, Clock3, Search, Star, X } from "lucide-react";
import {
  companyOptions,
  ONBOARDING_INITIAL_PROFILE,
  sectorOptions,
} from "@/lib/jangdokdae-data";
import { fetchIssueDocentList } from "@/lib/issue-docent";
import { matchesInterest } from "@/lib/issue-match";
import type { InterestProfile, Issue, User } from "@/types/jangdokdae";
import { toggleItem } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useInterestProfile } from "@/hooks/useInterestProfile";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { LogoutConfirmModal } from "@/app/auth/LogoutConfirmModal";
import { OnboardingModal } from "@/app/onboarding/OnboardingModal";
import { BrandMark } from "@/components/ui/BrandMark";
import { OptionGrid } from "@/components/ui/OptionGrid";

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

function Header({
  isLoggedIn,
  isLoading,
  user,
  onOpenLogin,
  onLogout,
}: {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
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
        {isLoading ? (
          // 인증 상태 확인 중: 로그인/로그아웃 버튼이 깜빡이지 않도록 스켈레톤 표시
          <div className="ml-7 h-10 w-28 animate-pulse rounded-lg bg-[#f0f0f0]" />
        ) : isLoggedIn ? (
          <div className="ml-7 flex items-center gap-2">
            <button
              className="h-10 rounded-lg border border-[#e0e0e0] bg-white px-4 text-[14px] font-semibold text-[#1d1d1f]"
              type="button"
            >
              {user?.nickname ?? "사용자"}
            </button>
            <button
              className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white transition hover:bg-[#b65335]"
              onClick={() => setShowLogoutConfirm(true)}
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
    {showLogoutConfirm && (
      <LogoutConfirmModal
        onConfirm={() => { setShowLogoutConfirm(false); onLogout(); }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    )}
    </>
  );
}

function Rail({ isLoggedIn, onOpenInterests }: { isLoggedIn: boolean; onOpenInterests: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoggedIn) return null;

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


function InterestDrawer({
  profile,
  onChange,
  onClose,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onClose: () => void;
}) {
  useLockBodyScroll();

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
  const { user, isLoggedIn, isLoading: authLoading, openLoginModal, logout } = useAuth();
  const { profile, saveProfile, isLoading: profileLoading } = useInterestProfile();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(true);

  const [hydrated, setHydrated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  // 온보딩 중 임시 선택 상태 (완료 전까지 서버에 저장하지 않음)
  const [draftProfile, setDraftProfile] = useState<InterestProfile>(ONBOARDING_INITIAL_PROFILE);

  // hydration 완료 표시: useEffect는 클라이언트에서만 실행되므로 직접 설정
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadIssues = async () => {
      try {
        const nextIssues = await fetchIssueDocentList(controller.signal);
        setIssues(nextIssues);
      } catch {
        setIssues([]);
      } finally {
        setIssuesLoading(false);
      }
    };

    void loadIssues();
    return () => controller.abort();
  }, []);

  // 온보딩 표시: 로그인 상태이고 서버 프로필이 비어있으면 온보딩 시작
  // prevLoggedIn 방식은 OAuth 리다이렉트(페이지 새로고침) 후 prev가 null이 되어 동작하지 않음.
  // hasCheckedOnboarding ref로 마운트 후 최초 1회만 검사한다.
  const hasCheckedOnboarding = useRef(false);
  useEffect(() => {
    if (!hydrated || profileLoading || !isLoggedIn) return;
    if (hasCheckedOnboarding.current) return;

    hasCheckedOnboarding.current = true;
    const isEmpty = profile.sectors.length === 0 && profile.companies.length === 0;
    if (isEmpty) {
      setDraftProfile(ONBOARDING_INITIAL_PROFILE);
      setShowOnboarding(true);
    }
  }, [isLoggedIn, hydrated, profileLoading, profile]);

  const personalizedIssues = useMemo(() => issues.filter((issue) => matchesInterest(issue, profile)), [profile]);

  // 온보딩 완료: draft를 서버·localStorage에 저장.
  // saveProfile 실패 시 모달을 닫지 않고 사용자에게 알린다.
  const completeOnboarding = async () => {
    try {
      await saveProfile(draftProfile);
      setShowOnboarding(false);
    } catch {
      alert("프로필 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header isLoggedIn={isLoggedIn} isLoading={authLoading} user={user} onOpenLogin={openLoginModal} onLogout={logout} />
      <Rail isLoggedIn={isLoggedIn} onOpenInterests={() => setShowInterests(true)} />

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
          items={issuesLoading ? [] : personalizedIssues}
          empty={issuesLoading ? "이슈를 불러오는 중입니다." : "아직 선택한 관심사와 딱 맞는 이슈가 없어요. 우측 내 관심에서 관심사를 넓히거나 아래 전체 시장 이슈를 확인해보세요."}
        />

        <IssueSection
          title="오늘의 전체 시장 이슈"
          description="관심사 밖의 흐름도 놓치지 않도록 함께 모아두었습니다."
          items={issuesLoading ? [] : issues}
          empty={issuesLoading ? "이슈를 불러오는 중입니다." : "표시할 이슈가 아직 없습니다."}
        />
      </main>

      <footer className="border-t border-[#e0e0e0] bg-[#ffffff] px-8 py-10 text-[13px] leading-6 text-[#7a7a7a]">
        <strong className="text-[#1d1d1f]">장독대</strong>
        <p className="mt-2">제공되는 정보는 학습과 시장 이해를 위한 콘텐츠이며, 특정 종목의 매수 또는 매도 권유가 아닙니다.</p>
      </footer>

      {hydrated && showOnboarding && <OnboardingModal profile={draftProfile} onChange={setDraftProfile} onComplete={completeOnboarding} />}
      {showInterests && <InterestDrawer profile={profile} onChange={saveProfile} onClose={() => setShowInterests(false)} />}
    </div>
  );
}
