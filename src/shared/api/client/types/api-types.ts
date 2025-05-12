/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiBaseResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errorCode?: string
}
