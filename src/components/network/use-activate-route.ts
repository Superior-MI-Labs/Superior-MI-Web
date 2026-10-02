"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useActivateRoute() {
  const router = useRouter();

  return useCallback(
    (route: string) => {
      router.push(route);
    },
    [router],
  );
}
