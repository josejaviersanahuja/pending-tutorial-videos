import * as React from "react"
import { SVGProps } from "react"

const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={28} width={28} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.5 7.5c5.185-.47 8.52 1.53 10 6-2.825-3.14-6.341-3.718-10-2v3l-5-5 5-5z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BackIcon
