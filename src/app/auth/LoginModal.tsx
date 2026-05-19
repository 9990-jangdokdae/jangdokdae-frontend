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
        className={`w-[400px] overflow-hidden rounded-[28px] bg-white shadow-[0_16px_64px_rgba(100,60,30,0.13)] ${
          isClosing
            ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-4 duration-300 fill-mode-both"
            : "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out fill-mode-both"
        }`}
      >
        <div className="px-10 py-11">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c96442]">
            장독대
          </p>
          <h2 className="mb-2.5 text-[26px] font-bold leading-[1.2] tracking-[-0.03em] text-[#1d1d1f]">
            시장 독해를<br />대신 해드립니다
          </h2>
          <p className="mb-8 text-[13px] leading-[1.65] text-[#7a7a7a]">
            AI가 주린이를 위해<br />어려운 금융 뉴스를 쉽게 풀어드려요
          </p>

          <div className="flex flex-col gap-2.5">
            <a
              href={`${API_V1_BASE}/auth/kakao/login`}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#FEE500] text-[15px] font-semibold text-[#191919] transition hover:bg-[#f5db00] active:scale-[0.97]"
            >
              <KakaoIcon />
              카카오로 시작하기
            </a>
            <a
              href={`${API_V1_BASE}/auth/google/login`}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-[#e8e2da] bg-white text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-[#f9f6f3] active:scale-[0.97]"
            >
              <GoogleIcon />
              구글로 시작하기
            </a>
          </div>

          <p className="mt-5 text-center text-[10.5px] leading-[1.6] text-[#b0a89e]">
            로그인 시{" "}
            <strong className="font-semibold text-[#7a7a7a]">이용약관</strong>에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </section>
    </Modal>
  );
}
