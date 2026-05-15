/**
 * 백엔드 서버 주소 상수
 *
 * 위치: lib/
 *
 * 환경변수 NEXT_PUBLIC_API_URL이 없으면 로컬 개발 서버 주소로 폴백.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
export const API_V1_BASE = `${API_BASE}/api/v1`;

/**
 * credentials: "include"가 기본 적용된 fetch 래퍼.
 * 모든 API 요청에 JWT 쿠키가 자동으로 포함된다.
 */
export const apiFetch = (path: string, options?: RequestInit) =>
  fetch(`${API_V1_BASE}${path}`, { credentials: "include", ...options });
