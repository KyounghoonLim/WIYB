import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function Thumbnail({
  src,
  width = 50,
  className,
}: Pick<ImageProps, 'src' | 'width' | 'className'>) {
  return (
    <Image
      src={src || '/images/image_default.png'}
      width={width}
      height={width}
      className={clsx('thumbnail-primary', className)}
      alt=""
      loading="lazy"
    />
  )
}
