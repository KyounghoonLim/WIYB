'use client'

import { ButtonProps } from 'types/components/button/button.interface'
import useThrottle from 'hooks/useThrottle'
import { convertStringToTSX } from 'utils/convertStringToJSX'
import clsx from 'clsx'
import { useCallback, useMemo, useRef } from 'react'

export default function Button_Primary({
  onClick,
  type = 'button',
  icon,
  text,
  className,
  disabled,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { throttle: isLoading, throttling } = useThrottle(true)

  const IconElement = useMemo(() => {
    if (!icon) return <></>
    else return icon({ className: 'shrink-0 grow-0' })
  }, [icon])

  const TextElement = useMemo(() => {
    if (!text) return ''
    else {
      return convertStringToTSX(text, 'font-black')
    }
  }, [text])

  const clickHandler = useCallback(() => {
    onClick && throttling(onClick)
  }, [onClick, throttling])

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={clickHandler}
      className={clsx('button-primary', className, isLoading && 'cursor-wait')}
      disabled={disabled}
    >
      {IconElement}
      <span className="flex-row-start gap-0">{TextElement}</span>
    </button>
  )
}
