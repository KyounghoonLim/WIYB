import { DateFormatType } from './date.types'
import { GenderType } from './gender.types'

export { User }

interface User {
  id: string
  nickname: string
  gender: GenderType
  birth: DateFormatType | string
  createdAt: DateFormatType | string
  imageUrl?: string
  handy?: number
  height?: number
  weight?: number
}
