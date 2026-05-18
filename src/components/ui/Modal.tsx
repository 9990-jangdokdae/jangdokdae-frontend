"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/**
 * 모달 공통 backdrop 컴포넌트.
 *
 * 역할: fixed overlay, scroll lock, backdrop 클릭 닫기, X 버튼, stopPropagation.
 * 레이아웃(width, height, rounding 등)은 children이 직접 담당한다.
 *
 * @param onClose        - backdrop 클릭 시 호출. 생략하면 backdrop 클릭으로 닫히지 않음.
 * @param onCloseButton  - X 버튼 클릭 시 호출. 생략하면 onClose로 폴백. 둘 다 없으면 X 버튼 미표시.
 * @param className      - overlay 스타일 (기본값: bg-[#000000]/45). blur·애니메이션도 여기에.
 * @param style          - inline style (rgba 등 Tailwind로 표현하기 어려운 색상에 사용).
 * @param children       - 모달 dialog 콘텐츠.
 */
export function Modal({
  onClose,
  onCloseButton,
  className = "bg-[#000000]/45",
  style,
  children,
}: {
  onClose?: () => void;
  onCloseButton?: () => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  useLockBodyScroll();

  const xHandler = onCloseButton ?? onClose;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 ${className}`}
      style={style}
      onClick={onClose}
    >
      {/* relative wrapper — X 버튼의 position 기준, stopPropagation */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {xHandler && (
          <button
            className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center text-[#9a9a9a] opacity-70 transition-opacity hover:opacity-100"
            onClick={xHandler}
            type="button"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
