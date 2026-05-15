"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Star, X } from "lucide-react";
import { companyOptions, sectorOptions } from "@/lib/jangdokdaeData";
import type { InterestProfile } from "@/types/jangdokdae";
import { toggleItem } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useInterestProfile } from "@/hooks/useInterestProfile";
import { OptionGrid } from "@/components/ui/OptionGrid";

function InterestEditor({
  profile,
  onChange,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
}) {
  return (
    <div className="space-y-7">
      <section>
        <p className="mb-3 text-[13px] font-semibold text-[#7a7a7a]">관심 섹터</p>
        <OptionGrid
          options={sectorOptions}
          selected={profile.sectors}
          onToggle={(sector) => onChange({ ...profile, sectors: toggleItem(profile.sectors, sector) })}
        />
      </section>
      <section>
        <p className="mb-3 text-[13px] font-semibold text-[#7a7a7a]">관심 종목</p>
        <OptionGrid
          options={companyOptions}
          selected={profile.companies}
          onToggle={(company) => onChange({ ...profile, companies: toggleItem(profile.companies, company) })}
        />
      </section>
    </div>
  );
}

function InterestDrawer({
  profile,
  onChange,
  onClose,
}: {
  profile: InterestProfile;
  onChange: (profile: InterestProfile) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/25" onClick={onClose}>
      <aside className="ml-auto h-full w-[460px] overflow-y-auto bg-[#ffffff] p-7 shadow-[-18px_0_50px_rgba(20,20,19,0.16)]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#c96442]">내 관심</p>
            <h2 className="mt-2 text-[26px] font-semibold text-[#1d1d1f]">관심 섹터와 종목</h2>
            <p className="mt-3 text-[14px] leading-6 text-[#7a7a7a]">선택을 바꾸면 관심 이슈 기준이 바뀝니다.</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#fbfcfd]" aria-label="닫기" onClick={onClose} type="button">
            <X className="h-5 w-5 text-[#7a7a7a]" />
          </button>
        </div>
        <div className="mt-8">
          <InterestEditor profile={profile} onChange={onChange} />
        </div>
      </aside>
    </div>
  );
}

export function InterestRail() {
  const { isLoggedIn } = useAuth();
  const { profile, saveProfile } = useInterestProfile();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoggedIn) return null;

  return (
    <>
      <button
        className={`fixed right-3 top-[76px] z-40 grid h-8 w-8 place-items-center rounded-full border border-[#e0e0e0] bg-[#ffffff] text-[#7a7a7a] transition hover:bg-[#fbfcfd] hover:text-[#1d1d1f] ${
          collapsed ? "shadow-[0_8px_24px_rgba(20,20,19,0.08)]" : ""
        }`}
        onClick={() => setCollapsed((value) => !value)}
        type="button"
        aria-label={collapsed ? "우측 패널 펼치기" : "우측 패널 접기"}
        aria-expanded={!collapsed}
      >
        {collapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      <aside
        className={`fixed bottom-0 right-0 top-[64px] z-30 flex w-16 flex-col items-center gap-6 border-l border-[#f0f0f0] bg-[#ffffff] pt-[68px] text-[#7a7a7a] transition-transform duration-200 ${
          collapsed ? "translate-x-full" : "translate-x-0"
        }`}
        aria-hidden={collapsed}
      >
        <div className="flex flex-col items-center gap-1 text-[11px]"><Clock3 className="h-5 w-5" />최근 본</div>
        <button className="flex flex-col items-center gap-1 text-[11px] text-[#1d1d1f]" onClick={() => setOpen(true)} type="button">
          <Star className="h-5 w-5 fill-[#c96442] text-[#c96442]" />
          내 관심
        </button>
      </aside>
      {open && <InterestDrawer profile={profile} onChange={saveProfile} onClose={() => setOpen(false)} />}
    </>
  );
}
