import Image from "next/image";
import React from "react";

export default function LoadingSpinner() {
  return <Image src="/images/image_loading_spinner.webp" width={100} height={100} alt="" className="mx-auto my-auto" />;
}
