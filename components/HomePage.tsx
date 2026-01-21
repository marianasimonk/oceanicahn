
import React, { useState } from 'react';
import { Hero } from './Hero';
import { WaveIcon } from './icons/WaveIcon';
import type { Page } from '../types';

interface HomePageProps {
  setPage: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <>
      <Hero />
      <section className="py-20 px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 text-slate-300 items-start bg-slate-900 bg-opacity-50 p-8 rounded-lg shadow-xl backdrop-blur-sm border border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Our Mission</h3>
              <p>To leverage technology to make ocean education accessible to everyone, fostering a global community of informed and passionate ocean advocates.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Our Vision</h3>
              <p>A world where every person understands the critical role our oceans play and is empowered to contribute to their preservation and restoration.</p>
            </div>
          </div>
          
          {/* AI Call to Action */}
          <div className="text-center bg-slate-800/80 backdrop-blur-md p-10 rounded-2xl border border-slate-700 mb-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h3 className="text-3xl font-bold text-cyan-300 mb-4 relative z-10">Explore with Intelligence</h3>
            <p className="max-w-3xl mx-auto text-lg text-slate-300 mb-8 relative z-10">
              Curious about the deep? Our AI assistant Oceanica is trained on vast marine datasets to answer your toughest questions.
            </p>
            <button
              onClick={() => setPage('explore')}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/40 relative z-10"
            >
              Ask Oceanica AI
            </button>
          </div>

          {/* Interactive Map Section - Heat Stress Monitor */}
          <div className="mb-24">
            <div className="text-center mb-10">
              <h3 className="text-4xl font-bold text-cyan-300 mb-4">Ocean Heat & Bleaching Risk</h3>
              <p className="max-w-3xl mx-auto text-slate-400">
                Heat is the #1 killer of coral reefs. This live map shows **Sea Surface Temperature (SST)**. 
                Areas in <span className="text-red-400 font-bold">deep red or purple (&gt;30&deg;C)</span> represent reefs currently "affected" by heat stress and at high risk of bleaching.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-1 sm:p-2 shadow-2xl border border-slate-800 overflow-hidden relative">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-cyan-500/5 blur-3xl rounded-full"></div>
               
              {/* Loading State Overlay */}
              {!mapLoaded && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 rounded-2xl">
                  <WaveIcon className="w-16 h-16 text-cyan-500 animate-pulse mb-4" />
                  <div className="space-y-2 text-center">
                    <p className="text-cyan-400 font-bold tracking-widest uppercase text-xs">Calibrating Sensors</p>
                    <p className="text-slate-500 text-sm">Loading Sea Surface Temperature data...</p>
                  </div>
                </div>
              )}

              <div className="relative aspect-[16/9] w-full min-h-[400px] md:min-h-[550px] rounded-2xl overflow-hidden shadow-inner bg-slate-800">
                {/* 
                   Windy.com Embed - Sea Surface Temperature (SST)
                   This is the most reliable proxy for "Affected/Risk" areas when direct bleaching layers fail.
                */}
                <iframe
                  title="Global Sea Surface Temperature"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://embed.windy.com/embed2.html?lat=0.0&lon=160.0&zoom=3&level=surface&overlay=sst&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=kt&metricTemp=%C2%B0C&radarRange=-1"
                  onLoad={() => setMapLoaded(true)}
                  className={`transition-opacity duration-1000 ${mapLoaded ? 'opacity-100' : 'opacity-0'} relative z-10`}
                  allowFullScreen
                ></iframe>
                
                {/* Hint overlay */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden md:block">
                   <div className="bg-slate-950/60 backdrop-blur-sm border border-slate-800 text-slate-400 text-[10px] uppercase tracking-tighter px-3 py-1 rounded-md">
                     Dark Red/Purple = High Bleaching Risk
                   </div>
                </div>
              </div>

              {/* Legend/Footer Area */}
              <div className="p-6 bg-slate-900 border-t border-slate-800 rounded-b-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                       <WaveIcon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-bold text-sm">Real-time Thermal Monitor</h4>
                      <p className="text-slate-500 text-xs">Dataset: ECMWF Sea Surface Temperature (SST)</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <a 
                      href="https://coralreefwatch.noaa.gov/product/5km/index.php" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all"
                    >
                      <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400">Official NOAA Charts</span>
                      <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.windy.com/-Sea-surface-temperature-sst?sst" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-cyan-600/10 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-500/20 rounded-xl transition-all"
                    >
                      <span className="text-xs font-bold">Open Fullscreen</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6M13.5 6L18 1.5M18 1.5h-4.5M18 1.5v4.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts Section */}
          <div className="pb-10">
               <h3 className="text-3xl font-bold text-cyan-300 text-center mb-10">Beyond the Horizon</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="group bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/5">
                      <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span className="text-cyan-400 font-bold">94%</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Aquatic Life</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">The oceans are home to 94% of all life on Earth, yet we have explored less than 10% of this vast domain.</p>
                  </div>
                  <div className="group bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/5">
                      <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span className="text-indigo-400 font-bold">50%</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Oxygen Supply</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">Every second breath you take comes from the ocean. Phytoplankton generate half of the planet's oxygen.</p>
                  </div>
                  <div className="group bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/5">
                      <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span className="text-blue-400 font-bold">0.1%</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Vital Nurseries</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">Coral reefs occupy less than 0.1% of the ocean floor but support 25% of all marine species.</p>
                  </div>
               </div>
          </div>
        </div>
      </section>
    </>
  );
};
