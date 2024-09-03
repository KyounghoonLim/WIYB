import { InputDateProps } from 'types/components/input/inputDate.interface'
import { dateToString } from 'utils/dateUtils'
import clsx from 'clsx'
import React, { SyntheticEvent, useCallback, useContext, useMemo, useRef } from 'react'

export default function Input_Date({
  onChange,
  id,
  value,
  placeholder,
  maxDate = new Date(Date.now()).toISOString().split('T')[0],
  className,
}: InputDateProps) {
  const inputRef = useRef<HTMLInputElement>()
  const { current: dateFormat } = useRef('YYYY.MM.DD')

  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      onChange(value)
    },
    [onChange]
  )

  return (
    <div className="w-full px-4 bg-white rounded-2xl" data-prevent-close-keyboard="true">
      <input
        id={id}
        ref={inputRef}
        className={clsx('input-primary', className)}
        type="date"
        value={typeof value === 'string' ? value : dateToString(value)}
        // placeholder={placeholder || dateFormat}
        onChange={changeHandler}
        autoComplete={'off'}
        inputMode="decimal"
        data-placeholder={placeholder || dateFormat}
        pattern={dateFormat}
        max={maxDate}
        required
        // readOnly
      />
    </div>
  )
}
