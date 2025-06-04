import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import SectionTitle from '../ui/SectionTitle';
import { testimonials } from '../../data/testimonials';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Client Testimonials"
          subtitle="Hear what clients have to say about working with me on their voice over projects."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;