import React from 'react';
import { Mic, Award, Clock, Music } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="About Me"
          subtitle="Professional voice artist with over a decade of experience bringing scripts to life with authenticity and precision."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Voice Over Artist in Studio" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-amber-500 font-bold text-4xl">10+</span>
                  <span className="text-slate-700 font-medium">Years<br />Experience</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">I'm Alex Morgan</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              I'm a professional voice over artist with a versatile range and over a decade of experience in the industry. 
              Whether you need a warm, conversational tone for your corporate video, a professional narrator for your documentary, 
              or distinctive character voices for your animation project, I deliver high-quality audio that meets your specific needs.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              With my professional home studio, I provide quick turnaround times and consistent audio quality for clients worldwide. 
              My voice has been featured in commercials, e-learning modules, audiobooks, and corporate videos for brands like 
              TechVision, Elevate Games, and LearnSmart Education.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Mic />}
                title="Professional Studio"
                description="High-quality recording equipment for pristine audio"
              />
              <FeatureCard 
                icon={<Award />}
                title="Industry Experience"
                description="Worked with leading brands across multiple sectors"
              />
              <FeatureCard 
                icon={<Clock />}
                title="Fast Turnaround"
                description="Quick delivery without compromising on quality"
              />
              <FeatureCard 
                icon={<Music />}
                title="Versatile Range"
                description="From corporate to character voices and everything in between"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="text-amber-500 mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default About;