
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import LoginSection from '@/components/LoginSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <LoginSection />
      <Footer />
    </div>
  );
};

export default Index;
