import { SERVICE_PATH } from 'constants/path.constant'
import { EquipmentEvaluationMetricAverage } from 'types/equipment.types'
import { Review } from 'types/review.types'
import myAxios from 'utils/axios/myAxios'

export { getEquipmentReviewsApi, postEquipmentReviewApi, likeReviewApi }

function getEquipmentReviewsApi(equipmentId: string): Promise<Review[]> {
  return myAxios.get(SERVICE_PATH.REVIEW.replace('[equipmentId]', equipmentId))
}

function postEquipmentReviewApi(
  equipmentId: string,
  evaluationMetric: EquipmentEvaluationMetricAverage,
  content: string,
  imageUrls: string[]
): Promise<void> {
  return myAxios.post(SERVICE_PATH.REVIEW.replace('[equipmentId]', equipmentId), {
    evaluationMetric,
    imageUrls,
    content,
  })
}

function likeReviewApi(equipmentId: string, reviewId: string, isLiked?: boolean): Promise<void> {
  const method = isLiked ? 'delete' : 'post'
  return myAxios({
    method,
    url: SERVICE_PATH.LIKE_REVIEW.replace('[equipmentId]', equipmentId).replace(
      '[reviewId]',
      reviewId
    ),
  })
}
