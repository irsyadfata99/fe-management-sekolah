/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Custom theme colors using CSS variables
      colors: {
        "theme-primary": "rgb(from var(--theme-primary) r g b / <alpha-value>)",
        "theme-secondary": "rgb(from var(--theme-secondary) r g b / <alpha-value>)",
        "theme-accent": "rgb(from var(--theme-accent) r g b / <alpha-value>)",
        "theme-background": "rgb(from var(--theme-background) r g b / <alpha-value>)",
        "theme-surface": "rgb(from var(--theme-surface) r g b / <alpha-value>)",
        "theme-text": "rgb(from var(--theme-text) r g b / <alpha-value>)",
        "theme-text-secondary": "rgb(from var(--theme-text-secondary) r g b / <alpha-value>)",
      },
      // Custom gradients
      backgroundImage: {
        "theme-gradient": "var(--theme-gradient)",
        "theme-gradient-secondary": "var(--theme-gradient-secondary)",
        "blue-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "green-gradient": "linear-gradient(135deg, #48cc6c 0%, #6fcf97 100%)",
        "purple-gradient": "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
      },
    },
  },
  plugins: [],
};
