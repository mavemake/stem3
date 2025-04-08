import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    text: 'The STEM 3 program completely transformed my career path! The hands-on robotics projects gave me skills that helped me secure an internship at a leading tech company.',
  },
  {
    id: 2,
    name: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    text: 'The faculty at STEM 3 are incredible mentors who truly care about student success. The environmental science program gave me practical skills that I use daily in my research work.',
  },
  {
    id: 3,
    name: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
    text: 'The advanced mathematics program challenged me intellectually and prepared me for university-level coursework. I\'m now pursuing my PhD in computational mathematics thanks to STEM 3\'s foundation.',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section bg-light">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">What Our Students Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full">
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-orange">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6">"{testimonial.text}"</p>
                      <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 w-10 h-10 bg-dark bg-opacity-80 rounded-full text-white flex items-center justify-center focus:outline-none hover:bg-orange transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 w-10 h-10 bg-dark bg-opacity-80 rounded-full text-white flex items-center justify-center focus:outline-none hover:bg-orange transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }
                }}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  currentIndex === index ? 'bg-orange w-6' : 'bg-dark bg-opacity-20'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
