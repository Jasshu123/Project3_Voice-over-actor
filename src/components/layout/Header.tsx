import React, { useState, useEffect } from 'react';
import { Menu, X, Mic } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900 shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white mr-2 bg-amber-500 p-2 rounded-full">
            <Mic size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">VoiceArtistry</h1>
            <p className="text-amber-400 text-xs">Professional Voice Over Services</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink label="Home" onClick={() => scrollToSection('home')} />
          <NavLink label="About" onClick={() => scrollToSection('about')} />
          <NavLink label="Portfolio" onClick={() => scrollToSection('portfolio')} />
          <NavLink label="Services" onClick={() => scrollToSection('services')} />
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 absolute top-full left-0 w-full shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink label="Home" onClick={() => scrollToSection('home')} />
            <MobileNavLink label="About" onClick={() => scrollToSection('about')} />
            <MobileNavLink label="Portfolio" onClick={() => scrollToSection('portfolio')} />
            <MobileNavLink label="Services" onClick={() => scrollToSection('services')} />
            <MobileNavLink label="Contact" onClick={() => scrollToSection('contact')} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  label: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, onClick }) => {
  return (
    <button 
      className="text-white hover:text-amber-400 transition-colors font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ label, onClick }) => {
  return (
    <button 
      className="text-white hover:text-amber-400 transition-colors font-medium text-lg py-2 border-b border-slate-800 w-full text-left"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Header;