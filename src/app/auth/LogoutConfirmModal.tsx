"use client";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/**
 * 로그아웃 확인 모달.
 *
 *
 * @param onConfirm - 로그아웃 확인 버튼 클릭 콜백
 * @param onCancel  - 취소 또는 배경 클릭 콜백
 */
export function LogoutConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useLockBodyScroll();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/45 px-6"
      onClick={onCancel}
    >
      <section
        className="w-[380px] rounded-xl bg-[#ffffff] p-7 shadow-[0_24px_80px_rgba(20,20,19,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[20px] font-semibold text-[#1d1d1f]">로그아웃</h2>
        <p className="mt-3 text-[14px] leading-6 text-[#7a7a7a]">정말 로그아웃 하시겠습니까?</p>
        <div className="mt-7 flex justify-end gap-2">
          <button
            className="h-10 rounded-lg border border-[#e0e0e0] px-5 text-[14px] font-semibold text-[#1d1d1f] hover:bg-[#fbfcfd]"
            onClick={onCancel}
            type="button"
          >
            취소
          </button>
          <button
            className="h-10 rounded-lg bg-[#1d1d1f] px-5 text-[14px] font-semibold text-white transition hover:bg-[#333333]"
            onClick={onConfirm}
            type="button"
          >
            로그아웃
          </button>
        </div>
      </section>
    </div>
  );
}
