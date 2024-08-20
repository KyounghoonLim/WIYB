import { Union } from 'types/union.types'

export { REVIEW_SCORE }

const REVIEW_SCORE = ['1', '2', '3', '4', '5'] as const

export type ReviewScoreType = Union<typeof REVIEW_SCORE>
