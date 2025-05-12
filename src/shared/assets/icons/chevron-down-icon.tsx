import { SVGProps } from 'react'

const ChevronDownIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className || ''}`}
    {...props}
  >
    <path
      d="M21 12L14 19L7 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChevronDownIcon
