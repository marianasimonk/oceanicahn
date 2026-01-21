
import React, { useState, useEffect } from 'react';
import { generateOceanImage } from '../services/geminiService';
import { WaveIcon } from './icons/WaveIcon';

const prompts = [
  "A vibrant coral reef teeming with colorful tropical fish and sea turtles, sun rays filtering through the turquoise water. Photorealistic, wide-angle shot.",
  "A majestic humpback whale breaching at sunset, with dramatic splashes against a fiery orange sky. Cinematic and awe-inspiring.",
  "A serene underwater scene of a kelp forest, with sunlight dancing through the long, flowing leaves and curious sea otters playing. Ethereal and peaceful.",
  "A mysterious deep-sea landscape with bioluminescent jellyfish and strange creatures gathered around a hydrothermal vent. Dark, moody, and fascinating.",
  "A playful pod of dolphins leaping through crystal-clear blue waves on a bright, sunny day. Joyful and energetic.",
  "A massive, gentle whale shark gliding gracefully through the open ocean, followed by a school of remora fish. Breathtaking scale.",
  "A beautiful sea turtle swimming over a colorful reef. Photorealistic.",
  "An underwater fantasy scene of a lost, glowing city covered in coral and seaweed, with schools of shimmering fish exploring the ruins."
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1437622648795-39d738d456d3?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1580741569354-08eedd4c61f5?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1920&q=80"
];

const getRandomFallback = () => fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

export const Hero: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>(fallbackImages[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        const generatedImageUrl = await generateOceanImage(randomPrompt);
        const img = new Image();
        img.src = generatedImageUrl;
        img.onload = () => {
          setImageUrl(generatedImageUrl);
          setIsLoading(false);
        };
        img.onerror = () => {
            console.error("Generated image failed to load.");
            setImageUrl(getRandomFallback());
            setIsLoading(false);
        }
      } catch (error) {
        console.warn("Failed to generate hero image, using fallback:", error);
        setImageUrl(getRandomFallback());
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="relative h-[65vh] flex items-center justify-center text-center px-4 overflow-hidden bg-slate-950">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageUrl}
          alt="A beautiful ocean scene"
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isLoading ? 'opacity-30 blur-xl scale-110' : 'opacity-100 blur-0 scale-100'}`}
          key={imageUrl}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-slate-950/40 via-cyan-950/20 to-slate-900 transition-opacity duration-1000 ${isLoading ? 'opacity-80' : 'opacity-60'}`}></div>
      </div>
      
      {/* Immersive Loading Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Animated "Bubbles" for loading */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white/10 rounded-full animate-bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-20px`,
                  width: `${Math.random() * 15 + 5}px`,
                  height: `${Math.random() * 15 + 5}px`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.5
                }}
              />
            ))}
          </div>

          <div className="text-center text-white relative z-10">
              <div className="relative inline-block">
                <WaveIcon className="w-20 h-20 text-cyan-400 animate-pulse mx-auto filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
              </div>
              <p className="mt-8 text-xl font-light tracking-[0.3em] uppercase text-cyan-200 animate-pulse">
                Surfacing Digital Waters
              </p>
              <div className="mt-2 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
          </div>
      </div>

      {/* Main Content Layer */}
      <div className={`relative z-10 max-w-5xl px-4 transition-all duration-1000 transform ${isLoading ? 'opacity-0 translate-y-10 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight mb-6 filter drop-shadow-2xl">
          Dive into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Digital Deep</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
          Oceanica is your portal to the mysteries of the blue planet. Explore, learn, and be inspired by the world beneath the waves.
        </p>
        
        <div className="mt-10 flex justify-center gap-4">
           <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
           <div className="h-1 w-4 bg-cyan-700 rounded-full"></div>
           <div className="h-1 w-4 bg-cyan-900 rounded-full"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
        .animate-bubble {
          animation-name: bubble;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in;
        }
      `}} />
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
    </section>
  );
};
