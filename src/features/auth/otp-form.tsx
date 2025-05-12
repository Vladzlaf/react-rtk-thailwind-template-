import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import BackIcon from '@/shared/assets/icons/back-icon'

interface OtpFormProps {
  onGoBack: () => void
  onSubmit: (otp: string) => void
  isSubmitting: boolean
  onResend: () => void
  isResending: boolean
}

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be 6 digits'),
})

export const OtpForm = ({
  onGoBack,
  onSubmit,
  isSubmitting,
  onResend,
  isResending,
}: OtpFormProps) => {
  const [timeLeft, setTimeLeft] = useState(60)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleResendClick = () => {
    onResend()
    setTimeLeft(60)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.otp)
    },
  })

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = formik.values.otp.split('')
    newOtp[index] = value.replace(/\D/g, '')
    const updatedOtp = newOtp.join('').substring(0, 6)

    formik.setFieldValue('otp', updatedOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[361px] flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-white text-center">
        Verify your email
      </h2>

      <div className="flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={formik.values.otp[index] || ''}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl bg-tetriary border-0 rounded-lg "
            autoComplete="off"
          />
        ))}
      </div>

      {timeLeft > 0 ? (
        <p className="text-center text-accent-opacity-4 text-sm">
          Code sent. Resend in {formattedTime}
        </p>
      ) : (
        <Button
          type="button"
          onClick={handleResendClick}
          disabled={isResending}
          variant="ghost"
          className="h-8 text-center text-sm text-white-secondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? 'Sending...' : 'Resend code'}
        </Button>
      )}

      <Button
        type="submit"
        variant="outline"
        size="lg"
        disabled={isSubmitting || !formik.isValid}
        className="w-full"
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onGoBack}
        className="hover:bg-transparent hover:text-white-tertiary text-white-tertiary mt-20"
      >
        <BackIcon className="w-4 h-4" /> To previous page
      </Button>
    </form>
  )
}
