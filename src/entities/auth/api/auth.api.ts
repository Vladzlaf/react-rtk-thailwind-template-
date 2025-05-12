/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractApi } from '@/shared/api/client/abstract.api'
import { RequestOtpDto } from './dto/otp.dto'
import { ApiBaseResponse } from '@/shared/api/client/types/api-types'
import {
  AuthResponse,
  OtpVerificationPayload,
} from './interfaces/auth.interface'

class AuthApi extends AbstractApi {
  constructor(baseUrl: string) {
    super(baseUrl)
  }

  public async requestOtp(dto: RequestOtpDto): Promise<ApiBaseResponse> {
    const { data: response } = await this.http.post<ApiBaseResponse>(
      this.baseUrl.concat('/request-otp'),
      dto,
    )
    return response
  }

  public async verifyOtp(dto: OtpVerificationPayload): Promise<AuthResponse> {
    const { data: response } = await this.http.post<AuthResponse>(
      this.baseUrl.concat('/admin/verify-otp'),
      dto,
    )
    return response
  }

  public async authenticateWithFirebase(
    idToken: string,
  ): Promise<AuthResponse> {
    const { data: response } = await this.http.post<AuthResponse>(
      this.baseUrl.concat('/admin/firebase'),
      { idToken },
    )
    return response
  }

  public async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<any> {
    const { data: response } = await this.http.post<any>(
      this.baseUrl.concat('/admin/refresh-token'),
      { refreshToken, userId },
    )
    return response
  }

  public async logout(): Promise<ApiBaseResponse> {
    const { data: response } = await this.http.post<ApiBaseResponse>(
      this.baseUrl.concat('/logout'),
    )
    return response
  }
}

export const authApi = new AuthApi('/auth')
