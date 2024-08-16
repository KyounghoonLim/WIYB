import { User } from '../../user.interface'

export { UserCardProps }

interface UserCardProps {
  user: User
  isLoading?: boolean
}
