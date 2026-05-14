import { useEffect } from "react";

/**
 * 모달 열림 시 body 스크롤을 잠그는 훅.
 *
 * 단순히 overflow: hidden만 설정하면 스크롤바가 사라지면서
 * 레이아웃이 오른쪽으로 밀리는 현상(layout shift)이 발생한다.
 * 스크롤바 너비만큼 padding-right를 보상해 이를 방지한다.
 */
export function useLockBodyScroll(): void {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.paddingRight = "";
    };
  }, []);
}
