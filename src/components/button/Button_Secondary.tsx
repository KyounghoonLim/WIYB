'use client'

import { ButtonProps } from 'types/components/button/button.interface'
import useThrottle from 'hooks/useThrottle'
import { convertStringToTSX } from 'utils/convertStringToJSX'
import clsx from 'clsx'
import { useCallback, useRef } from 'react'

export default function Button_Secondary({
  onClick,
  type = 'button',
  icon,
  text,
  className,
  disabled,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { throttle: isLoading, throttling } = useThrottle(true)

  const clickHandler = useCallback(() => {
    onClick && throttling(onClick)
  }, [onClick, throttling])

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={clickHandler}
      className={clsx('button-secondary', className, isLoading && 'cursor-wait')}
      disabled={disabled}
    >
      {icon?.({})}
      <span className="flex-row-start gap-0">{convertStringToTSX(text, 'font-bold')}</span>
    </button>
  )
}
