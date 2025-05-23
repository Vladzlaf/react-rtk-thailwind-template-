import { SVGProps } from 'react'
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#1877F2"
        d="M24.5 12c0-6.627-5.373-12-12-12S.5 5.373.5 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.578V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H16.33c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C20.112 22.954 24.5 17.99 24.5 12Z"
      />
      <path
        fill="#fff"
        d="M17.171 15.469 17.703 12h-3.328V9.75c0-.95.465-1.875 1.956-1.875h1.513V4.922s-1.373-.234-2.687-.234c-2.74 0-4.532 1.66-4.532 4.668V12H7.578v3.469h3.047v8.385a12.1 12.1 0 0 0 3.75 0V15.47h2.796Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
)
export default FacebookIcon
