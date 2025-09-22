// ============================================================================
// 10. UPDATE: src/app/(public)/layout.tsx
// Layout untuk public pages dengan Header dan Footer
// ============================================================================

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
