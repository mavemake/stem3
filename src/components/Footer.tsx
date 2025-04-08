
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Brand */}
          <div className="text-center">
            <h3 className="text-2xl font-miniver mb-4">
              STEM<span className="text-orange">3</span>
            </h3>
            <p className="mb-6 text-gray-300">
              Empowering the next generation of scientists, technologists, engineers, and mathematicians.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} STEM 3 Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
