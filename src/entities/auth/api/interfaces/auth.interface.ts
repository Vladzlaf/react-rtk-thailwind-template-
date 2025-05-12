export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface OtpVerificationPayload {
  email: string
  code: string
}
