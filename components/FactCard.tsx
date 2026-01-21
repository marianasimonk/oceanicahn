
import React from 'react';

interface FactCardProps {
  topic: string;
  fact: string;
}

export const FactCard: React.FC<FactCardProps> = ({ topic, fact }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-slate-700 hover:border-cyan-500">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{topic}</h3>
      <p className="text-slate-300 flex-grow">{fact}</p>
    </div>
  );
};
