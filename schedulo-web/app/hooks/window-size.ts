import { useState } from "react";
import useEvent from "./event";

export enum WindowWidth {
  Small = 640,
  Medium = 768,
  Large = 1024,
  XLarge = 1280,
  XXLarge = 1536,
}

function getWindowWidth(): WindowWidth {
  if (typeof window === "undefined") {
    return WindowWidth.XXLarge;
  }
  const w = window.innerWidth;
  if (w < WindowWidth.Small) return WindowWidth.Small;
  if (w < WindowWidth.Medium) return WindowWidth.Medium;
  if (w < WindowWidth.Large) return WindowWidth.Large;
  if (w < WindowWidth.XLarge) return WindowWidth.XLarge;
  if (w < WindowWidth.XXLarge) return WindowWidth.XXLarge;
  return WindowWidth.XXLarge;
}

export default function useWindowWidth(): WindowWidth {
  const [width, setWidth] = useState(getWindowWidth());
  const safeWindow = typeof window !== "undefined" ? window : undefined;
  useEvent(safeWindow, "resize", () => setWidth(getWindowWidth()));

  return width;
}
