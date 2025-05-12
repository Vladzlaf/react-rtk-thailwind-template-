import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coachApi } from './user.api'
import {
  Coach,
  CoachListResponse,
  UpdateCoachPayload,
  VerifyEmailOtpPayload,
} from './interfaces/user'

export const useCurrentCoach = () => {
  return useQuery<Coach>({
    queryKey: ['coach', 'current'],
    queryFn: () => coachApi.getCurrentCoach(),
  })
}

export const useAllCoaches = () => {
  return useQuery<CoachListResponse>({
    queryKey: ['coach', 'all'],
    queryFn: () => coachApi.getAllCoaches(),
  })
}

export const useUpdateCoach = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateCoachPayload): Promise<Coach> => {
      return await coachApi.updateCoach(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach', 'current'] })
    },
    onError: (error: Error) => {
      console.error('Update failed:', error.message)
    },
  })
}

export const useRequestEmailOtp = () => {
  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      await coachApi.requestEmailUpdateOtp(email)
    },
  })
}

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: async (payload: VerifyEmailOtpPayload): Promise<void> => {
      await coachApi.verifyEmailUpdateOtp(payload)
    },
  })
}
