import * as React from "react"
import { SVGProps } from "react"

const SaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={21} width={21} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 4.5h7l3 3v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
      <path d="M8.5 12.5h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1zM7.5 7.5h2v2h-2z" />
    </g>
  </svg>
)

export default SaveIcon
