import React from 'react';

// A simple regex to find URLs.
const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

interface LinkifiedTextProps {
  text: string;
  pClassName?: string;
  aClassName?: string;
}

export const LinkifiedText: React.FC<LinkifiedTextProps> = ({ 
  text, 
  pClassName = "",
  aClassName = "text-cyan-400 hover:underline break-all"
}) => {
  if (!text) return null;
  
  const parts = text.split(urlRegex);

  return (
    <p className={pClassName}>
      {parts.map((part, index) => {
        if (part && part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={aClassName}
              // Prevent clicks on links from bubbling up to parent elements
              onClick={(e) => e.stopPropagation()} 
            >
              {part}
            </a>
          );
        }
        // Return text part, ensuring not to render 'undefined' if part is empty
        return part || null;
      })}
    </p>
  );
};