import clsx from "clsx";
import React, { SyntheticEvent, useCallback, useRef } from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => any | Promise<any>;
  className?: string;
}

export default function Form({ children, onSubmit, className }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const throttleRef = useRef<boolean>(false);

  const submitHander = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (throttleRef.current) return;
      else {
        try {
          throttleRef.current = true;
          if (formRef?.current) formRef.current.style.pointerEvents = "none";
          await onSubmit();
        } finally {
          if (formRef?.current) formRef.current.style.pointerEvents = "auto";
          throttleRef.current = false;
        }
      }
    },
    [onSubmit]
  );

  return (
    <form ref={formRef} className={clsx("form", className)} onSubmit={submitHander}>
      {children}
    </form>
  );
}
