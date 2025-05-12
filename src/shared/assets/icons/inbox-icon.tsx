import { SVGProps } from 'react'
const InboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M19.5 0h-13C2.6 0 0 2.03 0 6.765v9.47C0 20.971 2.6 23 6.5 23h13c3.9 0 6.5-2.03 6.5-6.765v-9.47C26 2.029 23.4 0 19.5 0Zm.611 8.24-4.069 3.382c-.858.717-1.95 1.069-3.042 1.069-1.092 0-2.197-.352-3.042-1.07L5.889 8.24a1.07 1.07 0 0 1-.156-1.434c.338-.433.949-.514 1.365-.162l4.069 3.382c.988.826 2.665.826 3.653 0l4.069-3.382a.935.935 0 0 1 1.365.162 1.055 1.055 0 0 1-.143 1.434Z"
    />
  </svg>
)
export default InboxIcon
