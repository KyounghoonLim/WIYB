"use client";

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

export default function Thumbnail({ src, width = 50, className }: Pick<ImageProps, "src" | "width" | "className">) {
  return <Image src={src} width={width} height={width} className={clsx("thumbnail-primary", className)} alt="" loading="lazy" />;
}
