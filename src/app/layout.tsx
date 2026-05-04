import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장독대 - 시장 독해를 대신 해드립니다",
  description: "주린이를 위한 시장 이슈 번역과 퀴즈",
  icons: {
    icon: "/images/moneytoring/site/favicon.ico",
    apple: "/images/moneytoring/site/favicon/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
