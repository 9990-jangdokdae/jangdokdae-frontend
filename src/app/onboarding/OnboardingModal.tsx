"use client";

import { useState } from "react";
import type { InterestProfile } from "@/types/jangdokdae";
import { companyOptions } from "@/lib/jangdokdaeData";
import { useSectors } from "@/hooks/useSectors";
import { toggleItem } from "@/lib/utils";
import { BrandMark } from "@/components/ui/BrandMark";
import { Modal } from "@/components/ui/Modal";
import { OptionGrid } from "@/components/ui/OptionGrid";

export function OnboardingModal({
  profile,
  onChange,
  onComplete,
  onClose,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onComplete: () => void;
  onClose?: () => void;
}) {
  const sectorOptions = useSectors();
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const canGoNext = profile.sectors.length > 0;
  const canComplete = profile.sectors.length > 0;
  const count = step === 1 ? profile.sectors.length : profile.companies.length;

  // STEP 2: 종목이 있는 모든 섹터를 탭으로 노출
  const sectorTabs = sectorOptions
    .map((s) => s.id)
    .filter((sectorId) => companyOptions.some((c) => c.sector === sectorId));

  const filteredCompanies = companyOptions.filter((c) => {
    const matchesTab = activeTab === "전체" || c.sector === activeTab;
    const matchesSearch = searchQuery === "" || c.label.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  function goNext() {
    setDirection("forward");
    setActiveTab("전체");
    setSearchQuery("");
    setStep(2);
  }

  function goPrev() {
    setDirection("backward");
    setStep(1);
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setSearchQuery("");
  }

  function handleComplete() {
    setIsClosing(true);
    setTimeout(onComplete, 300);
  }

  const handleClose = onClose
    ? () => { setIsClosing(true); setTimeout(onClose, 300); }
    : undefined;

  return (
    <Modal
      onCloseButton={handleClose}
      className={`backdrop-blur-[3px] ${
        isClosing
          ? "animate-out fade-out duration-250 fill-mode-both"
          : "animate-in fade-in duration-200 fill-mode-both"
      }`}
      style={{ backgroundColor: "rgba(13,10,8,0.62)" }}
    >
      <section
        className={`grid h-[88vh] w-[960px] grid-cols-[320px_1fr] overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(13,10,8,0.45)] ${
          isClosing
            ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-4 duration-300 fill-mode-both"
            : "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-350 ease-out fill-mode-both"
        }`}
      >
        {/* ── 좌측: 브랜드 패널 ── */}
        <div className="relative flex flex-col overflow-hidden bg-[#1c1109] p-8 text-white">
          {/* 콘텐츠 */}
          <div className="relative z-10 flex h-full flex-col">
            <BrandMark inverse />

            <div className="mt-14">
              <h1 className="text-[36px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#f5ede8] ko-title">
                오늘 읽을 시장을<br />먼저 골라볼까요.
              </h1>
              <p className="mt-10 text-[14px] leading-[1.72] text-[#f5ede8] ko-body">
                장독대는 선택한 관심사와 가까운 이슈를 먼저 꺼내두고, 어려운 뉴스를 쉬운 말과 퀴즈로 바꿔 보여줍니다.
              </p>
            </div>

            {/* 구분선 */}
            <div className="my-7 border-t border-white/[0.12]" />

            {/* 라이브 선택 미리보기 */}
            <div className="flex-1 overflow-hidden">
              {profile.sectors.length === 0 && step === 1 ? (
                <p className="text-[13px] leading-[1.65] text-[#7a6558]">
                  오른쪽에서 관심 분야를<br />선택해보세요
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {profile.sectors.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f5ede8]">
                        선택한 섹터
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.sectors.map((id) => {
                          const label = sectorOptions.find((o) => o.id === id)?.label ?? id;
                          return (
                            <span
                              key={id}
                              className="animate-in fade-in zoom-in-90 inline-flex items-center rounded-lg bg-[#c96442]/20 px-2.5 py-1 text-[12px] font-medium text-[#f5ede8] duration-200 fill-mode-both"
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f5ede8]">
                        선택한 종목
                      </p>
                      {profile.companies.length === 0 ? (
                        <p className="text-[12px] text-[#7a6558]">종목은 나중에 선택해도 돼요</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {profile.companies.map((id) => {
                            const label = companyOptions.find((o) => o.id === id)?.label ?? id;
                            return (
                              <span
                                key={id}
                                className="animate-in fade-in zoom-in-90 inline-flex items-center rounded-lg bg-[#c96442]/20 px-2.5 py-1 text-[12px] font-medium text-[#f5ede8] duration-200 fill-mode-both"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 우측: 선택 패널 ── */}
        <div
          className="flex flex-col overflow-hidden"
          style={{
            backgroundColor: "#faf8f5",
            backgroundImage:
              "radial-gradient(circle, rgba(201,100,66,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {/* 상단 코랄 그라디언트 액센트 */}
          <div className="h-[2px] w-full shrink-0 bg-gradient-to-r from-transparent via-[#c96442] to-transparent opacity-70" />

          {/* 고정 헤더 영역 (스크롤되지 않음) */}
          <div
            key={step}
            className={`shrink-0 px-8 pt-7 animate-in fade-in duration-[240ms] ease-out fill-mode-both ${
              direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
            }`}
          >
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 items-center rounded-full bg-[#c96442] px-2.5 text-[10px] font-bold tracking-wider text-white uppercase">
                  STEP {step}
                </span>
                {count > 0 && (
                  <span className="animate-in fade-in zoom-in-90 inline-flex h-5 items-center rounded-full bg-[#c96442]/10 px-2.5 text-[10px] font-semibold text-[#c96442] duration-150 fill-mode-both">
                    {count}개 선택됨
                  </span>
                )}
              </div>
              <h2 className="text-[28px] font-semibold tracking-[-0.022em] text-[#1d1d1f] ko-title">
                {step === 1 ? "관심 섹터를 선택하세요" : "관심 종목을 선택하세요"}
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-[1.68] text-[#7a7a7a] ko-body">
                {step === 1
                  ? "넓은 관심사를 먼저 고르면 내 관심 이슈의 기준이 됩니다."
                  : "아는 종목만 골라도 충분합니다. 나중에 언제든지 바꿀 수 있어요."}
              </p>
            </div>

            {/* STEP 2 전용: 섹터 탭 + 검색창 */}
            {step === 2 && (
              <div className="mb-1">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {["전체", ...sectorTabs].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleTabChange(tab)}
                      className={`h-7 rounded-full px-3 text-[12px] font-semibold transition-all ${
                        activeTab === tab
                          ? "bg-[#c96442] text-white"
                          : "bg-[#ece8e2] text-[#7a7a7a] hover:bg-[#e0dbd3] hover:text-[#1d1d1f]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b0a898]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="종목명 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-full rounded-lg border border-[#e0dbd3] bg-white pl-9 pr-3 text-[13px] text-[#1d1d1f] placeholder-[#b0a898] outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442]/30"
                  />
                </div>
                {profile.companies.length >= 10 && (
                  <p className="mt-2 text-[12px] font-semibold text-[#c96442]">종목은 최대 10개까지 선택할 수 있어요</p>
                )}
              </div>
            )}
          </div>

          {/* 스크롤 가능한 그리드 영역 */}
          <div className="flex-1 overflow-y-auto px-8 pt-4 pb-4">
            <div
              key={`grid-${step}`}
              className={`animate-in fade-in duration-[240ms] ease-out fill-mode-both ${
                direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
              }`}
            >
              {step === 1 ? (
                <OptionGrid
                  variant="chip"
                  columns={3}
                  options={sectorOptions}
                  selected={profile.sectors}
                  onToggle={(sector) =>
                    onChange({ ...profile, sectors: toggleItem(profile.sectors, sector) })
                  }
                />
              ) : (
                <div>
                  {filteredCompanies.length > 0 ? (
                    <OptionGrid
                      variant="chip"
                      columns={2}
                      options={filteredCompanies}
                      selected={profile.companies}
                      onToggle={(company) => {
                        const isSelected = profile.companies.includes(company);
                        if (!isSelected && profile.companies.length >= 10) return;
                        onChange({ ...profile, companies: toggleItem(profile.companies, company) });
                      }}
                    />
                  ) : (
                    <p className="py-8 text-center text-[13px] text-[#b0a898]">검색 결과가 없습니다</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 하단 고정 버튼 영역 */}
          <div
            className="flex shrink-0 items-center justify-between border-t border-[#ece8e2] px-8 py-4"
            style={{ backgroundColor: "rgba(245,241,236,0.92)", backdropFilter: "blur(8px)" }}
          >
            {step === 2 ? (
              <button
                className="h-10 rounded-full border border-[#ddd5c8] px-5 text-[13px] font-semibold text-[#7a7a7a] transition-all hover:border-[#c9bfb4] hover:bg-[#ece8e2] hover:text-[#1d1d1f]"
                onClick={goPrev}
                type="button"
              >
                이전
              </button>
            ) : (
              <div aria-hidden />
            )}

            {step === 1 ? (
              <button
                className="group flex h-10 items-center gap-2 rounded-full bg-[#c96442] px-6 text-[13px] font-semibold text-white transition-all hover:bg-[#b65335] active:scale-[0.97] disabled:bg-[#ddd5c8] disabled:text-[#b0a89e]"
                disabled={!canGoNext}
                onClick={goNext}
                type="button"
              >
                다음
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="text-[13px] text-[#9a9a9a] underline-offset-2 transition-colors hover:text-[#555555] hover:underline"
                  onClick={handleComplete}
                  type="button"
                >
                  종목은 나중에 설정할게요
                </button>
                <button
                  className="flex h-10 items-center gap-2 rounded-full bg-[#c96442] px-6 text-[13px] font-semibold text-white transition-all hover:bg-[#b65335] active:scale-[0.97] disabled:bg-[#ddd5c8] disabled:text-[#b0a89e]"
                  disabled={!canComplete}
                  onClick={handleComplete}
                  type="button"
                >
                  장독대 시작하기
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Modal>
  );
}
