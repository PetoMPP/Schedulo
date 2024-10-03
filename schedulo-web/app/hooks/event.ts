import { useEffect } from "react";

export default function useEvent(
  target: () => EventTarget,
  eventType: string,
  callback: (e: Event) => void
) {
  useEffect(() => {
    target().addEventListener(eventType, callback);
    return () => {
      target().removeEventListener(eventType, callback);
    };
  }, [target, eventType, callback]);
}
