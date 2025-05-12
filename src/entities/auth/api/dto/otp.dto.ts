export interface RequestOtpDto {
  email: string
}

export interface VerifyOtpDto {
  email: string
  code: string
}
