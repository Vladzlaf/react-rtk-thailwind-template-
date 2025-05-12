import { SVGProps } from 'react'
import clsx from 'clsx'

const CrossIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={clsx('h-7 w-7', className)}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m20 20-6-6m0 0L8 8m6 6 6-6m-6 6-6 6"
    />
  </svg>
)

export default CrossIcon
