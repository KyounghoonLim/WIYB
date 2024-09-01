import { EquipmentType } from 'constants/equipment.constant'
import { Equipment, EquipmentDetail } from 'types/equipment.types'
import { SERVICE_PATH } from 'constants/path.constant'
import myAxios from 'utils/axios/myAxios'
import { SearchRangeType } from 'constants/range.constant'
import { dummy_popularEquipments } from '@/@dummy'

export { getEquipmentDetailApi, getPopularEquipmentApi, bookmarkEquipmentApi }

function getEquipmentDetailApi(productId: string, productType: string): Promise<EquipmentDetail> {
  return myAxios.get(
    SERVICE_PATH.GET_EQUIPMENT.replace('[id]', productId).replace('[type]', productType)
  )
}

function getPopularEquipmentApi(
  type?: EquipmentType,
  range?: SearchRangeType
): Promise<Equipment[]> {
  const params = {}
  type && (params['type'] = type)
  range && (params['range'] = range)

  console.log(type, range, params)
  return myAxios.get(SERVICE_PATH.POPULAR_EQUIPMENTS, { params })
}

function bookmarkEquipmentApi(equipmentId: string, isBookmarked?: boolean): Promise<void> {
  const method = isBookmarked ? 'delete' : 'post'
  return myAxios({
    method,
    url: SERVICE_PATH.BOOKMARK_EQUIPMENT.replace('[id]', equipmentId),
  })
}
