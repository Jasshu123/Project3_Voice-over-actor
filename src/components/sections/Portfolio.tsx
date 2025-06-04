import React, { useState } from 'react';
import AudioPlayer from '../ui/AudioPlayer';
import SectionTitle from '../ui/SectionTitle';
import { voiceSamples } from '../../data/portfolio';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(voiceSamples.map(sample => sample.category))];
  
  const filteredSamples = activeCategory === 'all'
    ? voiceSamples
    : voiceSamples.filter(sample => sample.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Voice Samples"
          subtitle="Listen to my professional voice over work across different categories and styles."
          centered
        />
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSamples.map((sample) => (
            <div key={sample.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <AudioPlayer
                  title={sample.title}
                  audioUrl={sample.audioUrl}
                  duration={sample.duration}
                />
                <div className="text-slate-600 text-sm mt-2">
                  {sample.description}
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs font-medium">
                    {sample.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;