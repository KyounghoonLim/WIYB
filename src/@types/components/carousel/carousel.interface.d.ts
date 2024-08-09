import { SwiperProps } from 'swiper/react'

export { CarouselProps }

interface CarouselProps<T = any> {
  name: string
  items: T[]
  renderFunction: React.FC
  onClick?: (item: T) => any
  className?: string
  itemKey?: string
  swiperProps?: SwiperProps
}
