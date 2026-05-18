"use client";

import type { ReactNode } from "react";
import type { InterestOption } from "@/types/jangdokdae";

/**
 * 섹터·종목 선택 UI.
 * OnboardingModal, InterestDrawer, InterestRail에서 공통 사용.
 *
 * variant="card"  (기본) — 설명 포함 카드 그리드 (InterestDrawer, InterestRail 용)
 * variant="chip"         — 컴팩트 그리드 카드 (OnboardingModal 용)
 *   columns=2 (기본)     — 2열 그리드, sector 있으면 섹터 헤더 자동 표시
 *   columns=3            — 3열 그리드 (섹터 선택 등 항목 수가 많을 때)
 */
export function OptionGrid({
  options,
  selected,
  onToggle,
  variant = "card",
  columns = 2,
  theme = "light",
  className,
}: {
  options: InterestOption[];
  selected: string[];
  onToggle: (id: string) => void;
  variant?: "card" | "chip";
  columns?: 2 | 3;
  theme?: "light" | "dark";
  className?: string;
}) {
  if (variant === "chip") {
    const colClass = columns === 3 ? "grid-cols-3" : "grid-cols-2";
    const spanClass = columns === 3 ? "col-span-3" : "col-span-2";

    const nodes: ReactNode[] = [];
    let lastGroup = "";
    let buttonIndex = 0;

    for (const option of options) {
      if (option.sector && option.sector !== lastGroup) {
        lastGroup = option.sector;
        nodes.push(
          <div
            key={`group-${option.sector}`}
            className={`${spanClass} flex items-center gap-2.5 pt-5 first:pt-0`}
          >
            <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              theme === "dark" ? "text-[rgba(245,237,232,0.35)]" : "text-[#9a8a7e]"
            }`}>
              {option.sector}
            </span>
            <div className={`h-px flex-1 ${theme === "dark" ? "bg-white/10" : "bg-[#e0d8cf]"}`} />
          </div>,
        );
      }

      const idx = buttonIndex++;
      const active = selected.includes(option.id);

      const cardClass = theme === "dark"
        ? `flex h-full flex-col rounded-xl border px-3 py-2.5 text-left transition-all duration-150 ${
            active
              ? "border-[#c96442]/60 bg-[#c96442]/[0.15] shadow-[0_0_0_1px_rgba(201,100,66,0.25)]"
              : "border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.2]"
          }`
        : `flex h-full flex-col rounded-xl border px-4 py-4 text-left transition-all duration-150 ${
            active
              ? "border-[#c96442] bg-[#fff1ec] shadow-[0_0_0_1px_#c96442]"
              : "border-[#e8e2da] bg-white hover:border-[#c96442]/50 hover:bg-[#fff8f6]"
          }`;

      nodes.push(
        <button
          key={option.id}
          style={{ animation: `chip-in 220ms ease-out ${idx * 22}ms both` }}
          className={cardClass}
          onClick={() => onToggle(option.id)}
          type="button"
        >
          {option.icon && (
            <span className="mb-1.5 block text-[20px] leading-none">{option.icon}</span>
          )}
          <span className={`flex items-center gap-1.5 text-[13px] font-semibold leading-tight ${
            theme === "dark"
              ? active ? "text-[#ff9b78]" : "text-[#f5ede8]"
              : active ? "text-[#c96442]" : "text-[#1d1d1f]"
          }`}>
            {!option.icon && active && <span className="text-[11px]">✓</span>}
            {option.label}
          </span>
          {option.description && (
            <span className={`mt-1 text-[11px] leading-snug ${
              theme === "dark"
                ? active ? "text-[rgba(255,155,120,0.7)]" : "text-[rgba(245,237,232,0.45)]"
                : active ? "text-[#c96442]/70" : "text-[#9a9a9a]"
            }`}>
              {option.description}
            </span>
          )}
        </button>,
      );
    }

    const gapY = theme === "dark" ? "gap-y-2" : "gap-y-3";
    return (
      <div className={`grid ${colClass} items-stretch gap-x-2.5 ${gapY} ${className ?? ""}`}>{nodes}</div>
    );
  }

  // variant="card" — 기존 동작 유지 (InterestDrawer, InterestRail)
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
              <span className="mt-2 block text-[13px] leading-5 text-[#7a7a7a]">
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
