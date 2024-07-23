"use client";

import React, { useCallback, useState } from "react";

export default function useThrottle() {
  const [throttle, setThrottle] = useState<boolean>(false);

  const throttling = useCallback(
    async (fn: () => any) => {
      if (throttle) return;
      else {
        setThrottle(true);
        await fn();
        setThrottle(false);
      }
    },
    [throttle]
  );

  return { throttle, throttling };
}
