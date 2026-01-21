import React from 'react';
import { projects } from '../data/projects';
import { DonationCard } from './DonationCard';
import { HeartIcon } from './icons/HeartIcon';

export const DonatePage: React.FC = () => {
  const featuredProjects = projects.filter(p => p.isPinned);
  const otherProjects = projects.filter(p => !p.isPinned).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3">
            <HeartIcon className="w-10 h-10 text-cyan-300" />
            <h2 className="text-4xl font-bold text-cyan-300">Support Ocean Conservation</h2>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-slate-300 mt-4">
            Your contribution can make a wave of difference. Find a project you're passionate about and support their mission directly by visiting their website.
          </p>
        </div>

        {/* Featured Initiatives */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center border-b-2 border-cyan-800 pb-3">Featured Initiatives</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                 <DonationCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className={featuredProjects.length > 0 ? "mt-16" : ""}>
           {featuredProjects.length > 0 && otherProjects.length > 0 && (
            <h3 className="text-3xl font-bold text-cyan-400 mb-8 text-center">All Projects</h3>
           )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map(project => (
              <DonationCard key={project.title} project={project} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};