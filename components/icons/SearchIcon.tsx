
import React from 'react';

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 10.5L19.5 10.5M4.5 10.5L12 3M4.5 10.5L12 18"
      transform="rotate(90 12 12) translate(0 2)"
    />
  </svg>
);
