import { AxiosInstance } from 'axios'
import { apiClient } from './api-client'

export abstract class AbstractApi {
  protected readonly http: AxiosInstance

  protected constructor(protected readonly baseUrl: string = '') {
    this.http = apiClient
  }
}
