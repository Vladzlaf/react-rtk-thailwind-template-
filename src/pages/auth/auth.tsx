import { useState } from 'react'
import { EmailForm } from '@/features/auth/email-form'
import { AuthTermPolicy } from '@/widgets/auth-term-policy'
import { OtpForm } from '@/features/auth/otp-form'
import { useRequestOtp, useVerifyOtp } from '@/entities/auth/api/auth.hooks'
import { SocialButtons } from '@/features/auth/social-buttons'

export const Auth = () => {
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [email, setEmail] = useState('')

  const { mutate: requestOtp, isPending: isRequestPending } = useRequestOtp()

  const { mutate: verifyOtp, isPending: isVerifyPending } = useVerifyOtp()

  const handleSubmitEmail = async (email: string) => {
    requestOtp({ email })
    setEmail(email)
    setShowOtpForm(true)
  }

  const handleSubmitOtp = async (otp: string) => {
    verifyOtp({ email, code: otp })
  }

  return (
    <div>
      <div className="w-1/2 flex items-center justify-center"></div>

      <div className="w-1/2 h-full flex flex-col gap-20 items-center justify-center text-white p-8">
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="text-white text-2xl font-bold leading-4.5">
            Hire Cafe
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 w-full">
          {showOtpForm ? (
            <OtpForm
              onGoBack={() => setShowOtpForm(false)}
              onSubmit={handleSubmitOtp}
              isSubmitting={isVerifyPending}
              onResend={() => requestOtp({ email })}
              isResending={isRequestPending}
            />
          ) : (
            <>
              <EmailForm
                onSubmit={handleSubmitEmail}
                isSubmitting={isRequestPending}
              />
              <div className="flex flex-col items-center justify-center gap-6">
                <span className="relative px-3 text-white-secondary text-sm">
                  or continue with
                </span>
                <SocialButtons />
              </div>
              <AuthTermPolicy />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
