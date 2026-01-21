
import React from 'react';

const timelineData = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Tomas becomes a certified scuba diver and witnesses firsthand the damage to marine ecosystems.',
  },
  {
    year: '2023',
    title: 'Advanced Training',
    description: 'Tomas earns advanced scuba diving and rescue diver certifications, deepening his commitment to ocean conservation.',
  },
  {
    year: '2024',
    title: 'Oceanica Founded',
    description: 'Oceanica is launched as a platform to combine education, entrepreneurship, and storytelling for ocean conservation.',
  },
  {
    year: '2025',
    title: 'Community Launch',
    description: 'The Oceanica community was launched, allowing people from around the world to connect, learn, and collaborate on ocean conservation.',
  },
];


export const About: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">About the Founder</h2>
        </div>
        
        {/* Text Section - Image removed and layout adjusted to be centered */}
        <div className="max-w-4xl mx-auto text-slate-300 text-lg space-y-4 mb-20 text-justify">
            <p>
              Tomas Simón's journey into ocean conservation began in 2022 when he became a certified scuba diver. During his early underwater explorations, he witnessed firsthand the devastating damage to marine ecosystems—bleached corals, plastic pollution, and declining marine life. This experience ignited a passion that would change his life's direction.
            </p>
            <p>
              In 2023, Tomas pursued advanced scuba diving certification and became a rescue diver, deepening his connection to the underwater world. Through these advanced training experiences, he developed a clear vision: to combine education, entrepreneurship, storytelling, and community empowerment to protect our oceans and raise funds for conservation efforts.
            </p>
            <p>
              That vision led to the creation of Oceanica in 2024, a platform designed to raise awareness, promote conservation, and inspire change. His children's book, "Finn and the Secret Coral Kingdom," was published in 2025 as a key part of that mission—using storytelling to spark curiosity, compassion, and action in the next generation of ocean defenders.
            </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-cyan-300">Our Journey</h3>
          </div>
          <div className="relative border-l-2 border-cyan-700 ml-3">
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 ring-4 ring-cyan-500 ring-opacity-50"></div>
                  <time className="text-sm font-semibold tracking-wide uppercase text-cyan-400">{item.year}</time>
                  <h4 className="mt-1 text-xl font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
