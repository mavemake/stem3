
import React from 'react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-dark relative flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 20, 28, 0.75), rgba(59, 20, 28, 0.8)), url('/lovable-uploads/8e366d26-27a9-4c23-bbfe-374c5e5a5880.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl text-white mb-4">
            Explore the World of 
            <span className="text-orange"> STEM 3</span>
          </h1>
          
          <p className="text-light text-lg md:text-xl mb-8">
            Action Speaks Louder Than Voice!
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#about" className="btn btn-secondary hover-scale">
              About Us
            </a>
            <a href="#contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark hover:border-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
