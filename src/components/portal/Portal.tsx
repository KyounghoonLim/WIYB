"use client";

import React, { useLayoutEffect, useState } from "react";
import reactDOM from "react-dom";

interface PortalProps {
  target: string;
  children: React.ReactNode;
}

export default function Portal({ target, children }: PortalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement>();

  useLayoutEffect(() => {
    setPortalTarget((document.getElementById(target) || document.getElementsByTagName(target)[0]) as HTMLElement);
  }, []);

  return portalTarget ? reactDOM.createPortal(children, portalTarget) : null;
}
