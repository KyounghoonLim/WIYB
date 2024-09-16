'use client'

import clsx from 'clsx'
import { SyntheticEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SelectOption, SelectProps } from 'types/components/select/select.interface'
import ArrowIcon from 'icons/icon_arrow_bold.svg'
import { measureTextWidth } from 'utils/canvasUtils'

export default function Select_Primary({
  options,
  value,
  placeholder,
  onChange,
  className,
  width,
  disabled,
}: SelectProps) {
  const selectContainer = useRef<HTMLDivElement>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const maximumLabelWidth = useMemo(() => {
    if (width) return width
    else {
      const longestLabel = options.reduce((prev, { label }) => {
        return prev?.length > label?.length ? prev : label
      }, '')
      return measureTextWidth(longestLabel, '14px Inter')
    }
  }, [options, width])

  const containerClickHandler = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()

      if (disabled) return
      else {
        setIsOpen((temp) => !temp)
        setIsShow(true)
      }
    },
    [disabled]
  )

  const optionClickHandler = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()

      if (disabled) return
      else {
        const value = (e.target as HTMLElement).dataset.value
        onChange?.(value)
        setIsOpen(false)
      }
    },
    [onChange, disabled]
  )

  const isSelected = useCallback(
    (option: SelectOption) => {
      return value === option.value
    },
    [value]
  )

  useLayoutEffect(() => {
    if (!isOpen) return
    else {
      const closeSelect = (e: MouseEvent) => {
        if (selectContainer.current.contains(e.target as HTMLElement)) return
        else setIsOpen(false)
      }
      document.addEventListener('mousedown', closeSelect)
      return () => {
        document.removeEventListener('mousedown', closeSelect)
      }
    }
  }, [isOpen])

  return (
    <article
      ref={selectContainer}
      className={clsx('select-container', className)}
      onClick={containerClickHandler}
      data-open={isOpen}
      data-show={isShow}
      data-disabled={disabled}
    >
      <div className="select-default-option" style={{ minWidth: maximumLabelWidth }}>
        {options.find((option) => value === option.value)?.label || placeholder}
      </div>
      <div className="select-options-rail" style={{ height: options?.length * 40 }}>
        <div className="select-options-container">
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx('select-option', isSelected(option) && 'selected', option.className)}
              onClick={optionClickHandler}
              data-value={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <ArrowIcon className="select-arrow" data-disabled={disabled} />
    </article>
  )
}
