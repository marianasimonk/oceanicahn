
import React from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { RegionAccordion } from './RegionAccordion';
import { projects } from '../data/projects';

interface GroupedProjects {
  [key: string]: Project[];
}

export const ProjectsPage: React.FC = () => {
  const featuredProjects = projects.filter(p => p.isPinned);
  const otherProjects = projects.filter(p => !p.isPinned);

  const groupedProjects = otherProjects.reduce((acc, project) => {
    const { region } = project;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(project);
    return acc;
  }, {} as GroupedProjects);

  const sortedRegions = Object.keys(groupedProjects).sort();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">Global Conservation Projects</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Discover real-world initiatives making a difference for our oceans. These projects represent the front line in the fight to protect marine ecosystems.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center border-b-2 border-cyan-800 pb-3">Featured Initiatives</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                 <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects by Region */}
        <div className="mt-16 bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
          {sortedRegions.map(region => (
            <RegionAccordion key={region} region={region} projects={groupedProjects[region]} />
          ))}
        </div>
      </div>
    </section>
  );
};
