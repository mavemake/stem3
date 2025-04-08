
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Empty testimonials array to start with
const initialTestimonials = [];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    text: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const nextSlide = () => {
    if (!isAnimating && testimonials.length > 0) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (!isAnimating && testimonials.length > 0) {
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
    let interval;
    if (testimonials.length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testimonials.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewTestimonial(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (newTestimonial.name.trim() && newTestimonial.text.trim() && newTestimonial.image) {
      const newEntry = {
        id: Date.now(),
        name: newTestimonial.name,
        text: newTestimonial.text,
        image: newTestimonial.image,
      };
      
      setTestimonials(prev => [...prev, newEntry]);
      setNewTestimonial({ name: '', text: '', image: null });
      setPreviewImage(null);
    }
  };

  return (
    <section id="testimonials" className="section bg-light">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-8">What Our Students Say</h2>
        
        {/* Add Testimonial Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-16">
          <h3 className="text-2xl mb-4">Share Your Experience</h3>
          <form onSubmit={handleAddTestimonial}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 mb-2">
                Your Experience
              </label>
              <textarea
                id="text"
                name="text"
                value={newTestimonial.text}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange"
                required
              ></textarea>
            </div>
            
            {/* Image Upload Field */}
            <div className="mb-6">
              <label htmlFor="image" className="block text-gray-700 mb-2">
                Your Photo (Required)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>
                {previewImage && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-orange text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none"
            >
              Add Testimonial
            </button>
          </form>
        </div>
        
        {testimonials.length > 0 ? (
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
                        {testimonial.image && (
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-orange shadow-md">
                            <img 
                              src={testimonial.image} 
                              alt={`${testimonial.name}'s photo`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="text-gray-700 text-lg italic mb-6">"{testimonial.text}"</p>
                        <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p>No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
