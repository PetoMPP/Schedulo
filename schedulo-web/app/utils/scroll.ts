export function scrollToLeft(
  e: HTMLElement,
  to: number,
  duration: number,
  easingFunction?: (t: number) => number,
  onScrollEnd?: () => void
) {
  scrollToLeftX(
    e,
    e.scrollLeft,
    to,
    0,
    1 / duration,
    easingFunction ?? linear,
    onScrollEnd
  );
}

function scrollToLeftX(
  element: HTMLElement,
  from: number,
  to: number,
  t01: number,
  speed: number,
  easingFunction: (t: number) => number,
  onScrollEnd?: () => void
) {
  const step = 1000 / 60;
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollLeft = to;
    onScrollEnd?.();
    return;
  }
  element.scrollLeft = from - (from - to) * easingFunction(t01);
  t01 += speed * step;

  setTimeout(function () {
    scrollToLeftX(element, from, to, t01, speed, easingFunction, onScrollEnd);
  }, step);
}

/* Effects Functions */
export function linear(t: number): number {
  return t;
}

export function easeOutCuaic(t: number): number {
  t--;
  return t * t * t + 1;
}
