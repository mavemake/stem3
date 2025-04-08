
import React from 'react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-dark relative flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 20, 28, 0.85), rgba(59, 20, 28, 0.9)), url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')`,
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
