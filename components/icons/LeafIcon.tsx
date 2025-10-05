
import React from 'react';

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 4 13V7a3 3 0 0 1 3-3h1" />
    <path d="M11 20v-1a2 2 0 0 1 2-2h4a5 5 0 0 0 5-5V7a3 3 0 0 0-3-3h-1" />
  </svg>
);
