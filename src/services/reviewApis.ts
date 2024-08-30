import { SERVICE_PATH } from 'constants/path.constant'
import { ReviewSortType } from 'constants/review.constant'
import { EquipmentEvaluationMetricAverage } from 'types/equipment.types'
import { Review, ReviewResult } from 'types/review.types'
import myAxios from 'utils/axios/myAxios'

export { getEquipmentReviewsApi, postEquipmentReviewApi, likeReviewApi }

function getEquipmentReviewsApi(
  equipmentId: string,
  contextId?: string,
  offset?: number,
  size?: number,
  sort?: ReviewSortType
): Promise<ReviewResult> {
  return myAxios.get(SERVICE_PATH.REVIEW.replace('[equipmentId]', equipmentId), {
    params: {
      contextId,
      offset,
      size,
      sort,
    },
  })
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
