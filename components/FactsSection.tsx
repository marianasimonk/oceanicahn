
import React, { useState, useEffect } from 'react';
import { getOceanFacts } from '../services/geminiService';
import type { ConservationFact } from '../types';
import { FactCard } from './FactCard';
import { WaveIcon } from './icons/WaveIcon';

export const FactsSection: React.FC = () => {
  const [facts, setFacts] = useState<ConservationFact[]>([]);
  const [isLoadingFacts, setIsLoadingFacts] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        setIsLoadingFacts(true);
        setError(null);
        const fetchedFacts = await getOceanFacts();
        setFacts(fetchedFacts);
      } catch (err) {
        setError('Failed to fetch ocean facts. The ocean depths remain mysterious for now.');
        console.error(err);
      } finally {
        setIsLoadingFacts(false);
      }
    };
    
    fetchFacts();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">Conservation Currents</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Learn about the critical issues facing our oceans and how we can help protect them.
          </p>
        </div>
        {isLoadingFacts ? (
          <div className="flex justify-center items-center h-48">
            <WaveIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900 bg-opacity-30 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facts.map((fact, index) => (
              <FactCard key={index} fact={fact.fact} topic={fact.topic} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
