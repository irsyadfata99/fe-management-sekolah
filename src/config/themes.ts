// ============================================================================
// 1. CREATE: src/config/themes.ts
// Theme system yang mudah dikustomisasi oleh client
// ============================================================================

export const themes = {
  blue_professional: {
    name: "Blue Professional",
    colors: {
      primary: "#2563eb",      // Blue-600
      secondary: "#1e40af",    // Blue-700  
      accent: "#f59e0b",       // Amber-500
      background: "#ffffff",
      surface: "#f8fafc",      // Slate-50
      text: {
        primary: "#0f172a",    // Slate-900
        secondary: "#475569",  // Slate-600
        muted: "#64748b"       // Slate-500
      },
      border: "#e2e8f0"        // Slate-200
    },
    typography: {
      fontFamily: "Inter",
      headingWeight: "font-semibold",
      bodyWeight: "font-normal"
    }
  },
  
  green_nature: {
    name: "Green Nature", 
    colors: {
      primary: "#059669",      // Emerald-600
      secondary: "#047857",    // Emerald-700
      accent: "#f59e0b",       // Amber-500
      background: "#ffffff",
      surface: "#f0fdf4",      // Green-50
      text: {
        primary: "#0f172a",
        secondary: "#475569", 
        muted: "#64748b"
      },
      border: "#dcfce7"        // Green-100
    },
    typography: {
      fontFamily: "Inter",
      headingWeight: "font-semibold", 
      bodyWeight: "font-normal"
    }
  },

  purple_modern: {
    name: "Purple Modern",
    colors: {
      primary: "#7c3aed",      // Violet-600
      secondary: "#6d28d9",    // Violet-700
      accent: "#f59e0b",       // Amber-500
      background: "#ffffff",
      surface: "#faf5ff",      // Violet-50
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        muted: "#64748b" 
      },
      border: "#e9d5ff"        // Violet-200
    },
    typography: {
      fontFamily: "Poppins",
      headingWeight: "font-medium",
      bodyWeight: "font-normal"
    }
  }
};

export type ThemeKey = keyof typeof themes;
export type Theme = (typeof themes)[ThemeKey];