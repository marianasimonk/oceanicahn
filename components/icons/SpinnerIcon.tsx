
import React from 'react';

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="animate-spin"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.75V6.25m0 11.5v1.5M19.243 19.243l-1.06-1.06M6.818 6.818l-1.06-1.06m12.425 0l-1.06 1.06M6.818 17.182l-1.06 1.06M4.75 12H6.25m11.5 0h1.5"
    />
  </svg>
);
