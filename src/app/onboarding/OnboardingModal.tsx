"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import type { InterestProfile } from "@/types/jangdokdae";
import { companyOptions } from "@/lib/jangdokdaeData";
import { useSectors } from "@/hooks/useSectors";
import { toggleItem } from "@/lib/utils";
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const canGoNext = profile.sectors.length > 0;

  const sectorTabs = sectorOptions
    .map((s) => s.id)
    .filter((id) => companyOptions.some((c) => c.sector === id));

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
    timerRef.current = setTimeout(onComplete, 300);
  }

  const handleClose = onClose
    ? () => { setIsClosing(true); timerRef.current = setTimeout(onClose!, 300); }
    : undefined;

  return (
    <Modal
      onCloseButton={handleClose}
      className={`backdrop-blur-[3px] ${
        isClosing
          ? "animate-out fade-out duration-250 fill-mode-both"
          : "animate-in fade-in duration-200 fill-mode-both"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.22)" }}
    >
      <section
        className={`relative flex h-[88vh] w-[960px] flex-col overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(100,60,30,0.12)] ${
          isClosing
            ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-4 duration-300 fill-mode-both"
            : "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out fill-mode-both"
        }`}
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Orb 배경 효과 */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 480, height: 480,
            background: "radial-gradient(circle, rgba(201,100,66,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: -120, left: -100,
            animation: "orb-drift 12s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 340, height: 340,
            background: "radial-gradient(circle, rgba(201,100,66,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: -40, right: 60,
            animation: "orb-drift-reverse 15s ease-in-out infinite",
          }}
        />

        {/* 메인 콘텐츠 (좌/우 패널) */}
        <div className="grid min-h-0 flex-1 overflow-hidden grid-cols-[360px_1fr]">

          {/* 좌측 패널 */}
          <div className="flex flex-col overflow-hidden border-r border-[#e8e2da] px-9 py-11">
            <div
              key={`step-label-${step}`}
              className={`mb-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#c96442] animate-in fade-in duration-200 fill-mode-both ${
                direction === "forward" ? "slide-in-from-left-2" : "slide-in-from-right-2"
              }`}
            >
              Step {step} / 2
            </div>
            <h2
              key={`title-${step}`}
              className={`mb-3 text-[34px] font-bold leading-[1.14] tracking-[-0.035em] text-[#1d1d1f] ko-title animate-in fade-in duration-200 fill-mode-both ${
                direction === "forward" ? "slide-in-from-left-3" : "slide-in-from-right-3"
              }`}
            >
              {step === 1 ? (
                <>관심 섹터를<br />선택하세요</>
              ) : (
                <>관심 종목을<br />골라보세요</>
              )}
            </h2>
            <p
              key={`sub-${step}`}
              className={`mb-7 text-[13px] leading-[1.72] text-[rgba(28,17,9,0.45)] ko-body animate-in fade-in duration-200 fill-mode-both ${
                direction === "forward" ? "slide-in-from-left-3" : "slide-in-from-right-3"
              }`}
            >
              {step === 1
                ? "나와 관련있는 산업 분야를 최소 1개 이상 골라주세요."
                : "선택한 섹터의 대표 종목이에요. 나중에 언제든지 바꿀 수 있어요."}
            </p>

            <div className="mb-5 border-t border-[#e8e2da]" />

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a]">
              선택한 섹터
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {profile.sectors.length === 0 ? (
                <p className="text-[12px] italic text-[#b0a89e]">
                  오른쪽에서 관심 분야를 선택해보세요
                </p>
              ) : (
                profile.sectors.map((id, i) => {
                  const option = sectorOptions.find((o) => o.id === id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onChange({ ...profile, sectors: toggleItem(profile.sectors, id) })}
                      className="animate-in fade-in zoom-in-90 group inline-flex items-center gap-1 rounded-full border border-[#c96442] bg-[#fff1ec] px-3 py-1 text-[12px] font-semibold text-[#c96442] fill-mode-both transition-colors hover:border-[#e05a3a] hover:bg-[#ffe4dc]"
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      {option?.icon} {option?.label ?? id}
                      <span className="ml-0.5 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden="true">✕</span>
                    </button>
                  );
                })
              )}
            </div>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a]">
              선택한 종목
            </p>
            <div className="flex flex-1 flex-wrap content-start gap-1.5 overflow-y-auto">
              {profile.companies.length === 0 ? (
                <p className="text-[12px] italic text-[#b0a89e]">
                  종목은 나중에 설정해도 돼요
                </p>
              ) : (
                profile.companies.map((id, i) => {
                  const label = companyOptions.find((o) => o.id === id)?.label ?? id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onChange({ ...profile, companies: toggleItem(profile.companies, id) })}
                      className="animate-in fade-in zoom-in-90 group inline-flex items-center gap-1 rounded-full border border-[#c96442] bg-[#fff1ec] px-3 py-1 text-[12px] font-semibold text-[#c96442] fill-mode-both transition-colors hover:border-[#e05a3a] hover:bg-[#ffe4dc]"
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      {label}
                      <span className="ml-0.5 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden="true">✕</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* 우측 패널 */}
          <div
            key={step}
            className={`${step === 1 ? "flex flex-col overflow-hidden px-9 pt-8 pb-4" : "flex flex-col overflow-hidden"} animate-in fade-in duration-[240ms] ease-out fill-mode-both ${
              direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
            }`}
          >
            {step === 1 ? (
              <>
                <p className="mb-2 shrink-0 text-[13px] font-semibold text-[#9a9a9a]">
                  전체 섹터 ({sectorOptions.length}개)
                </p>
                <OptionGrid
                  variant="chip"
                  columns={3}
                  theme="light"
                  className="min-h-0 flex-1 auto-rows-fr"
                  options={sectorOptions}
                  selected={profile.sectors}
                  onToggle={(sector) =>
                    onChange({ ...profile, sectors: toggleItem(profile.sectors, sector) })
                  }
                />
              </>
            ) : (
              <>
                {/* 고정 헤더: 섹터 탭 + 검색 */}
                <div className="shrink-0 px-9 pt-7 pb-4">
                  {/* 섹터 탭 */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {["전체", ...sectorTabs].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`h-7 rounded-full px-3 text-[12px] font-semibold transition-all ${
                          activeTab === tab
                            ? "bg-[#c96442] text-white"
                            : "border border-[#e8e2da] bg-[#f5f2ee] text-[#9a9a9a] hover:bg-[#ede8e2] hover:text-[#1d1d1f]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* 검색 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b0a89e]" />
                    <input
                      type="text"
                      placeholder="종목명 검색"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 w-full rounded-lg border border-[#e8e2da] bg-[#f9f6f3] pl-9 pr-3 text-[13px] text-[#1d1d1f] placeholder-[#b0a89e] outline-none focus:border-[#c96442]/60 focus:ring-1 focus:ring-[#c96442]/20"
                    />
                  </div>

                  {profile.companies.length >= 10 && (
                    <p className="mt-2.5 text-[12px] font-semibold text-[#c96442]">
                      종목은 최대 10개까지 선택할 수 있어요
                    </p>
                  )}
                </div>

                {/* 스크롤 가능한 종목 목록 */}
                <div className="min-h-0 flex-1 overflow-y-auto px-9 py-5">
                  {filteredCompanies.length > 0 ? (
                    <OptionGrid
                      variant="chip"
                      columns={2}
                      theme="light"
                      options={filteredCompanies}
                      selected={profile.companies}
                      onToggle={(company) => {
                        const isSelected = profile.companies.includes(company);
                        if (!isSelected && profile.companies.length >= 10) return;
                        onChange({ ...profile, companies: toggleItem(profile.companies, company) });
                      }}
                    />
                  ) : (
                    <p className="py-8 text-center text-[13px] text-[#b0a89e]">
                      검색 결과가 없습니다
                    </p>
                  )}

                  <p className="mt-6 text-center text-[12px] text-[#c0b8ae]">
                    선택하지 않아도 괜찮아요. 나중에 언제든 바꿀 수 있어요.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 하단 바 */}
        <div
          className="flex h-[64px] shrink-0 items-center border-t border-[#e8e2da] px-8"
          style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}
        >
          {step === 2 ? (
            <button
              className="h-9 rounded-full border border-[#e0d8cf] px-5 text-[13px] font-semibold text-[#7a7a7a] transition-all hover:border-[#c9b8a8] hover:bg-[#f5f2ee] hover:text-[#1d1d1f]"
              onClick={goPrev}
              type="button"
            >
              ← 이전
            </button>
          ) : (
            <div className="w-20" />
          )}

          {/* 진행 바 */}
          <div className="mx-6 h-[2px] flex-1 overflow-hidden rounded-full bg-[#e8e2da]">
            <div
              className="h-full rounded-full bg-[#c96442] transition-all duration-500 ease-out"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>

          <span className="mr-5 text-[12px] text-[#9a9a9a]">
            {step} / 2
          </span>

          {step === 1 ? (
            <button
              className="group flex h-9 items-center gap-1.5 rounded-full bg-[#c96442] px-5 text-[13px] font-bold text-white transition-all hover:bg-[#b65335] active:scale-[0.97] disabled:bg-[#c96442]/30 disabled:text-white/40"
              disabled={!canGoNext}
              onClick={goNext}
              type="button"
            >
              다음 단계
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                className="text-[13px] text-[#9a9a9a] underline-offset-2 transition-colors hover:text-[#5a5a5a] hover:underline"
                onClick={handleComplete}
                type="button"
              >
                종목은 나중에 설정할게요
              </button>
              <button
                className="flex h-9 items-center gap-1.5 rounded-full bg-[#c96442] px-5 text-[13px] font-bold text-white transition-all hover:bg-[#b65335] active:scale-[0.97]"
                onClick={handleComplete}
                type="button"
              >
                장독대 시작하기
              </button>
            </div>
          )}
        </div>
      </section>
    </Modal>
  );
}
