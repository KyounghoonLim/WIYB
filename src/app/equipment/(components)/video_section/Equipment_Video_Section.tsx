'use client'

import { useContext } from 'react'
import Equipment_VideoList from './Equipment_VideoList'
import { equipmentContext } from 'providers/equipment/EquipmentProvider'

export default function Equipment_Video_Section() {
  const { equipment } = useContext(equipmentContext)
  return (
    <>
      {equipment?.youtubeResults?.length ? (
        <section className="w-[880px] h-auto flex-row-center">
          <article className="w-full h-full flex flex-col justify-evenly gap-3">
            <span className="h-14 typograph-16 flex-row-start">
              관련&nbsp;
              <h2 className="font-bold inline-block">유튜브 동영상</h2>
            </span>
            <Equipment_VideoList />
          </article>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}
