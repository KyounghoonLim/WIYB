import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function Thumbnail_Profile({
  src,
  width = 64,
  className,
}: Pick<ImageProps, 'src' | 'width' | 'className'>) {
  return (
    <Image
      src={src || '/images/image_default_profile.png'}
      width={width}
      height={width}
      className={clsx('thumbnail-profile', className)}
      alt=""
      unoptimized
      data-exist={src ? 'true' : 'false'}
    />
  )
}
