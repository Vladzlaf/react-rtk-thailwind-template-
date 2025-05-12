import { useMutation } from '@tanstack/react-query'

import { authApi } from './auth.api'
import { RequestOtpDto } from './dto/otp.dto'
import type {
  AuthResponse,
  OtpVerificationPayload,
} from './interfaces/auth.interface'
import { useAuth } from '@/app/providers/auth-provider'
import { useNavigate } from 'react-router-dom'

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: async (dto: RequestOtpDto) => {
      const response = await authApi.requestOtp(dto)
      if (!response.success) {
        throw new Error(response.message)
      }
      return response
    },
    onError: (error: Error) => {
      console.log(error.message || 'Failed to send OTP')
    },
  })
}

export const useVerifyOtp = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (dto: OtpVerificationPayload): Promise<AuthResponse> => {
      const response = await authApi.verifyOtp(dto)
      if (!response.accessToken) {
        throw new Error('Failed to verify OTP')
      }
      return response
    },

    onSuccess: async (response: AuthResponse) => {
      const appUser = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role,
      }

      setUser({
        user: appUser,
        tokens: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      })

      navigate('/explore')
    },
    onError: (error: Error) => {
      console.error('OTP error:', error.message)
    },
  })
}

export const useFirebaseAuth = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (idToken: string) => {
      const response = await authApi.authenticateWithFirebase(idToken)

      if (!response.accessToken || !response.user) {
        throw new Error('Invalid server response')
      }

      return response
    },
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      setUser({
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role,
        },
        tokens: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      })

      navigate('/explore')
    },
    onError: (error: Error) => {
      console.error('Firebase auth failed:', error.message)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  })
}

export const useLogout = () => {
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: async () => {
      await authApi.logout()
    },
    onSuccess: () => {
      setUser({ user: null, tokens: null })
    },
  })
}
