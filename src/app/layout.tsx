// ============================================================================
// 5. UPDATE: src/app/layout.tsx
// Tambahkan ThemeProvider ke layout yang sudah ada
// ============================================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/lib/ThemeProvider"; // ADD THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Sekolah - Management System",
  description: "School Management System with Next.js 14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ThemeProvider>
          {" "}
          {/* ADD THIS WRAPPER */}
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>{" "}
        {/* ADD THIS WRAPPER */}
      </body>
    </html>
  );
}
