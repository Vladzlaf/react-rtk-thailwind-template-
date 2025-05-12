import { SVGProps } from 'react'
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={2}
      d="m13 13 6 6M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Z"
    />
  </svg>
)
export default SearchIcon
