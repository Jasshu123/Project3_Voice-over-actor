import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <div className="absolute -top-4 left-6 bg-amber-500 rounded-full p-2 text-white">
        <Quote size={20} />
      </div>
      
      <div className="pt-4">
        <p className="text-slate-700 italic mb-6">"{testimonial.text}"</p>
        
        <div className="flex items-center">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
            <p className="text-slate-600 text-sm">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;