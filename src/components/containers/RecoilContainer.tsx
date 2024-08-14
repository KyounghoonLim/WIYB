"use client";

import { RecoilRoot } from "recoil";

export default function RecoilContainer({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
