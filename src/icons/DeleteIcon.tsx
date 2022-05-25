import * as React from "react"
import { SVGProps } from "react"

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={28} width={28} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2zM3.5 4.5h14M8.5 7.5v8M12.5 7.5v8" />
    </g>
  </svg>
)

export default DeleteIcon
