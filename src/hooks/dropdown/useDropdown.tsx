'use client'

import { SyntheticEvent, useCallback, useLayoutEffect, useRef, useState } from 'react'

export default function useDropdown(options: DropdownOption[]) {
  const ref = useRef<HTMLElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  /// 최초 랜더링 시 보여지는 지 ///
  const [isShow, setIsShow] = useState<boolean>(false)

  const clickHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen((v) => !v)
    setIsShow(true)
  }, [])

  /// set reference ///
  const dropdownRef = useCallback(
    (ele: HTMLElement) => {
      if (!ele) return
      else {
        ref.current = ele
        ele.classList.add('dropdown-container')
        ele.dataset.open = String(isOpen)
        ele.dataset.show = String(isShow)
        ele.removeEventListener('click', clickHandler)
        ele.addEventListener('click', clickHandler)
      }
    },
    [isOpen, isShow, clickHandler]
  )

  /// clean up ///
  useLayoutEffect(() => {
    return () => {
      ref.current?.classList.remove('dropdown-container')
      ref.current?.removeEventListener('click', clickHandler)
    }
  }, [clickHandler])

  useLayoutEffect(() => {
    if (!isOpen) return
    else {
      const closeSelect = (e: MouseEvent) => {
        if (ref.current.contains(e.target as HTMLElement)) return
        else setIsOpen(false)
      }
      document.addEventListener('mousedown', closeSelect)
      return () => {
        document.removeEventListener('mousedown', closeSelect)
      }
    }
  }, [isOpen])

  return {
    dropdownRef,
    Dropdown: () => Dropdown({ options, closeDropdown: () => setIsOpen(false) }),
  }
}

import clsx from 'clsx'
import { DropdownOption, DropdownProps } from 'types/components/dropdown/dropdown.interface'

function Dropdown({ options, closeDropdown }: DropdownProps) {
  const optionClickHandler = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()
      closeDropdown()
      const option = options[(e.target as HTMLElement).dataset.index]
      option?.onClick?.()
    },
    [options, closeDropdown]
  )

  return (
    <div className="dropdown-options-rail" style={{ height: options?.length * 40 }}>
      <div className="dropdown-options-container">
        {options.map((option, idx) => (
          <div
            key={idx}
            className={clsx('dropdown-option', option.className)}
            onMouseUp={optionClickHandler}
            data-index={idx}
          >
            {option.element || option.label}
          </div>
        ))}
      </div>
    </div>
  )
}
