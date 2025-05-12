import { SVGProps } from 'react'

const BackIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    className={` ${className || ''}`}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.3}
      strokeWidth={2}
      d="M8 15 1 8l7-7"
    />
  </svg>
)

export default BackIcon
