
import React from 'react';
import { WaveIcon } from './icons/WaveIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        <div className="flex justify-center items-center mb-4">
          <WaveIcon className="h-6 w-6 text-cyan-500" />
          <span className="ml-2 text-lg font-semibold text-slate-200">Oceanica</span>
        </div>
        <p>Exploring the world's oceans with the power of AI.</p>
        <p className="mt-2 text-sm">&copy; 2024 Oceanica. All rights reserved.</p>
      </div>
    </footer>
  );
};
