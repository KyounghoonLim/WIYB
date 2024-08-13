import { BedgeProps } from '@/src/@types/components/bedge/bedge.interface'
import { convertStringToTSX } from '@/src/utils/convertStringToJSX'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'

export default function Bedge({ text, icon, onClick, className }: BedgeProps) {
  const IconElement = useMemo(() => {
    if (!icon) return <></>
    else return icon({ className: 'shrink-0 grow-0' })
  }, [icon])

  const TextElement = useMemo(() => {
    if (!text) return ''
    else {
      return convertStringToTSX(String(text), 'font-black')
    }
  }, [text])

  const clickHandler = useCallback(() => {
    onClick?.(text)
  }, [text, onClick])

  return (
    <span className={clsx('bedge', className)} onClick={clickHandler}>
      {IconElement}
      {TextElement}
    </span>
  )
}
