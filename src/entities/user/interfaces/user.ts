export interface Coach {
  id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
  hashedRt: string
  role: 'COACH'
  location: string
  workoutPreferences: string[]
}

export type CoachListResponse = Array<Coach>

export interface UpdateCoachPayload {
  fullName?: string
  location?: string
  workoutPreferences?: string[]
}

export interface VerifyEmailOtpPayload {
  email: string
  code: string
}
