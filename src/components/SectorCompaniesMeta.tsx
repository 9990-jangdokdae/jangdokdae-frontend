"use client";

import type { SectorCompanies } from "@/types/issueDocent";

export function SectorCompaniesMeta({ groups }: { groups: SectorCompanies[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="mt-5 grid gap-2">
      {groups.map((group, groupIndex) => (
        <div
          key={`${group.sector ?? "unknown"}-${groupIndex}`}
          className="flex items-center gap-2 text-[13px]"
        >
          {group.sector && <span className="font-semibold text-[#1d1d1f]">{group.sector}</span>}
          <div className="flex flex-wrap gap-1.5">
            {group.companies.map((company, companyIndex) => (
              <span
                key={`${company.name}-${companyIndex}`}
                className="rounded-full bg-[#f7f8fa] px-2.5 py-1 font-medium text-[#7a7a7a]"
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
