
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-16 bg-gradient-to-b from-background to-aces-darkblue overflow-hidden">
      {/* Background elements */}
      <div className="blob-shape w-[600px] h-[600px] top-[-30%] left-[-10%] opacity-5 z-0" />
      <div className="blob-shape w-[500px] h-[500px] top-[20%] right-[-10%] opacity-5 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          {/* Logo and about */}
          <div className="md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-aces-purple rounded-full flex items-center justify-center">
                <span className="font-display font-bold text-white text-xl">A</span>
              </div>
              <div className="font-display font-bold text-2xl">
                <span className="text-gradient">ACES</span>
              </div>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-xs">
              ACES is the premier student organization dedicated to innovation, community, and academic excellence in engineering and computer science.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="#"
                className="w-9 h-9 rounded-full bg-aces-purple/20 flex items-center justify-center hover:bg-aces-purple transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#"
                className="w-9 h-9 rounded-full bg-aces-purple/20 flex items-center justify-center hover:bg-aces-purple transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#"
                className="w-9 h-9 rounded-full bg-aces-purple/20 flex items-center justify-center hover:bg-aces-purple transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#"
                className="w-9 h-9 rounded-full bg-aces-purple/20 flex items-center justify-center hover:bg-aces-purple transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#"
                className="w-9 h-9 rounded-full bg-aces-purple/20 flex items-center justify-center hover:bg-aces-purple transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-display font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Events', 'Resources', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-white/70 hover:text-aces-coral flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-display font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-aces-coral mt-0.5" />
                <span className="text-white/70">
                  123 University Avenue<br />College Town, ST 12345
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-aces-coral mt-0.5" />
                <span className="text-white/70">contact@aces.university.edu</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-aces-coral mt-0.5" />
                <span className="text-white/70">(123) 456-7890</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-1">
            <h3 className="text-lg font-display font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates and announcements.
            </p>
            
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 pr-12 bg-aces-darkblue/40 border border-aces-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-aces-purple/50 text-white placeholder:text-white/50"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-aces-purple text-white rounded-full hover:bg-aces-coral transition-colors duration-300"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-aces-purple/30 to-transparent mb-6"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ACES. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-white/50 text-sm hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/terms" className="text-white/50 text-sm hover:text-white">
              Terms of Service
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/sitemap" className="text-white/50 text-sm hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      
      {/* Accent line at bottom */}
      <div className="h-1 w-full bg-gradient-to-r from-aces-purple via-aces-coral to-aces-teal"></div>
    </footer>
  );
};

export default Footer;
