import React from 'react';
import ServiceCard from '../ui/ServiceCard';
import SectionTitle from '../ui/SectionTitle';
import { services } from '../../data/services';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Voice Over Services"
          subtitle="Professional voice over services tailored to your specific needs with competitive pricing and quick turnaround."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;