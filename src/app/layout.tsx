import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AICoding",
  description: "Claude Code 驱动的书签管理应用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <h1 className="text-xl font-bold tracking-tight">AICoding</h1>
            <nav className="flex gap-4 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">
                首页
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
