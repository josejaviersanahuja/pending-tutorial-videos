import * as React from "react"
import { SVGProps } from "react"

const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg height={28} width={28} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx={8.5} cy={8.5} r={8} />
      <path d="m11.5 7.5-3-3-3 3M8.5 4.5v8" />
    </g>
  </svg>
)

export default ArrowUp
