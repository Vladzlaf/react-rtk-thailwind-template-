import { SVGProps } from 'react'

const FilterIcon = ({
  width = 16,
  height = 16,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M21 4.5h-6m-10 0H1m20 11h-4m-10 0H1m11.5-11a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm4 11a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
    />
  </svg>
)

export default FilterIcon
