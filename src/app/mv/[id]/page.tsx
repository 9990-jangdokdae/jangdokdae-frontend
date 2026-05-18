import { redirect } from "next/navigation";

export default async function LegacyMarketVoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // issue-docent 상세 화면으로 이동시킨다.
  redirect(`/issue-docent/${id}`);
}
