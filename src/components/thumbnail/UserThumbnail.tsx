import Image, { ImageProps } from "next/image";
import React from "react";

export default function UserThumbnail({ src, width = 64 }: Pick<ImageProps, "src" | "width">) {
  return <Image src={src} width={width} height={width} className="thumbnail-user" alt="" loading="lazy" />;
}
