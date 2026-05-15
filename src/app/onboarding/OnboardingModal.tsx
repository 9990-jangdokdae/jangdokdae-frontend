"use client";

import { useState } from "react";
import type { InterestProfile } from "@/types/jangdokdae";
import { sectorOptions, companyOptions } from "@/lib/jangdokdaeData";
import { toggleItem } from "@/lib/utils";
import { BrandMark } from "@/components/ui/BrandMark";
import { OptionGrid } from "@/components/ui/OptionGrid";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/**
 * 첫 로그인 온보딩 모달 (2단계: 섹터 → 종목 선택).
 *
 * 위치: app/onboarding/
 * 이유: 온보딩 전용 폴더로 분리해 page.tsx 복잡도를 낮춘다.
 *
 * @param profile    - 온보딩 중 임시 선택 상태 (draft)
 * @param onChange   - 선택 변경 시 draft 업데이트 콜백
 * @param onComplete - "장독대 시작하기" 클릭 시 완료 콜백
 */
export function OnboardingModal({
  profile,
  onChange,
  onComplete,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  // [Fix 8] step별 의도를 명확히 분리한다.
  // step 1: 섹터를 1개 이상 선택해야 다음으로 넘어갈 수 있다.
  // step 2: 종목은 선택 사항이므로 섹터가 채워져 있으면 완료 가능하다.
  const canGoNext = profile.sectors.length > 0;
  const canComplete = profile.sectors.length > 0;

  useLockBodyScroll();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/45 px-6">
      <section className="grid h-[88vh] w-[920px] grid-cols-[310px_1fr] overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_24px_80px_rgba(20,20,19,0.22)]">

        {/* ── 좌측: 검은 브랜드 패널 ── */}
        <div className="overflow-y-auto bg-[#000000] p-8 text-[#ffffff]">
          <BrandMark inverse />
          <div className="mt-16">
            <h1 className="mt-4 text-[36px] font-normal leading-[1.12]">오늘 읽을 시장을 먼저 골라볼까요.</h1>
            <p className="mt-5 text-[15px] leading-6 text-[#cccccc]">
              장독대는 선택한 관심사와 가까운 이슈를 먼저 꺼내두고, 어려운 뉴스를 쉬운 말과 퀴즈로 바꿔 보여줍니다.
            </p>
          </div>
          <div className="mt-16 flex gap-2">
            <span className={`h-2 flex-1 rounded-full ${step === 1 ? "bg-[#c96442]" : "bg-[#333333]"}`} />
            <span className={`h-2 flex-1 rounded-full ${step === 2 ? "bg-[#c96442]" : "bg-[#333333]"}`} />
          </div>
        </div>

        {/* ── 우측: 선택 패널 ── */}
        <div className="flex flex-col overflow-hidden">
          {/* 스크롤 가능한 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto p-8 pb-4">
            <p className="text-[13px] font-semibold text-[#c96442]">{step} / 2</p>
            <h2 className="mt-2 text-[28px] font-semibold text-[#1d1d1f]">
              {step === 1 ? "관심 섹터를 선택하세요" : "관심 종목을 선택하세요"}
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[#7a7a7a]">
              {step === 1
                ? "넓은 관심사를 먼저 고르면 내 관심 이슈의 기준이 됩니다."
                : "아는 종목만 골라도 충분합니다. 나중에 우측 내 관심에서 바꿀 수 있어요."}
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
          </div>

          {/* 하단 고정 버튼 영역 */}
          <div className="flex justify-between border-t border-[#f0f0f0] px-8 py-5">
            <button
              className="h-10 rounded-lg px-4 text-[14px] font-semibold text-[#7a7a7a] hover:bg-[#fbfcfd] disabled:opacity-0"
              onClick={() => setStep(1)}
              disabled={step === 1}
            >
              이전
            </button>
            {step === 1 ? (
              <button
                className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white disabled:bg-[#e0e0e0] disabled:text-[#7a7a7a]"
                disabled={!canGoNext}
                onClick={() => setStep(2)}
              >
                다음
              </button>
            ) : (
              <button
                className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white disabled:bg-[#e0e0e0] disabled:text-[#7a7a7a]"
                disabled={!canComplete}
                onClick={onComplete}
              >
                장독대 시작하기
              </button>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}
