/**
 * 로그인 상태 관리 훅 및 Provider
 *
 *
 * 사용법:
 *   const { user, isLoggedIn, openLoginModal, logout } = useAuth();
 */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/jangdokdae";
import { LoginModal } from "@/app/auth/LoginModal";
import { apiFetch } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  openLoginModal: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * 앱 전체에 로그인 상태를 공급하는 Provider.
 * app/layout.tsx 최상단에 마운트해 모든 페이지에서 useAuth()를 사용
 *
 * - 마운트 시: /auth/me 호출 → JWT 쿠키로 현재 사용자 확인
 * - 로그아웃 시: /auth/logout 호출 → 쿠키 삭제 후 상태 초기화
 * - 로그인 모달: showModal 상태로 LoginModal 표시 여부 제어
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiFetch("/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: User | null) => setUser(data))
      .catch((err) => console.error("[Auth] /auth/me 실패:", err))
      .finally(() => setIsLoading(false));
  }, []);

  /** 백엔드 /auth/logout을 호출해 httpOnly 쿠키를 삭제하고 로컬 상태를 초기화 */
  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" })
      .catch((err) => console.error("[Auth] /auth/logout 실패:", err));
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        openLoginModal: () => setShowModal(true),
        logout,
      }}
    >
      {children}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </AuthContext.Provider>
  );
}

/**
 * 로그인 상태를 읽는 훅.
 * AuthProvider 하위 컴포넌트에서만 호출 가능.
 *
 * 반환값:
 *   user          - 로그인한 사용자 정보 (비로그인 시 null)
 *   isLoggedIn    - 로그인 여부
 *   isLoading     - /auth/me 응답 대기 중 여부
 *   openLoginModal - 로그인 모달 열기
 *   logout        - 로그아웃
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
