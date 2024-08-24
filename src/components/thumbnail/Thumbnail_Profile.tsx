import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function Thumbnail_Profile({ src, width = 64 }: Pick<ImageProps, 'src' | 'width'>) {
  return (
    <Image
      src={src || '/images/image_default_profile.png'}
      width={width}
      height={width}
      className={'thumbnail-profile'}
      alt=""
      unoptimized
      data-exist={src ? 'true' : 'false'}
    />
  )
}
