
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  title: string;
  href: string;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { 
    title: 'Directory', 
    href: '/directory',
    subItems: [
      { title: 'Students', href: '/directory/students' },
      { title: 'Faculty', href: '/directory/faculty' }
    ] 
  },
  { title: 'Events', href: '/events' },
  { title: 'Announcements', href: '/announcements' },
  { title: 'Budget', href: '/budget' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md py-2 border-b border-aces-purple/20' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 bg-aces-purple rounded-full flex items-center justify-center"
          >
            <span className="font-display font-bold text-white text-xl">A</span>
          </motion.div>
          <div className="font-display font-bold text-2xl">
            <span className="text-gradient">ACES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div 
              key={item.title} 
              className="relative"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.href}
                className="relative px-4 py-2 font-display text-white hover:text-aces-coral transition-colors duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  {item.title}
                  {item.subItems && <ChevronDown className="ml-1 h-4 w-4" />}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-aces-coral to-aces-purple group-hover:w-full transition-all duration-300" />
              </Link>
              
              {/* Dropdown */}
              {item.subItems && hoveredItem === item.title && (
                <div className="absolute top-full left-0 mt-1 w-48 card-custom animate-fade-in">
                  <div className="py-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-aces-purple/20 transition-colors duration-200"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Login Button */}
        <button className="hidden md:block aces-btn rounded-full">
          Login
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-aces-darkblue/90 backdrop-blur-lg border-t border-aces-purple/20"
          >
            <div className="container mx-auto py-4 px-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <Link
                    to={item.href}
                    className="block py-3 px-2 font-display text-white hover:text-aces-coral border-b border-aces-purple/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  
                  {item.subItems && (
                    <div className="pl-4 border-l border-aces-purple/20 ml-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="block py-2 px-2 text-sm text-white/70 hover:text-aces-coral"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="w-full mt-4 aces-btn rounded-full">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
