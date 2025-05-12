import { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useCurrentCoach,
  useRequestEmailOtp,
  useVerifyEmailOtp,
} from '@/entities/user/user.hooks'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  code: Yup.string().length(6, 'Must be exactly 6 digits'),
})

export const GeneralSettings = () => {
  const [isOtpRequested, setIsOtpRequested] = useState(false)
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])
  const { data: currentCoach } = useCurrentCoach()

  const requestOtp = useRequestEmailOtp()
  const verifyOtp = useVerifyEmailOtp()

  const formik = useFormik({
    initialValues: {
      email: currentCoach?.email || '',
      code: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isOtpRequested) {
        await requestOtp.mutateAsync(values.email)
        setIsOtpRequested(true)
      } else {
        await verifyOtp.mutateAsync({
          email: values.email,
          code: values.code,
        })
        setIsOtpRequested(false)
        formik.resetForm()
      }
    },
  })

  const handleOtpChange = (index: number, value: string) => {
    const newCode = formik.values.code.split('')
    newCode[index] = value
    formik.setFieldValue('code', newCode.join(''))

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    formik.setFieldValue('code', pastedData)
    pastedData.split('').forEach((char, i) => {
      if (otpInputsRef.current[i]) {
        otpInputsRef.current[i]!.value = char
      }
    })
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <h3 className="text-base font-medium">General Settings</h3>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-row gap-3">
          {!isOtpRequested ? (
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="h-[60px] w-[150%] rounded-full border-0 bg-tetriary text-sm md:text-base"
            />
          ) : (
            <div className="flex gap-2 w-[150%]">
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    otpInputsRef.current[index] = el
                  }}
                  value={formik.values.code[index] || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    handleOtpChange(index, value)
                  }}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="h-[60px] text-center rounded-full border-0 bg-tetriary text-sm md:text-base"
                />
              ))}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            variant="outline"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? 'Processing...'
              : isOtpRequested
                ? 'Verify OTP'
                : 'Edit E-mail'}
          </Button>
        </div>

        {formik.errors.email && !isOtpRequested && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        {formik.errors.code && isOtpRequested && (
          <div className="text-red-500">{formik.errors.code}</div>
        )}
      </form>
    </div>
  )
}
