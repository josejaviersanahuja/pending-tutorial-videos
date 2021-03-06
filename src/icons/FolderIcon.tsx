import * as React from "react"
import { SVGProps } from "react"

const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={21} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 5.5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.497a1.999 1.999 0 0 0-1.85-1.994l-.15-.005-5 .002-2-2h-4a1 1 0 0 0-1 1zM3.5 6.5h7" />
    </g>
  </svg>
)

export default FolderIcon
