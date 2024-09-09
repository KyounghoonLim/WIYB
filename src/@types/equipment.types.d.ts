import { Review } from './review.types'

export type Equipment = {
  id: string
  brand: string
  type: string
  name: string
  releasedYear: string
  viewCount: number
  reviewCount: number
  imageUrls: string[]
  averageScore?: number
  isBookmarked?: boolean
}

export type EquipmentDetail = Equipment & {
  evaluationMetricAverage: EquipmentEvaluationMetricAverage
  detail: {
    color: string
    /**
     * gram unit
     */
    weight: number
    headProduceType?: string
    headDesignType?: string
    headNumber?: number
    headShape?: string
    headDifficulty?: string
    headLoftDegree?: number
    /**
     * ml unit?
     */
    driverVolume?: number
    /**
     * deg unit
     */
    iron7LoftDegree?: number
    ironPLoftDegree?: number
    putterNeckShape?: string
    shaftStrength?: string
    shaftKickPoint?: string
    shaftTorque?: string
    shaftTexture?: string
    gripType?: string
    gripRound?: number
    ballPiece?: string
    ballCover?: string
    /**
     * loft spec table
     */
    loftSpec?: object[]
    [key: string]: any
  }
  reviews: Review[]
  youtubeResults: RelatedVideo[]
}

export type RelatedVideo = {
  title: string
  description: string
  channelId: string
  channelTitle: string
  thumbnailUrl: string
  videoUrl: string
  publishedAt: Date
  tags: unknown
}

export type EquipmentEvaluationMetricAverage = {
  [key: EvaluationMetricKeys]: number
}

export type EvaluationMetricKeys =
  | 'forgiveness'
  | 'distance'
  | 'accuracy'
  | 'impactFeel'
  | 'impactSound'
  | 'backspin'
  | 'distanceControl'
  | 'stiffness'
  | 'weight'
  | 'trajectory'
  | 'touce'
  | 'gripComfort'
  | 'durability'
