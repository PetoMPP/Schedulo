import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useIsBiz(): boolean {
  const pathname = usePathname();
  return useMemo(() => pathname.startsWith("/biz"), [pathname]);
}
