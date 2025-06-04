import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { industries, getIconComponent } from '../../data/industries';

const Industries: React.FC = () => {
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Industries Served"
          subtitle="Professional voice over services for a wide range of industries and applications."
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const IconComponent = getIconComponent(industry.icon);
            
            return (
              <div 
                key={industry.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-100 text-amber-600 p-4 rounded-full mb-4">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{industry.name}</h3>
                  <p className="text-slate-600">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;