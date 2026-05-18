import { redirect } from "next/navigation";

export default function LegacyMarketVoicePage() {
  // issue-docent 목록 화면으로 이동시킨다.
  redirect("/issue-docent");
}
