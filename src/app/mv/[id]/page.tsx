import type { Metadata } from "next";
import { MarketVoiceDetailClient } from "./MarketVoiceDetailClient";

export const metadata: Metadata = {
  title: "주린이 번역 | 장독대",
  description: "장독대 이슈 상세와 퀴즈",
};

export default function MarketVoiceDetailPage() {
  return <MarketVoiceDetailClient />;
}
