import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

interface EmailFormProps {
  onSubmit: (email: string) => void
  isSubmitting: boolean
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
})

export const EmailForm = ({ onSubmit, isSubmitting }: EmailFormProps) => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.email)
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 w-full max-w-[361px]"
    >
      <h2 className="text-xl font-semibold text-white text-center">
        Continue with Email
      </h2>

      <div className="w-full">
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Type Email"
          className="w-full p-3 bg-tetriary border-0 rounded-full text-base h-[60px]"
        />
      </div>

      <Button
        type="submit"
        variant="outline"
        size="lg"
        disabled={isSubmitting || !formik.isValid}
      >
        {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </form>
  )
}
