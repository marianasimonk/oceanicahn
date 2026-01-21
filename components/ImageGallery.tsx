
import React from 'react';

const images = [
  'ocean/1', 'coral/2', 'fish/3', 'whale/4',
  'turtle/5', 'jellyfish/6', 'deepsea/7', 'coast/8'
];

export const ImageGallery: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">Visual Voyage</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            A glimpse into the stunning beauty and diversity of marine ecosystems.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((seed, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
              <img
                src={`https://picsum.photos/seed/${seed}/500/500`}
                alt={`Ocean image ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
