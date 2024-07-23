"use client";

import React, { useCallback, useMemo } from "react";
/// hooks ///
import useThrottle from "s/hooks/useThrottle";
/// types ///
import { ButtonProps } from "s/interfaces/components/button.interface";
/// utils ///
import clsx from "clsx";

export default function Button({ children, type = "button", disabled, className, onClick }: ButtonProps) {
  const { throttle: isLoading, throttling } = useThrottle();

  const renderedChildren = useMemo(() => {
    if (!children) return <></>;
    else return children({ disabled, isLoading });
  }, [disabled, isLoading, children]);

  const clickHandler = useCallback(async () => {
    onClick && throttling(onClick);
  }, [throttling, onClick]);

  return (
    <button type={type} disabled={disabled} onClick={clickHandler} className={clsx(className, disabled && "cursor-not-allowed", isLoading && "cursor-wait")}>
      {renderedChildren}
    </button>
  );
}
