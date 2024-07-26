import Image, { ImageProps } from "next/image";
import React from "react";

export default function Thumbnail({ src, width = 50 }: Pick<ImageProps, "src" | "width">) {
  return <Image src={src} width={width} height={width} className="thumbnail" alt="" loading="lazy" />;
}
