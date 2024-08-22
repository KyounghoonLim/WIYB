import Image from 'next/image'
import React from 'react'

export default function LoadingSpinner({
  width = 100,
  height = 100,
}: {
  width?: number
  height?: number
}) {
  return (
    <div className="w-full h-full flex-row-center">
      <Image
        src="/images/image_loading_spinner.webp"
        width={width}
        height={height}
        alt=""
        unoptimized
      />
    </div>
  )
}
