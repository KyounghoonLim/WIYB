'use client'

import clsx from 'clsx'
import { SyntheticEvent, useCallback, useRef } from 'react'
import { Input_Checkbox_Props } from 'types/components/input/input.interface'

export default function Input_Checkbox({
  name,
  value,
  isChecked,
  label,
  onChange,
  className,
}: Input_Checkbox_Props) {
  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      onChange?.(value)
    },
    [onChange]
  )

  return (
    <div className={clsx('input-checkbox-container', className)}>
      <label htmlFor={name + '-' + value}>
        <input
          type="checkbox"
          id={name + '-' + value}
          name={name}
          value={value}
          onChange={changeHandler}
          checked={isChecked}
        />
        {label}
      </label>
    </div>
  )
}
