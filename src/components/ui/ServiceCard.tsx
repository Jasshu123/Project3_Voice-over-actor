import React from 'react';
import { Check } from 'lucide-react';
import Button from './Button';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
      service.popular ? 'border-2 border-amber-500 relative' : ''
    }`}>
      {service.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-[30%] translate-y-[10%]">
            POPULAR
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
        <p className="text-slate-600 mb-4">{service.description}</p>
        <div className="text-2xl font-bold text-amber-500 mb-6">{service.price}</div>
        
        <div className="space-y-3 mb-6">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="text-amber-500 mt-0.5 mr-2 flex-shrink-0" size={18} />
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          variant={service.popular ? 'primary' : 'outline'} 
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;