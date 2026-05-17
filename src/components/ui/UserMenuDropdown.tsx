"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface UserMenuDropdownProps {
  nickname: string;
  hasInterests: boolean;
  onOpenOnboarding: () => void;
  onLogout: () => void;
}

export function UserMenuDropdown({ nickname, hasInterests, onOpenOnboarding, onLogout }: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="relative flex h-10 items-center gap-1.5 rounded-lg border border-[#e0e0e0] bg-white px-4 text-[14px] font-semibold text-[#1d1d1f] transition hover:bg-[#fbfcfd]"
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        {nickname}
        <ChevronDown className="h-3.5 w-3.5 text-[#7a7a7a]" />
        {!hasInterests && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#c96442]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-44 overflow-hidden rounded-xl border border-[#e0e0e0] bg-white shadow-[0_4px_16px_rgba(20,20,19,0.12)]">
          <button
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-[13px] font-semibold text-[#c96442] transition hover:bg-[#fff6f3]"
            onClick={() => { setIsOpen(false); onOpenOnboarding(); }}
            type="button"
          >
            ⚡ 관심사 설정하기
          </button>
          <button
            className="flex w-full items-center px-4 py-3 text-left text-[13px] text-[#7a7a7a] transition hover:bg-[#fbfcfd]"
            onClick={() => { setIsOpen(false); onLogout(); }}
            type="button"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
