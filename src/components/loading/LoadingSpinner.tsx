import Image from 'next/image'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex-row-center">
      <Image src="/images/image_loading_spinner.webp" width={100} height={100} alt="" unoptimized />
    </div>
  )
}
