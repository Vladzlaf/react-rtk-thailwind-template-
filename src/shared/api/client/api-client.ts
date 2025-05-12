import { authApi } from '@/entities/auth/api/auth.api'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token && !config.url?.endsWith('/auth/admin/refresh-token')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    originalRequest._retryCount = originalRequest._retryCount || 0

    if (error.response?.status === 401 && originalRequest._retryCount < 10) {
      originalRequest._retryCount += 1

      const refreshToken = localStorage.getItem('refreshToken')
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user.id

      if (!refreshToken) {
        clearAuthAndRedirect()
        return Promise.reject(error)
      }

      try {
        const response = await authApi.refreshToken(userId, refreshToken)
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        return apiClient(originalRequest)
      } catch (refreshError) {
        if (originalRequest._retryCount >= 10) {
          clearAuthAndRedirect()
        }
        return Promise.reject(refreshError)
      }
    } else if (
      error.response?.status === 401 &&
      originalRequest._retryCount >= 10
    ) {
      clearAuthAndRedirect()
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

const clearAuthAndRedirect = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  window.location.href = '/auth'
}
