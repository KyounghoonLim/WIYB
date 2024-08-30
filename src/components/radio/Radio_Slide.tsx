'use client'

import { RadioProps } from 'types/components/radio/radio.types'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'

export default function RadioSlide<T = string>({
  options,
  value,
  name,
  onChange,
  id,
  className,
}: RadioProps<T>) {
  const eachWidth = useMemo(() => {
    return `calc(100% / ${options?.length})`
  }, [options])

  const indicatorPos = useMemo(() => {
    const idx = options.findIndex((option) => option.value === value)
    return 100 * idx + '%'
  }, [options, value])

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  const changeHandler = useCallback(
    (value) => {
      onChange && onChange(value)
    },
    [onChange]
  )

  return (
    <article id={id} className={clsx('radio-slide', className)}>
      {options.map(({ label, value }, idx) => {
        const optionId = label + '-' + idx
        return (
          <label
            key={optionId}
            htmlFor={optionId}
            style={{ width: eachWidth }}
            className="radio-item"
            title={label}
          >
            {label}
            <input
              id={optionId}
              type="radio"
              value={value as string}
              name={name}
              onChange={() => changeHandler(value)}
              className="hidden"
            />
          </label>
        )
      })}
      <span
        id={id + '-' + 'indicator'}
        style={{ width: eachWidth, transform: `translateX(${indicatorPos})` }}
        className="radio-indicator"
      >
        {selectedOption.label}
      </span>
    </article>
  )
}
