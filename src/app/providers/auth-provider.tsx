import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/shared/api/firebase/firebase'

type AppUser = {
  id: string
  email: string
  name: string
  role: string
}

type AuthContextType = {
  user: AppUser | null
  loading: boolean
  setUser: (userData: {
    user: AppUser | null
    tokens: { accessToken: string; refreshToken: string } | null
  }) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async () => {
      try {
        const storedUser = localStorage.getItem('user')
        const accessToken = localStorage.getItem('accessToken')
        if (storedUser && accessToken) {
          const parsedUser: AppUser = JSON.parse(storedUser)

          setUser(parsedUser)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth validation error:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    setUser: ({
      user,
      tokens,
    }: {
      user: AppUser | null
      tokens: { accessToken: string; refreshToken: string } | null
    }) => {
      console.log('Setting user:', user)
      if (user && tokens) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
      setUser(user)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
