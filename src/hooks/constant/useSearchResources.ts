'use client'

import { getBrandResourceApi, getEquipmentTypeResourceApi } from '@/src/services/resourceApi'
import useMySWR from '../useMySWR'
import { Resource_Brand, Resource_EquipmentType } from '@/src/@types/constant.types'

export default function useSearchResources() {
  const { data: brandList }: { data: Resource_Brand[] } = useMySWR(
    'brand-constant',
    getBrandResourceApi,
    undefined,
    undefined
  )
  const { data: equipTypeList }: { data: Resource_EquipmentType[] } = useMySWR(
    'equip-type-constant',
    getEquipmentTypeResourceApi,
    undefined,
    undefined
  )

  return { brandList, equipTypeList }
}
