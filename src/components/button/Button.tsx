"use client";

import { ButtonProps } from "@/src/@types/components/button/button.interface";
import useThrottle from "@/src/hooks/useThrottle";
import { convertStringToTSX } from "@/src/utils/convertStringToJSX";
import clsx from "clsx";
import { useCallback, useMemo, useRef } from "react";

export default function Button({ onClick, type = "button", icon, text, className, disabled }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { throttle: isLoading, throttling } = useThrottle();

  const IconElement = useMemo(() => {
    if (!icon) return <></>;
    else return icon({ className: "shrink-0 grow-0" });
  }, [icon]);

  const TextElement = useMemo(() => {
    if (!text) return "";
    else {
      return convertStringToTSX(text, "font-black");
    }
  }, [text]);

  const clickHandler = useCallback(() => {
    onClick && throttling(onClick);
  }, [onClick, throttling]);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={clickHandler}
      className={clsx("button-primary test", className, disabled && "cursor-not-allowed", isLoading && "cursor-wait")}
      disabled={disabled}
    >
      {IconElement}
      {TextElement}
    </button>
  );
}
