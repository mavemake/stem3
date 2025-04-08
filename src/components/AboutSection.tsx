
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
          {/* Certificate Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-lg w-64 md:w-80 overflow-hidden border-4 border-orange shadow-xl">
              <img 
                src="/lovable-uploads/65581fe8-88ee-46d0-95f8-806abbf6a27e.png" 
                alt="STEM Strand Certificate"
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
