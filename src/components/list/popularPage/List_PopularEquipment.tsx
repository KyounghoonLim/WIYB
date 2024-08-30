'use client'

import { Equipment } from 'types/equipment.types'
import List_Primary from '../List_Primary'
import ListItem_SearchResult_Equipment from '../listItems/ListItem_SearchResult_Equipment'
import Island from 'components/island/Island'

export default function List_PopularEquipment({ equipments }: { equipments: Equipment[] }) {
  return (
    <Island className="w-full p-4">
      <List_Primary
        items={equipments}
        Component={({ item, index }) =>
          ListItem_SearchResult_Equipment({ item, index, listing: true })
        }
      />
    </Island>
  )
}
