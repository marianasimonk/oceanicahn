
import React from 'react';
import type { Project } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardClasses = project.isPinned
    ? 'border-cyan-500 ring-2 ring-cyan-500/50'
    : 'border-slate-700 hover:border-cyan-500';

  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border ${cardClasses} relative`}>
      {project.isPinned && (
        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Featured Project
        </div>
      )}
      <h3 className="text-xl font-bold text-cyan-400 mb-1">{project.title}</h3>
      <p className="text-sm text-slate-400 mb-3">{project.location}</p>
      <p className="text-slate-300 flex-grow mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-cyan-300 font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Learn More
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </a>
    </div>
  );
};