import React, { ReactElement } from 'react'

export default function HomeIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      height={28}
      viewBox="0 0 21 21"
      width={28}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 10.5l9-9 9 9" />
        <path d="M3.5 8.5v8a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-8" />
      </g>
    </svg>
  )
}