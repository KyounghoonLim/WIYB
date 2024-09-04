import { Union } from 'types/union.types'

export { TOKEN_ROLE }

const TOKEN_ROLE = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type TokenRoleType = Union<typeof TOKEN_ROLE>
