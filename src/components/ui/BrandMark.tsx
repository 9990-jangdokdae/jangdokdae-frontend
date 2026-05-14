"use client";

import Link from "next/link";

/**
 * 장독대 브랜드 마크 (로고 + 서비스명).
 *
 * @param inverse - true이면 흰색 텍스트 (검은 배경용), false이면 검은 텍스트 (기본)
 */
export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="장독대 홈">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c96442] text-[20px] font-semibold text-white">
        장
      </span>
      <span className="leading-none">
        <span className={`block text-[20px] font-semibold ${inverse ? "text-[#ffffff]" : "text-[#1d1d1f]"}`}>
          장독대
        </span>
        <span className={`mt-1 block text-[11px] font-medium ${inverse ? "text-[#cccccc]" : "text-[#7a7a7a]"}`}>
          시장 독해를 대신 해드립니다
        </span>
      </span>
    </Link>
  );
}
