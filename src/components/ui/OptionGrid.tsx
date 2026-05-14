"use client";

import type { InterestOption } from "@/types/jangdokdae";

/**
 * 섹터·종목 선택 카드 그리드.
 * OnboardingModal, InterestDrawer, InterestRail에서 공통 사용.
 */
export function OptionGrid({
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
              active
                ? "border-[#c96442] bg-[#fff1ec] shadow-[0_0_0_1px_#c96442]"
                : "border-[#e0e0e0] bg-white hover:border-[#c96442]/60"
            }`}
            onClick={() => onToggle(option.id)}
            type="button"
          >
            <span className="block text-[15px] font-semibold text-[#1d1d1f]">{option.label}</span>
            {option.description && (
              <span className="mt-2 block text-[13px] leading-5 text-[#7a7a7a]">{option.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
