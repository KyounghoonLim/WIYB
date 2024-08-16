import React, { useMemo } from 'react'
import Grid from '../Grid'
import { equipmentLabels, equipmentLabelsKo } from '@/src/constants/equipment.constant'
import EquipGridItem from './EquipGridItem'

export default function EquipGrid({ items }: { items: { label; image; brandImage; name }[] }) {
  const equipTemplate = useMemo(() => {
    return equipmentLabels.map((label, index) => {
      const item = items.find((item) => item.label === label)
      return {
        label: equipmentLabelsKo[index],
        image: item.image,
        brandImage: item.brandImage,
        name: item.name,
      }
    })
  }, [items])

  return <Grid items={equipTemplate} row={2} col={3} renderFunc={EquipGridItem} />
}
