import React from 'react';
import { Mic, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-white mr-2 bg-amber-500 p-2 rounded-full">
                <Mic size={20} />
              </div>
              <h3 className="text-xl font-bold">VoiceArtistry</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Professional voice over services for commercials, corporate videos, e-learning, and more. 
              Bringing your words to life with clarity and emotion.
            </p>
            <div className="flex space-x-3">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2">Services</h3>
            <ul className="space-y-2">
              <FooterLink text="Commercial Voice Over" />
              <FooterLink text="Corporate Narration" />
              <FooterLink text="Character Voice Acting" />
              <FooterLink text="Audiobook Narration" />
              <FooterLink text="E-Learning Content" />
              <FooterLink text="IVR & Phone Systems" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2">Resources</h3>
            <ul className="space-y-2">
              <FooterLink text="Voice Demo Reel" />
              <FooterLink text="Equipment & Studio" />
              <FooterLink text="Testimonials" />
              <FooterLink text="FAQ" />
              <FooterLink text="Blog" />
              <FooterLink text="Terms of Service" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-slate-400">hello@voiceartistry.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-slate-400">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Los Angeles, CA<br/>United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} VoiceArtistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ text }) => {
  return (
    <li>
      <a href="#\" className="text-slate-400 hover:text-amber-400 transition-colors">
        {text}
      </a>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a href="#\" className="bg-slate-800 hover:bg-amber-500 transition-colors p-2 rounded-full">
      {icon}
    </a>
  );
};

export default Footer;