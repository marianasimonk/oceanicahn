import React from 'react';

export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a5.56 5.56 0 01-1.04-.225l-1.04-.225a5.56 5.56 0 00-1.04.225l-1.04.225a5.56 5.56 0 01-1.04-.225l-1.04-.225a5.56 5.56 0 00-1.04.225l-1.04.225a5.56 5.56 0 01-1.04-.225l-3.722-.537A2.25 2.25 0 012.25 15v-4.286c0-.97.616-1.813 1.5-2.097v5.538a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-5.538a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-5.538z" />
  </svg>
);