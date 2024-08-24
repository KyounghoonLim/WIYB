import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function Thumbnail_Primary({
  src,
  width = 50,
  height,
  className,
}: Pick<ImageProps, 'src' | 'width' | 'height' | 'className'>) {
  return (
    <Image
      src={src || '/images/image_default.png'}
      width={width}
      height={height || width}
      className={clsx('thumbnail-primary', className)}
      alt=""
      loading="lazy"
      unoptimized
      data-exist={src ? 'true' : 'false'}
    />
  )
}
