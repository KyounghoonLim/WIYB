import Portal from "@/src/components/portal/Portal";
import React from "react";
import CloseIcon from "i/icon_close_bold.svg";
import Link from "next/link";
import { PATH } from "@/src/constants/path.constant";

export default function SignNav() {
  return (
    <Portal target="nav">
      <Link href={PATH.LOGIN}>
        <CloseIcon />
      </Link>
    </Portal>
  );
}
