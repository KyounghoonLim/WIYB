import { Equipment, EquipmentDetail, EquipmentEvaluationMetric } from '../@types/equipment.types'
import { Review } from '../@types/review.types'
import { SERVICE_PATH } from '../constants/path.constant'
import myAxios from '../utils/axios/myAxios'

export {
  getEquipmentDetailApi,
  getEquipmentReviewsApi,
  setEquipmentReviewApi,
  getPopularEquipmentApi,
}

function getEquipmentDetailApi(productId: string, productType: string): Promise<EquipmentDetail> {
  return myAxios.get(
    SERVICE_PATH.EQUIPMENT_DETAIL.replace('[id]', productId).replace('[type]', productType)
  )
}

function getEquipmentReviewsApi(productId: string): Promise<Review[]> {
  return myAxios.get(SERVICE_PATH.EQUIPMENT_REVIEW.replace('[id]', productId))
}

function setEquipmentReviewApi(
  productId: string,
  content: string,
  imageUrls: string[],
  evaluationMetric: EquipmentEvaluationMetric
): Promise<void> {
  return myAxios.post(SERVICE_PATH.EQUIPMENT_REVIEW.replace('[id]', productId), {
    content,
    imageUrls,
    evaluationMetric,
  })
}

function getPopularEquipmentApi(): Promise<Equipment> {
  return myAxios.get(SERVICE_PATH.POPULAR_EQUIPMENTS)
}
