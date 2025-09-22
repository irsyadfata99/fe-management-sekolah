"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
