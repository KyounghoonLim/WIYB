'use client'

import React, { useCallback, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import clsx from 'clsx'
import { TextareaProps } from 'types/components/textarea/textarea.interface'

export default function Textarea({
  id,
  value = '',
  placeholder,
  disabled,
  maxLength,
  className,
  containerClassName,
  onChange,
  onFocus,
  onBlur,
  preprocessor,
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>()

  const [isFocus, setIsFocus] = useState<boolean>(false)

  const changeHandler = useCallback(
    (e) => {
      if (!onChange) return
      if (preprocessor) onChange(preprocessor(e.target.value))
      else onChange(e.target.value)
    },
    [preprocessor, onChange]
  )

  const focusHandler = useCallback(() => {
    textareaRef.current?.setSelectionRange((value as string)?.length, (value as string)?.length)
    setIsFocus(true)
    onFocus?.(value)
  }, [value, onFocus])

  const blurHandler = useCallback(() => {
    setIsFocus(false)
    onBlur?.(value)
  }, [value, onBlur])

  return (
    <div className={clsx('textarea-container', containerClassName)}>
      <textarea
        //@ts-ignore
        ref={textareaRef}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={clsx('textarea', className)}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        autoComplete={'off'}
        spellCheck={false}
        data-prevent-close-keyboard="true"
      />
    </div>
  )
}
