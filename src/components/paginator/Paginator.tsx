'use client'

import { SyntheticEvent, useCallback, useMemo } from 'react'
import { PaginatorProps } from 'types/components/paginator/paginator.interface'
import ArrowPrev from 'icons/icon_arrow_prev.svg'
import ArrowNext from 'icons/icon_arrow_next.svg'

export default function Paginator({ children, page, totalPage, onChange }: PaginatorProps) {
  const range = useMemo(() => {
    return Array.from(new Array(10), (_, i) => 10 * Math.floor((page - 1) / 10) + i + 1).filter(
      (v) => v <= totalPage
    )
  }, [page, totalPage])

  const clickHandler = useCallback(
    (e: SyntheticEvent) => onChange?.(Number((e.target as HTMLElement).dataset.value)),
    [onChange]
  )

  const jumpPrevPage = useCallback(
    () => onChange?.(Math.max(10 * Math.floor((page - 9) / 10) + 1, 1)),
    [page, onChange]
  )
  const jumpNextPage = useCallback(
    () => onChange?.(Math.min(10 * Math.floor((page + 9) / 10) + 1, totalPage)),
    [page, totalPage, onChange]
  )

  return (
    <div className="paginator">
      {children}
      <div className="paginator-indicator">
        <ArrowPrev
          className="paginator-indicator-arrow"
          data-direction="prev"
          onClick={jumpPrevPage}
        />
        {range.map((num) => (
          <div
            key={num}
            className="paginator-indicator-item"
            data-value={num}
            data-selected={page === num}
            onClick={clickHandler}
          >
            {num}
          </div>
        ))}
        <ArrowNext
          className="paginator-indicator-arrow"
          data-direction="next"
          onClick={jumpNextPage}
        />
      </div>
    </div>
  )
}
