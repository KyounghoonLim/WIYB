'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { User } from '../@types/user.interface'

export const userContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User>>
}>(null)

export default function UserProvider({ children }) {
  const [user, setUser] = useState<User>(null)
  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
}
