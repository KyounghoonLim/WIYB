import React, { useCallback, useMemo } from 'react'
import { BadgeProps } from 'types/components/badge/badge.interface'
import { convertStringToTSX } from 'utils/convertStringToJSX'
import clsx from 'clsx'

export default function Badge({ text = '', icon, children, onClick, className }: BadgeProps) {
  const clickHandler = useCallback(() => {
    onClick?.(text)
  }, [text, onClick])

  return (
    <span className={clsx('badge', className)} onClick={clickHandler}>
      {icon?.({ className: 'no-auto-size' })}
      {convertStringToTSX(text, 'font-bold')}
      {children}
    </span>
  )
}
