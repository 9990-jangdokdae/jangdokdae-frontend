import type { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "마켓 정보 | 장독대",
  description: "코스피와 코스닥 주요 지수",
};

type Trend = "up" | "down";

interface MarketIndex {
  name: string;
  value: string;
  change: string;
  pointChange: string;
  trend: Trend;
  updatedAt: string;
  description: string;
  sparkline: string;
}

const marketIndices: MarketIndex[] = [
  {
    name: "코스피",
    value: "6,667.60",
    change: "+0.40%",
    pointChange: "+26.54",
    trend: "up",
    updatedAt: "2026.05.02 15:30",
    description: "대형주 중심의 한국 대표 주식시장 흐름입니다.",
    sparkline: "0,48 32,40 64,44 96,32 128,36 160,26 192,22 224,24 256,18 288,30",
  },
  {
    name: "코스닥",
    value: "1,215.45",
    change: "-0.01%",
    pointChange: "-0.12",
    trend: "down",
    updatedAt: "2026.05.02 15:30",
    description: "성장주와 중소형 기술주의 움직임을 보여주는 시장입니다.",
    sparkline: "0,28 32,18 64,50 96,44 128,38 160,32 192,28 224,23 256,27 288,29",
  },
];


function Sparkline({ index }: { index: MarketIndex }) {
  const stroke = index.trend === "up" ? "#e5484d" : "#2563eb";

  return (
    <svg className="h-[120px] w-full" viewBox="0 0 288 72" aria-hidden="true">
      <path d="M0 58 H288" stroke="#e0e0e0" strokeDasharray="5 5" />
      <polyline points={index.sparkline} fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}

function IndexCard({ index }: { index: MarketIndex }) {
  const positive = index.trend === "up";
  const TrendIcon = positive ? TrendingUp : TrendingDown;

  return (
    <article className="rounded-lg border border-[#e0e0e0] bg-white p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[#c96442]">{index.updatedAt} 기준</p>
          <h2 className="mt-3 text-[32px] font-semibold text-[#1d1d1f]">{index.name}</h2>
          <p className="mt-2 text-[15px] leading-6 text-[#7a7a7a]">{index.description}</p>
        </div>
        <span className={`grid h-12 w-12 place-items-center rounded-full ${positive ? "bg-[#fff1f1] text-[#e5484d]" : "bg-[#eef4ff] text-[#2563eb]"}`}>
          <TrendIcon className="h-6 w-6" />
        </span>
      </div>

      <div className="mt-8">
        <p className="text-[48px] font-normal leading-none text-[#1d1d1f]">{index.value}</p>
        <div className={`mt-3 flex items-center gap-2 text-[17px] font-semibold ${positive ? "text-[#e5484d]" : "text-[#2563eb]"}`}>
          <span>{index.pointChange}</span>
          <span>{index.change}</span>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-[#f7f8fa] p-4">
        <Sparkline index={index} />
      </div>
    </article>
  );
}

export default function MarketIndicesPage() {
  return (
    <div className="min-h-screen min-w-[1376px] bg-[#ffffff] text-[#1d1d1f]">
      <Header activeIndex={2} />

      <main className="mx-[100px] w-[1176px] bg-[#ffffff] pb-24 pt-8">
        <section className="grid grid-cols-2 gap-4 py-8">
          {marketIndices.map((index) => <IndexCard key={index.name} index={index} />)}
        </section>
      </main>
    </div>
  );
}
