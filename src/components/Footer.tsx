
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-miniver mb-4">
              STEM<span className="text-orange">3</span>
            </h3>
            <p className="mb-6 text-gray-300">
              Empowering the next generation of scientists, technologists, engineers, and mathematicians.
            </p>
            <div className="flex space-x-4">
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
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange flex-shrink-0 mt-1" />
                <span>123 Innovation Way, Technology Park, CA 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-orange flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-orange flex-shrink-0" />
                <span>info@stem3.edu</span>
              </li>
            </ul>
          </div>
          
          {/* Program Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Program Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
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
