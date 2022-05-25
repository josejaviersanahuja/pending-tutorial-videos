import * as React from "react"
import { SVGProps } from "react"

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg height={28} width={28} viewBox="1 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.50}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(3 2)"
    >
      <circle cx={8.5} cy={8.5} r={8} />
      <path d="m5.5 9.5 3 3 3-3M8.5 12.5v-8" />
    </g>
  </svg>
)

export default ArrowDown
