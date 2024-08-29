import { Union } from 'types/union.types'

export { evaluationMetricLabels }

const evaluationMetricLabels = ['비거리', '난이도', '디자인', '정확도', '가격', '관용성'] as const

export const EQUIPMENT_TYPE = {
  DRIVER: 'DRIVER',
  WOOD: 'WOOD',
  HYBRID: 'HYBRID',
  IRON: 'IRON',
  WEDGE: 'WEDGE',
  PUTTER: 'PUTTER',
  SHAFT: 'SHAFT',
  GRIP: 'GRIP',
  BALL: 'BALL',
} as const

export type EquipmentType = Union<typeof EQUIPMENT_TYPE>
