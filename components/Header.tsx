
import React from 'react';
import { WaveIcon } from './icons/WaveIcon';
import type { Page } from '../types';

interface HeaderProps {
  setPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <header className="bg-slate-900 bg-opacity-50 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <WaveIcon className="h-8 w-8 text-cyan-400" />
            <span className="ml-3 text-2xl font-bold text-white">Oceanica</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a onClick={() => setPage('explore')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Learn with AI</a>
              <a onClick={() => setPage('facts')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Facts</a>
              <a onClick={() => setPage('projects')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Projects</a>
              <a onClick={() => setPage('community')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Community</a>
              <a onClick={() => setPage('donate')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Donate</a>
              <a onClick={() => setPage('about')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">About</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
