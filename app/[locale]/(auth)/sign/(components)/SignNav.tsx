import Portal from "@/src/components/portal/Portal";
import React from "react";
import CloseIcon from "i/icon_close_bold.svg";

export default function SignNav() {
  return (
    <Portal target="nav">
      <CloseIcon />
    </Portal>
  );
}
