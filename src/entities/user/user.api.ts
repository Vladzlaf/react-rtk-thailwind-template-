import { AbstractApi } from '@/shared/api/client/abstract.api'
import {
  Coach,
  CoachListResponse,
  UpdateCoachPayload,
  VerifyEmailOtpPayload,
} from './interfaces/user'

class CoachApi extends AbstractApi {
  constructor(baseUrl: string) {
    super(baseUrl)
  }

  public async getCurrentCoach(): Promise<Coach> {
    const { data: response } = await this.http.get<Coach>(
      this.baseUrl.concat(''),
    )
    return response
  }

  public async getAllCoaches(): Promise<CoachListResponse> {
    const { data: response } = await this.http.get<CoachListResponse>(
      this.baseUrl.concat('/all'),
    )
    return response
  }

  public async updateCoach(payload: UpdateCoachPayload): Promise<Coach> {
    const { data: response } = await this.http.put<Coach>(
      this.baseUrl.concat('/update'),
      payload,
    )
    return response
  }

  public async requestEmailUpdateOtp(email: string): Promise<void> {
    await this.http.put(this.baseUrl.concat('/update/email'), { email })
  }

  public async verifyEmailUpdateOtp(
    payload: VerifyEmailOtpPayload,
  ): Promise<void> {
    await this.http.put(this.baseUrl.concat('/update/email/verify'), payload)
  }
}

export const coachApi = new CoachApi('/coach')
