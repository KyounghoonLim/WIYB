'use client'

import clsx from 'clsx'
import { SVGProps, useCallback, useState } from 'react'
import ArrowIcon from 'i/icon_arrow.svg'

export default function useDropdown(initialState?: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const changeDropdown = useCallback(() => setIsOpen((temp) => !temp), [])

  const DropDown = useCallback(
    ({ children }) => {
      return (
        <div
          id="dropdown-container"
          className={clsx(
            'w-full overflow-hidden transition-all duration-200',
            isOpen ? 'h-auto' : 'h-0'
          )}
        >
          {children}
        </div>
      )
    },
    [isOpen]
  )

  const DropDownArrow = useCallback(
    (props?: SVGProps<SVGElement>) => {
      return (
        <ArrowIcon
          className={clsx(
            'stroke-@-text-label',
            isOpen ? 'animate-spin-arrow' : 'animate-spin-arrow-reverse'
          )}
          {...props}
        />
      )
    },
    [isOpen]
  )

  return { isOpen, changeDropdown, DropDown, DropDownArrow }
}
// 'use client'

// import { DROPDOWN_DIRECTION, DropdownDirectionType } from '@/src/constants/dropdown.constant'
// import clsx from 'clsx'
// import { useCallback, useMemo, useState } from 'react'

// export default function useDropdown(
//   direction: DropdownDirectionType = DROPDOWN_DIRECTION.TOP_TO_BOTTOM,
//   initialState?: boolean
// ) {
//   const [isOpen, setIsOpen] = useState<boolean>(initialState)

//   const dropdownAnimation = useMemo(() => {
//     switch (direction) {
//       case DROPDOWN_DIRECTION.TOP_TO_BOTTOM: {
//         return isOpen ? 'animate-dropdown-in-ttb' : 'animate-dropdown-out-ttb'
//       }
//       case DROPDOWN_DIRECTION.LEFT_TO_RIGHT: {
//         return isOpen ? 'animate-dropdown-in-ltr' : 'animate-dropdown-out-ltr'
//       }
//       case DROPDOWN_DIRECTION.RIGHT_TO_LEFT: {
//         return isOpen ? 'animate-dropdown-in-rtl' : 'animate-dropdown-out-rtl'
//       }
//       case DROPDOWN_DIRECTION.BOTTOM_TO_TOP: {
//         return isOpen ? 'animate-dropdown-in-btt' : 'animate-dropdown-out-btt'
//       }
//     }
//   }, [direction, isOpen])

//   const changeDropdown = useCallback(() => setIsOpen((temp) => !temp), [])

//   const DropDown = useCallback(
//     ({ children }) => {
//       return (
//         <div id="dropdown-container" className={clsx('w-full overflow-hidden', dropdownAnimation)}>
//           {children}
//         </div>
//       )
//     },
//     [isOpen, dropdownAnimation]
//   )

//   return { isOpen, changeDropdown, DropDown }
// }
