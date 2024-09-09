import { EquipmentType } from 'constants/equipment.constant'
import { Equipment, EquipmentDetail, EvaluationMetricKeyType } from 'types/equipment.types'
import { SERVICE_PATH } from 'constants/path.constant'
import myAxios from 'utils/axios/myAxios'
import { SearchRangeType } from 'constants/range.constant'

export {
  getEquipmentDetailApi,
  getPopularEquipment_Top5_Api,
  getPopularEquipment_Top100_Api,
  getPopularEquipment_Metric_Api,
  bookmarkEquipmentApi,
}

function getEquipmentDetailApi(productId: string, productType: string): Promise<EquipmentDetail> {
  return myAxios.get(
    SERVICE_PATH.GET_EQUIPMENT.replace('[id]', productId).replace('[type]', productType)
  )
}

function getPopularEquipment_Top5_Api(
  type?: EquipmentType,
  range?: SearchRangeType
): Promise<Equipment[]> {
  const params = {}
  type && (params['type'] = type)
  range && (params['range'] = range)

  return myAxios.get(SERVICE_PATH.POPULAR_EQUIPMENTS_TOP5, { params })
}

function getPopularEquipment_Top100_Api(): Promise<Equipment[]> {
  return myAxios.get(SERVICE_PATH.POPULAR_EQUIPMENTS_TOP100)
}

function getPopularEquipment_Metric_Api(
  type?: EquipmentType,
  metric?: EvaluationMetricKeyType
): Promise<Equipment[]> {
  const params = {}
  type && (params['type'] = type)
  metric && (params['metric'] = metric)

  return myAxios.get(SERVICE_PATH.POPULAR_EQUIPMENTS_METRIC, { params })
}

function bookmarkEquipmentApi(equipmentId: string, isBookmarked?: boolean): Promise<void> {
  const method = isBookmarked ? 'delete' : 'post'
  return myAxios({
    method,
    url: SERVICE_PATH.BOOKMARK_EQUIPMENT.replace('[id]', equipmentId),
  })
}
