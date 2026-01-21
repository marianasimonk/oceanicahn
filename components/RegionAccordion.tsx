import React, { useState } from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface RegionAccordionProps {
  region: string;
  projects: Project[];
}

export const RegionAccordion: React.FC<RegionAccordionProps> = ({ region, projects }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 px-4 text-left text-xl font-bold text-cyan-400 hover:bg-slate-800 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${region.replace(/\s+/g, '-')}`}
      >
        <span>{region} ({projects.length})</span>
        <ChevronDownIcon
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div 
          id={`accordion-content-${region.replace(/\s+/g, '-')}`}
          className="p-6 bg-slate-900 bg-opacity-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
