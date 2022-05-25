import * as React from "react"
import { SVGProps } from "react"

const VideosIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={24} width={24} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 4.5h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM6.5 4.5v12M14.5 4.5v12M14.5 7.5h3M14.5 13.5h3M3.5 7.5h3M3.5 10.5h14M3.5 13.5h3" />
    </g>
  </svg>
)

export default VideosIcon
