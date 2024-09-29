"use client";

import useIsBiz from "./hooks/is-biz";
import useColorScheme, { ColorScheme } from "./hooks/color-scheme";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const light = "garden";
  const dark = "dracula";
  const lightBiz = "corporate";
  const darkBiz = "business";
  const isBiz = useIsBiz();
  const colorScheme = useColorScheme();
  const theme = isBiz
    ? colorScheme === ColorScheme.Light
      ? lightBiz
      : darkBiz
    : colorScheme === ColorScheme.Light
    ? light
    : dark;
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
