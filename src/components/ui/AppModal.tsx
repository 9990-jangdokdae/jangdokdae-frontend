"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

interface AppModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function AppModal({ title, children, onClose }: AppModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-6" onClick={onClose}>
      <section
        aria-label={title}
        aria-modal="true"
        className="max-h-[80vh] w-full max-w-[640px] overflow-y-auto rounded-lg bg-white p-6 shadow-[0_24px_60px_rgba(20,20,19,0.24)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[22px] font-semibold text-[#1d1d1f]">{title}</h2>
          <button
            aria-label="닫기"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}
