"use client";

/**
 * 관심 프로필(섹터·종목) 상태 관리 훅
 *
 * - 로그인: 마운트 시 서버에서 로드, 저장 시 서버 + localStorage 동기화
 * - 비로그인: localStorage만 사용
 * - 로그아웃: localStorage 클리어 (공유 기기 보호)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { InterestProfile } from "@/types/jangdokdae";
import { apiFetch } from "@/lib/api";
import { defaultInterestProfile, interestStorageKey } from "@/lib/jangdokdae-data";
import { useAuth } from "@/hooks/useAuth";

function readLocalProfile(): InterestProfile {
  try {
    const stored = window.localStorage.getItem(interestStorageKey);
    if (stored) return JSON.parse(stored) as InterestProfile;
  } catch (err) {
    console.warn("[InterestProfile] localStorage 파싱 실패:", err);
  }
  return defaultInterestProfile;
}

function writeLocalProfile(profile: InterestProfile): void {
  window.localStorage.setItem(interestStorageKey, JSON.stringify(profile));
}

function clearLocalProfile(): void {
  window.localStorage.removeItem(interestStorageKey);
}

export function useInterestProfile() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<InterestProfile>(defaultInterestProfile);
  const [isLoading, setIsLoading] = useState(true);
  const prevIsLoggedIn = useRef<boolean | null>(null);

  useEffect(() => {
    if (authLoading) return;

    const prev = prevIsLoggedIn.current;
    prevIsLoggedIn.current = isLoggedIn;

    // 로그아웃 전환 시 localStorage 클리어
    if (prev === true && !isLoggedIn) {
      clearLocalProfile();
      setProfile(defaultInterestProfile);
      setIsLoading(false);
      return;
    }

    if (isLoggedIn) {
      apiFetch("/user/profile")
        .then((r) => (r.ok ? r.json() : null))
        .then((data: { sectors: string[]; companies: string[] } | null) => {
          if (data) {
            const serverProfile: InterestProfile = { sectors: data.sectors, companies: data.companies };
            setProfile(serverProfile);
            writeLocalProfile(serverProfile);
          } else {
            setProfile(readLocalProfile());
          }
        })
        .catch((err) => {
          console.error("[InterestProfile] 서버 프로필 로드 실패:", err);
          setProfile(readLocalProfile());
        })
        .finally(() => setIsLoading(false));
    } else {
      setProfile(readLocalProfile());
      setIsLoading(false);
    }
  }, [isLoggedIn, authLoading]);

  /**
   * 관심 프로필을 저장한다.
   * 서버 저장 실패 시 예외를 전파해 호출자가 UX를 처리할 수 있게 한다.
   */
  const saveProfile = useCallback(
    async (next: InterestProfile): Promise<void> => {
      setProfile(next);
      writeLocalProfile(next);

      if (isLoggedIn) {
        const res = await apiFetch("/user/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectors: next.sectors, companies: next.companies }),
        });

        if (!res.ok) {
          const msg = `서버 저장 실패 (${res.status})`;
          console.error("[InterestProfile]", msg);
          throw new Error(msg);
        }
      }
    },
    [isLoggedIn],
  );

  return { profile, saveProfile, isLoading };
}
