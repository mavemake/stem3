
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const SocialLink = ({ href, icon: Icon, className }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center bg-dark text-white transition-all duration-300 hover:bg-orange hover:scale-110",
      className
    )}
  >
    <Icon size={18} />
  </a>
);

const AboutSection = () => {
  return (
    <section id="about" className="section bg-light">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">About Us</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Circular Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-orange shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Students working on STEM project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl mb-4">Our Story</h3>
            <p className="mb-6 text-gray-700">
              This page is dedicated to storing memories. Together, we can keep our lovely moments alive.
            </p>
            <p className="mb-6 text-gray-700">
              Our faculty brings decades of experience from industry and academia, creating a unique learning environment
              that blends theoretical knowledge with practical applications. Each student is guided to discover their 
              potential and develop the skills needed for success in the rapidly evolving technological landscape.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <SocialLink 
                href="https://facebook.com" 
                icon={Facebook} 
                className="" 
              />
              <SocialLink 
                href="https://instagram.com" 
                icon={Instagram} 
                className="" 
              />
              <SocialLink 
                href="https://twitter.com" 
                icon={Twitter} 
                className="" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
