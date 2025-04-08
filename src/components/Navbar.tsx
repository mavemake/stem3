
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      scrolled ? 'bg-dark bg-opacity-95 shadow-md py-2' : 'bg-dark py-4'
    )}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#home" className="text-2xl font-miniver text-white">
          STEM<span className="text-orange">3</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'testimonials', 'gallery', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white capitalize hover:text-orange transition-colors"
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden bg-dark absolute left-0 right-0 transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {['home', 'about', 'testimonials', 'gallery', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white capitalize py-2 hover:text-orange transition-colors"
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
