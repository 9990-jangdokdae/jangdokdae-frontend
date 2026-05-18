"use client";

import Link from "next/link";

function JarIcon({ inverse = false, size = 38 }: { inverse?: boolean; size?: number }) {
  const gradId = `jarGrad-${inverse ? "inv" : "def"}`;
  const lidGradId = `lidGrad-${inverse ? "inv" : "def"}`;

  return (
    <svg width={size} height={size} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inverse ? "#e88860" : "#e0845e"} />
          <stop offset="60%" stopColor={inverse ? "#d06840" : "#c96442"} />
          <stop offset="100%" stopColor={inverse ? "#9a3d20" : "#8b3320"} />
        </linearGradient>
        <linearGradient id={lidGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inverse ? "#d97050" : "#d97550"} />
          <stop offset="100%" stopColor={inverse ? "#a04030" : "#9e3d22"} />
        </linearGradient>
      </defs>
      {/* 그림자 */}
      <ellipse cx="18" cy="39.5" rx="9.5" ry="1.2" fill="#8b3320" opacity={inverse ? 0.1 : 0.15} />
      {/* 항아리 몸통 */}
      <path
        d="M14 8 C9 9.5 3.5 15 3.5 22 C3.5 30.5 9 37 15 38 L21 38 C27 37 32.5 30.5 32.5 22 C32.5 15 27 9.5 22 8 Z"
        fill={`url(#${gradId})`}
      />
      {/* 뚜껑 */}
      <path d="M12.5 8.5 C12.5 6 15 4.5 18 4.5 C21 4.5 23.5 6 23.5 8.5 Z" fill={`url(#${lidGradId})`} />
      {/* 손잡이 */}
      <circle cx="18" cy="3.2" r="1.8" fill={`url(#${lidGradId})`} />
      {/* 광택 하이라이트 */}
      <ellipse cx="11.5" cy="18" rx="2.8" ry="5" fill="white" opacity="0.15" transform="rotate(-15 11.5 18)" />
      {/* 어깨 라인 */}
      <path d="M11 13 Q18 11 25 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.22" />
    </svg>
  );
}

/**
 * 장독대 브랜드 마크 (장독 로고 + 서비스명).
 *
 * @param inverse - true이면 밝은 텍스트 (검은 배경용)
 */
export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="장독대 홈">
      <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
        <JarIcon inverse={inverse} size={38} />
      </span>
      <span className="leading-none">
        <span
          className="block text-[20px] leading-tight tracking-[-0.04em]"
          style={{
            fontWeight: 800,
            color: inverse ? "#f5ede8" : "#1c1109",
          }}
        >
          장독대
        </span>
        <span
          className="mt-[3px] block text-[10.5px]"
          style={{
            fontWeight: 400,
            letterSpacing: "0.01em",
            color: inverse ? "rgba(245,237,232,0.5)" : "rgba(28,17,9,0.4)",
          }}
        >
          시장 독해를 대신 해드립니다
        </span>
      </span>
    </Link>
  );
}
