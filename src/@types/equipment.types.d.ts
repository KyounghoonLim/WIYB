import { Review } from "./review.types";

export type Equipment = {
  id: string;
  brand: string;
  type: string;
  name: string;
  releasedYear: string;
  viewCount: number;
  reviewCount: number;
  evaluatedCount: number;
  imageUrls: string[];
};

export type EquipmentDetail = Equipment & {
  evaluationMetricAverage: EquipmentEvaluationMetric;
  detail: {
    color: string;
    /**
     * gram unit
     */
    weight: number;
    headProduceType?: string;
    headDesignType?: string;
    headNumber?: number;
    headShape?: string;
    headDifficulty?: string;
    headLoftDegree?: number;
    /**
     * ml unit?
     */
    driverVolume?: number;
    /**
     * deg unit
     */
    iron7LoftDegree?: number;
    ironPLoftDegree?: number;
    putterNeckShape?: string;
    shaftStrength?: string;
    shaftKickPoint?: string;
    shaftTorque?: string;
    shaftTexture?: string;
    gripType?: string;
    gripRound?: number;
    ballPiece?: string;
    ballCover?: string;
    [key: string]: any;
  };
  reviews: Review[];
};

/**
 * min: 1, max: 5
 *
 * ex) [4, 3, 3, 1, 2, 5]
 *
 *비거리: idx 0
 *
 * 난이도: idx 1
 *
 * 디자인: idx 2
 *
 * 정확도: idx 3
 *
 * 가격: idx 4
 *
 * 관용성: idx 5
 */
export type EquipmentEvaluationMetric = number[];
