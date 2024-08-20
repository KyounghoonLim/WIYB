'use client'

import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { InputProps } from 'types/components/input/input.interface'

export default function Input_Primary({
  type = 'text',
  value = '',
  placeholder = '',
  id,
  className,
  disabled = false,
  maxLength = 100,
  onChange,
  onFocus,
  onBlur,
  preprocessor,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isHide, setIsHide] = useState<boolean>(true)
  const [isHover, setIsHover] = useState<boolean>(false)

  // password type 인 경우, hide / show 가능하게 하는 변수 //
  const inputType = useMemo(() => {
    if (type !== 'password') return type
    else return isHide ? 'password' : 'text'
  }, [type, isHide])

  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      onChange?.(preprocessor?.(value) || value)
    },
    [preprocessor, onChange]
  )

  const focusHandler = useCallback(() => {
    try {
      const v = String(value)
      inputRef.current?.setSelectionRange(v?.length, v?.length)
    } catch {
      /// pass ///
    } finally {
      setIsFocus(true)
      onFocus?.(value)
    }
  }, [value, onFocus])

  const blurHandler = useCallback(() => {
    if (!isHover) {
      setIsFocus(false)
      setIsHide(true)
    }
    onBlur?.(value)
  }, [isHover, value, onBlur])

  return (
    <input
      ref={inputRef}
      id={id}
      className={clsx('input-primary', className)}
      type={inputType}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={changeHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      disabled={disabled}
      data-prevent-close-keyboard="true"
      autoComplete="off"
      spellCheck={false}
    />
  )
}
