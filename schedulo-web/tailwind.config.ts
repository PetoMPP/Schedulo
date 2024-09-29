import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import tailwindcss_animated from "tailwindcss-animated";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [daisyui, tailwindcss_animated],
  daisyui: {
    themes: ["garden", "dracula", "corporate", "business"],
  },
};
export default config;
