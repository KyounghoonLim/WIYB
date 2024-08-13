'use client'

import React, { SyntheticEvent, useCallback } from 'react'
import RecentIcon from '@/public/icons/icon_recent.svg'
import CloseIcon from '@/public/icons/icon_close.svg'
import { ListItemProps } from '@/src/@types/components/list/list.interface'

export default function ListItem_SearchHistory({
  item,
  index,
  goToSearch,
  removeSearchHistory,
}: ListItemProps<string>) {
  const itemClickHandler = useCallback(
    (e: SyntheticEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') return
      else goToSearch(item)
    },
    [item, goToSearch]
  )

  const removeClickHandler = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()
      removeSearchHistory(item)
    },
    [item, removeSearchHistory]
  )

  return (
    <div className="list-item gap-2" onClick={itemClickHandler}>
      <RecentIcon />
      <p className="typograph-14">{item}</p>
      <button
        type="button"
        className="h-full aspect-auto ml-auto flex-row-center"
        onClick={removeClickHandler}
      >
        <CloseIcon id={`remove-${item}`} className="fill-@-neutral-400 z-[2]" />
      </button>
    </div>
  )
}
