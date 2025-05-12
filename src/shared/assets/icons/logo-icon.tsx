import { SVGProps } from 'react'

const LogoIcon = ({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.855 11.86s-.311 1.455-6.742 7.276c-6.036 5.486 2.697 9.663 3.734 10.143.063.03.125.03.208 0 1.41-.61 17.114-7.698 2.8-17.42Z"
    />
    <path
      fill="currentColor"
      d="M16.947 8.473c0-3.375-1.732-6.456-3.465-8.217-.578-.44-1.54-.294-1.733.293-.77 2.202-3.08 6.897-8.663 12.473-7.124 7.044-.578 14.674 6.16 16.142 3.658.733-.962-1.468-1.54-6.017-.577-5.723 9.241-9.978 9.241-14.674Z"
    />
  </svg>
)

export default LogoIcon
