import { useState } from "react";
import useEvent from "./event";

export enum ColorScheme {
  Light,
  Dark,
}

export default function useColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState(
    getColorSchemeFromMediaQuery(getColorSchemeMediaQuery())
  );
  useEvent(getColorSchemeMediaQuery(), "change", (e) => {
    setColorScheme(getColorSchemeFromMediaQuery(e.target as MediaQueryList));
  });
  return colorScheme;
}

function getColorSchemeMediaQuery(): MediaQueryList {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

function getColorSchemeFromMediaQuery(mediaQuery: MediaQueryList): ColorScheme {
  return mediaQuery.matches ? ColorScheme.Dark : ColorScheme.Light;
}
