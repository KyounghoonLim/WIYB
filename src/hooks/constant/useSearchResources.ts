'use client'

import { getBrandResourceApi, getEquipmentTypeResourceApi } from '@/src/services/resourceApi'
import { Resource_Brand, Resource_EquipmentType } from '@/src/@types/constant.types'
import useMyQuery from '../useMyQuery'

export default function useSearchResources() {
  const { data: brandList }: { data: Resource_Brand[] } = useMyQuery(
    ['brand-constant'],
    getBrandResourceApi,
    undefined,
    undefined,
    undefined
  )
  const { data: equipTypeList }: { data: Resource_EquipmentType[] } = useMyQuery(
    ['equip-type-constant'],
    getEquipmentTypeResourceApi,
    undefined,
    undefined,
    undefined
  )

  return { brandList, equipTypeList }
}
