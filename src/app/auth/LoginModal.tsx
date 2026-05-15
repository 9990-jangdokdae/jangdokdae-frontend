/**
 * 소셜 로그인 모달 UI
 *
 * 위치: app/auth/
 * 이유: 인증(로그인·로그아웃) 관련 UI 컴포넌트 전용 폴더.
 *
 * 역할: 카카오·구글 로그인 버튼 렌더링.
 *       버튼 클릭 시 백엔드 OAuth URL로 페이지를 이동시키며, 인증 로직은 담당하지 않는다.
 * 레이아웃: 좌측 검은 브랜드 패널 + 우측 흰색 로그인 패널 (온보딩 모달과 동일한 2단 구조)
 */
"use client";

import { X } from "lucide-react";
import { API_BASE } from "@/lib/api";

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1C4.582 1 1 3.91 1 7.5c0 2.302 1.45 4.325 3.647 5.497l-.95 3.548a.286.286 0 00.44.311L8.5 13.9c.165.01.331.016.5.016 4.418 0 8-2.91 8-6.5C17 4.91 13.418 1 9 1z"
        fill="#191919"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "쉬운 말로 번역",
    desc: "어려운 금융 뉴스를 주린이도 이해할 수 있게 풀어드려요",
  },
  {
    title: "맞춤 이슈 큐레이션",
    desc: "내 관심 섹터와 종목에 맞는 이슈를 먼저 보여드려요",
  },
  {
    title: "용어 풀이 · 퀴즈",
    desc: "낯선 금융 용어를 설명하고 퀴즈로 시장 감각을 키워드려요",
  },
];

/**
 * 카카오·구글 소셜 로그인 선택 모달.
 *
 * @param onClose - 모달 닫기 콜백 (배경 클릭 또는 X 버튼)
 */
export function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/45 px-6"
      onClick={onClose}
    >
      <section
        className="grid w-[820px] grid-cols-[300px_1fr] overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(20,20,19,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 좌측: 검은 브랜드 패널 ── */}
        <div className="flex flex-col bg-[#000000] p-8 text-[#ffffff]">
          {/* 브랜드 마크 */}
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c96442] text-[20px] font-semibold text-white">
              장
            </span>
            <span className="leading-none">
              <span className="block text-[20px] font-semibold text-white">장독대</span>
              <span className="mt-1 block text-[11px] font-medium text-[#cccccc]">시장 독해를 대신 해드립니다</span>
            </span>
          </div>

          {/* 서비스 특징 */}
          <ul className="mt-12 space-y-7">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="mt-0.5 text-[#c96442]" aria-hidden="true">✦</span>
                <span className="text-[14px] leading-6 text-[#cccccc]">
                  <span className="font-semibold text-white">{f.title}</span>
                  <br />
                  {f.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 우측: 흰색 로그인 패널 ── */}
        <div className="relative bg-[#ffffff] p-8">
          {/* 닫기 버튼 */}
          <button
            className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]"
            aria-label="로그인 닫기"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>

          <p className="text-[13px] font-semibold text-[#c96442]">소셜 로그인</p>
          <h2 className="mt-2 text-[28px] font-semibold text-[#1d1d1f]">장독대에 로그인</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#7a7a7a]">
            주식 뉴스를 내 관심에 맞게 읽어보세요.
          </p>

          <div className="mt-10 space-y-3">
            {/* 클릭 시 백엔드 카카오 OAuth 시작점으로 이동 */}
            <a
              href={`${API_BASE}/api/v1/auth/kakao/login`}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] text-[15px] font-semibold text-[#191919] transition hover:bg-[#f5db00]"
            >
              <KakaoIcon />
              카카오로 시작하기
            </a>
            {/* 클릭 시 백엔드 구글 OAuth 시작점으로 이동 */}
            <a
              href={`${API_BASE}/api/v1/auth/google/login`}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#e0e0e0] bg-white text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-[#fbfcfd]"
            >
              <GoogleIcon />
              구글로 시작하기
            </a>
          </div>

          <p className="mt-6 text-center text-[12px] text-[#7a7a7a]">
            로그인 시{" "}
            <span className="font-semibold text-[#1d1d1f]">이용약관</span>에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}
