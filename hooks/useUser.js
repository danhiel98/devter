import { onAuthStateChanged } from 'firebase_config/client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])

  return user
}
