import * as React from "react"
import { SVGProps } from "react"

const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={48} width={48} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 5.5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.497a1.999 1.999 0 0 0-2-1.999l-5 .002-2-2h-4a1 1 0 0 0-1 1zM8.5 11.5h4M10.5 13.556V9.5" />
    </g>
  </svg>
)

export default AddIcon
