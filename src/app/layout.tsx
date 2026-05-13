import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AgentTerminalRail } from "@/components/layout/agent-terminal-rail";

export const metadata: Metadata = {
  title: "Lambda — The Superintelligence Cloud",
  description: "Supercomputers for training and inference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--lambda-bg)] text-[var(--lambda-text-secondary)]">
        <Header />
        <AgentTerminalRail />
        <div className="pt-[100px] flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
