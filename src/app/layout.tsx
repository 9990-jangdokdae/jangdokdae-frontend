import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { InterestProfileProvider } from "@/hooks/useInterestProfile";

export const metadata: Metadata = {
  title: "장독대 - 시장 독해를 대신 해드립니다",
  description: "주린이를 위한 시장 이슈 번역과 퀴즈",
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
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <InterestProfileProvider>{children}</InterestProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
