import { SVGProps } from "react"

const ForkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={21} width={21} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m14.5 3.5 3 3-3 3" />
      <path d="M17.5 6.5h-5l-4 5.086M14.5 12.5l3 3-3 3" />
      <path d="M17.5 15.5h-5l-4-4h-6" />
    </g>
  </svg>
)

export default ForkIcon
