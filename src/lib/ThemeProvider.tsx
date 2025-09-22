// ============================================================================
// 3. FIXED: src/lib/ThemeProvider.tsx
// Fix favicon href type casting error
// ============================================================================

"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { themes, Theme } from "../config/themes";
import { schoolConfig } from "../config/school";

interface ThemeContextType {
  theme: Theme;
  school: typeof schoolConfig;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const selectedTheme = themes[schoolConfig.selectedTheme] || themes.blue_professional;

  useEffect(() => {
    // Apply CSS variables ke document root
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty("--color-primary", selectedTheme.colors.primary);
    root.style.setProperty("--color-secondary", selectedTheme.colors.secondary);
    root.style.setProperty("--color-accent", selectedTheme.colors.accent);
    root.style.setProperty("--color-background", selectedTheme.colors.background);
    root.style.setProperty("--color-surface", selectedTheme.colors.surface);
    root.style.setProperty("--color-text-primary", selectedTheme.colors.text.primary);
    root.style.setProperty("--color-text-secondary", selectedTheme.colors.text.secondary);
    root.style.setProperty("--color-text-muted", selectedTheme.colors.text.muted);
    root.style.setProperty("--color-border", selectedTheme.colors.border);

    // Apply typography
    root.style.setProperty("--font-family", `${selectedTheme.typography.fontFamily}, sans-serif`);

    // Update title dan favicon
    document.title = `${schoolConfig.name} - Sistem Informasi Sekolah`;

    // FIXED: Proper type casting untuk favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = schoolConfig.assets.favicon;
    }
  }, [selectedTheme]);

  return <ThemeContext.Provider value={{ theme: selectedTheme, school: schoolConfig }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
