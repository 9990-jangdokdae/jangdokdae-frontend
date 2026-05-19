"use client";

import { useState, useRef, useEffect } from "react";
import { API_V1_BASE } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";

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

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleClose = () => {
    setIsClosing(true);
    timerRef.current = setTimeout(onClose, 300);
  };

  return (
    <Modal
      onClose={handleClose}
      className={`backdrop-blur-[3px] ${
        isClosing
          ? "animate-out fade-out duration-250 fill-mode-both"
          : "animate-in fade-in duration-200 fill-mode-both"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.22)" }}
    >
      <section
        className={`grid w-[860px] grid-cols-[320px_1fr] overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(100,60,30,0.13)] ${
          isClosing
            ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-4 duration-300 fill-mode-both"
            : "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out fill-mode-both"
        }`}
      >
        {/* ── 좌측: Warm White 패널 ── */}
        <div
          className="relative flex flex-col overflow-hidden border-r border-[#e8e2da] px-9 py-11"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: "radial-gradient(circle, rgba(201,100,66,0.12) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          {/* 도트 패턴 위 콘텐츠 가독성을 위한 흰색 마스크 Orb */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 340, height: 340,
              background: "radial-gradient(circle, rgba(255,255,255,0.92) 30%, transparent 70%)",
              filter: "blur(8px)",
              top: -60, left: -60,
              zIndex: 1,
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 220, height: 220,
              background: "radial-gradient(circle, rgba(255,255,255,0.85) 30%, transparent 70%)",
              filter: "blur(8px)",
              bottom: -40, right: -30,
              zIndex: 1,
            }}
          />

          {/* 콘텐츠 */}
          <div className="relative flex flex-col" style={{ zIndex: 2 }}>
            <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c96442]">
              로그인
            </p>
            <h2 className="mb-3 whitespace-nowrap text-[22px] font-extrabold leading-[1.18] tracking-[-0.03em] text-[#1d1d1f]">
              시장 독해를 대신 해드립니다
            </h2>
            <p className="mb-7 text-[13px] leading-[1.72] text-[rgba(28,17,9,0.45)]">
              주린이를 위한<br />AI 주식 뉴스 큐레이션 서비스
            </p>

            <div className="mb-5 border-t border-[#e8e2da]" />

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9a9a9a]">
              서비스 특징
            </p>
            <ul className="flex flex-col gap-3">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-2.5">
                  <span
                    className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c96442] opacity-70"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] leading-[1.55] text-[#5a5a5a]">
                    <strong className="block font-semibold text-[#1d1d1f]">{f.title}</strong>
                    {f.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 우측: 로그인 패널 ── */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-[#ffffff] px-10 py-11">
          {/* 색상 Orb */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 300, height: 300,
              background: "radial-gradient(circle, rgba(201,100,66,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
              bottom: -80, right: -60,
              animation: "orb-drift-reverse 14s ease-in-out infinite",
            }}
          />

          <div className="relative" style={{ zIndex: 1, maxWidth: 320 }}>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c96442]">
              소셜 로그인
            </p>
            <h2 className="mb-2 text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-[#1d1d1f]">
              장독대에<br />로그인
            </h2>
            <p className="mb-8 text-[14px] leading-[1.65] text-[#7a7a7a]">
              주식 뉴스를 내 관심에 맞게<br />읽어보세요.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={`${API_V1_BASE}/auth/kakao/login`}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#FEE500] text-[15px] font-semibold text-[#191919] transition hover:bg-[#f5db00] active:scale-[0.97]"
              >
                <KakaoIcon />
                카카오로 시작하기
              </a>
              <a
                href={`${API_V1_BASE}/auth/google/login`}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#e8e2da] bg-white text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-[#f9f6f3] active:scale-[0.97]"
              >
                <GoogleIcon />
                구글로 시작하기
              </a>
            </div>

            <p className="mt-5 text-center text-[11px] leading-[1.6] text-[#b0a89e]">
              로그인 시{" "}
              <strong className="font-semibold text-[#7a7a7a]">이용약관</strong>에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </section>
    </Modal>
  );
}
