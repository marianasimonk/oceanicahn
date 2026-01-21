
import React from 'react';
import type { Project } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

export const DonationCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border border-slate-700 hover:border-cyan-500">
      <h3 className="text-xl font-bold text-cyan-400 mb-1">{project.title}</h3>
      <p className="text-sm text-slate-400 mb-3">{project.location}</p>
      <p className="text-slate-300 flex-grow mb-4 text-sm">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-400/50"
      >
        Visit & Donate
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </a>
    </div>
  );
};
