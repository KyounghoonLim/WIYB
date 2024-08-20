import React, { useCallback, useMemo } from 'react'
import { BedgeProps } from 'types/components/bedge/bedge.interface'
import { convertStringToTSX } from 'utils/convertStringToJSX'
import clsx from 'clsx'

export default function Bedge({ text = '', icon, children, onClick, className }: BedgeProps) {
  const clickHandler = useCallback(() => {
    onClick?.(text)
  }, [text, onClick])

  return (
    <span className={clsx('bedge', className)} onClick={clickHandler}>
      {icon?.({ className: 'no-auto-size' })}
      {convertStringToTSX(text, 'font-bold')}
      {children}
    </span>
  )
}
