import { SVGProps } from 'react'

const ExploreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M9.556 18.111a8.556 8.556 0 1 1 0-17.11 8.556 8.556 0 0 1 0 17.11Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.667 15.667 23 23M9.556 18.111a8.556 8.556 0 1 1 0-17.11 8.556 8.556 0 0 1 0 17.11Z"
    />
  </svg>
)
export default ExploreIcon
