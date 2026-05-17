import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiRequestError } from "@/lib/api";
import { getIssueDocent } from "@/lib/issueDocent";
import { IssueDocentDetailClient } from "./IssueDocentDetailClient";

export const metadata: Metadata = {
  title: "이슈 도슨트 | 장독대",
  description: "장독대 이슈 도슨트 상세와 퀴즈",
};

interface IssueDocentDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchIssueDocentOrNotFound(id: string) {
  try {
    return await getIssueDocent(id);
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function IssueDocentDetailPage({ params }: IssueDocentDetailPageProps) {
  const { id } = await params;
  const issueDocent = await fetchIssueDocentOrNotFound(id);

  return <IssueDocentDetailClient issueDocent={issueDocent} />;
}
