import { useState } from "react";
import useEvent from "./event";

export enum WindowWidth {
  Small = 640,
  Medium = 768,
  Large = 1024,
  XLarge = 1280,
  XXLarge = 1536,
}

function getWindowWidth(w: number): WindowWidth {
  if (w < WindowWidth.Small) return WindowWidth.Small;
  if (w < WindowWidth.Medium) return WindowWidth.Medium;
  if (w < WindowWidth.Large) return WindowWidth.Large;
  if (w < WindowWidth.XLarge) return WindowWidth.XLarge;
  if (w < WindowWidth.XXLarge) return WindowWidth.XXLarge;
  return WindowWidth.XXLarge;
}

export default function useWindowWidth(): WindowWidth {
  const [width, setWidth] = useState(getWindowWidth(window.innerWidth));
  useEvent(window, "resize", () => setWidth(getWindowWidth(window.innerWidth)));

  return width;
}
