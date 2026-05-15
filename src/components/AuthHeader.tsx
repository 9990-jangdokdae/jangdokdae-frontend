"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LogoutConfirmModal } from "@/app/auth/LogoutConfirmModal";
import { BrandMark } from "@/components/ui/BrandMark";

const navItems = ["오늘의 독해", "이슈", "마켓 정보"] as const;
const navHrefs = ["/", "/issue-docent", "/market/indices"] as const;

export function AuthHeader({ activeIndex }: { activeIndex: 0 | 1 | 2 }) {
  const { isLoggedIn, isLoading, user, openLoginModal, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 h-[64px] border-b border-[#e0e0e0] bg-[#ffffff]/95 backdrop-blur">
        <div className="flex h-full items-center px-8">
          <BrandMark />
          <nav className="ml-[220px] flex items-center gap-1 text-[14px] font-semibold text-[#1d1d1f]">
            {navItems.map((item, index) => (
              <Link
                key={item}
                href={navHrefs[index]}
                className={`rounded-full px-3 py-2 ${index === activeIndex ? "bg-[#f7f8fa] text-[#1d1d1f]" : "hover:bg-[#fbfcfd]"}`}
              >
                {item}
              </Link>
            ))}
          </nav>
          <button className="ml-3 flex h-9 w-[220px] items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-3 text-[13px] text-[#7a7a7a]">
            <Search className="h-[17px] w-[17px]" />
            이슈, 종목, 용어 검색
          </button>
          <Bell className="ml-auto h-5 w-5 text-[#7a7a7a]" />
          {isLoading ? (
            <div className="ml-7 h-10 w-28 animate-pulse rounded-lg bg-[#f0f0f0]" />
          ) : isLoggedIn ? (
            <div className="ml-7 flex items-center gap-2">
              <button
                className="h-10 rounded-lg border border-[#e0e0e0] bg-white px-4 text-[14px] font-semibold text-[#1d1d1f]"
                type="button"
              >
                {user?.nickname ?? "사용자"}
              </button>
              <button
                className="h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white transition hover:bg-[#b65335]"
                onClick={() => setShowLogoutConfirm(true)}
                type="button"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              className="ml-7 h-10 rounded-lg bg-[#c96442] px-5 text-[14px] font-semibold text-white transition hover:bg-[#b65335]"
              onClick={openLoginModal}
              type="button"
            >
              로그인
            </button>
          )}
        </div>
      </header>
      {showLogoutConfirm && (
        <LogoutConfirmModal
          onConfirm={() => { setShowLogoutConfirm(false); logout(); }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
}
