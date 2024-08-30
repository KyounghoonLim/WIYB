'use client'

import { popularContext } from 'providers/equipment/PopluarProvider'
import { useContext } from 'react'
import popularKeys from 'constants/json/popular.keys.constant.json'
import List_PopularEquipment from 'components/list/popularPage/List_PopularEquipment'
import { EQUIPMENT_TYPE } from 'constants/equipment.constant'
import LoadingSpinner from 'components/loading/LoadingSpinner'

export default function Popular_Equipment_Section() {
  const { type, popularEquipments } = useContext(popularContext)
  console.log(type, popularEquipments)
  return (
    <section className="w-[800px] flex justify-center items-start gap-3 p-8">
      {Boolean(popularEquipments) ? (
        <div>
          {!popularKeys[type] ? (
            <List_PopularEquipment equipments={popularEquipments['total']} />
          ) : (
            <>
              {Object.keys(popularEquipments).map((key) => (
                <List_PopularEquipment key={key} equipments={popularEquipments[key]} />
              ))}
            </>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  )
}
