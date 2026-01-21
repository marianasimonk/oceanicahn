
import React from 'react';

// A high-quality Coral Reef image from Unsplash
const coralReefImage = "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1920&q=80";

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[65vh] flex items-center justify-center text-center px-4 overflow-hidden bg-slate-950">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={coralReefImage}
          alt="A vibrant coral reef teeming with life"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950/90"></div>
      </div>
      
      {/* Main Content Layer */}
      <div className="relative z-10 max-w-5xl px-4 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight mb-6 filter drop-shadow-2xl">
          Dive into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Digital Deep</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
          Oceanica is your portal to the mysteries of the blue planet. Explore, learn, and be inspired by the world beneath the waves.
        </p>
        
        <div className="mt-10 flex justify-center gap-4">
           <div className="h-1 w-20 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
           <div className="h-1 w-4 bg-cyan-700 rounded-full"></div>
           <div className="h-1 w-4 bg-cyan-900 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
    </section>
  );
};
