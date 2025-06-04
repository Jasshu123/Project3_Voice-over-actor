import React from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      window.scrollTo({
        top: portfolioSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background Audio Wave Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] bg-amber-500/20 w-full left-0"
            style={{ 
              top: `${20 + (i * 15)}%`,
              opacity: 0.5 - (i * 0.1),
              animation: `wave ${3 + (i * 0.5)}s infinite ease-in-out alternate`,
              animationDelay: `${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Voice, Your <span className="text-amber-500">Brand</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Professional voice over services that bring your words to life with clarity, emotion, and impact.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" onClick={scrollToContact}>
              Book a Session
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToPortfolio}>
              Listen to Samples
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center animate-bounce">
            <a href="#about" className="text-white opacity-70 hover:opacity-100 transition-opacity">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;