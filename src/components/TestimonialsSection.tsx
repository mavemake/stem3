
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  getTestimonials, 
  addTestimonial, 
  uploadTestimonialImage,
  hasUserSubmittedTestimonial
} from '@/services/firebase';
import { getUserId } from '@/services/userManager';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  imageUrl: string;
}

const TestimonialsSection = () => {
  const { currentUser } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    text: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Check if user has already submitted a testimonial and load existing testimonials
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (currentUser) {
        try {
          const submitted = await hasUserSubmittedTestimonial(currentUser.uid);
          setHasSubmitted(submitted);
          
          // Pre-fill name if user has a nickname saved
          const storedProfile = localStorage.getItem(`profile_${currentUser.uid}`);
          if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            if (profile.nickname) {
              setNewTestimonial(prev => ({
                ...prev,
                name: profile.nickname
              }));
            }
          }
        } catch (error) {
          console.error("Error checking submission status:", error);
        }
      }
    };
    
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    checkSubmissionStatus();
    loadTestimonials();
  }, [currentUser, toast]);

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
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a testimonial",
        variant: "destructive"
      });
      return;
    }
    
    if (hasSubmitted) {
      toast({
        title: "Already Submitted",
        description: "You have already submitted a testimonial",
        variant: "destructive"
      });
      return;
    }
    
    if (newTestimonial.name.trim() && newTestimonial.text.trim() && selectedFile) {
      try {
        setIsLoading(true);
        const userId = currentUser.uid;
        
        // Upload image to Firebase Storage
        const imageUrl = await uploadTestimonialImage(selectedFile, userId);
        
        // Add testimonial to Firestore
        await addTestimonial(
          newTestimonial.name,
          newTestimonial.text,
          imageUrl,
          userId
        );
        
        // Update local state
        const newEntry = {
          id: Date.now().toString(),
          name: newTestimonial.name,
          text: newTestimonial.text,
          imageUrl: imageUrl,
        };
        
        setTestimonials(prev => [...prev, newEntry]);
        setNewTestimonial({ name: '', text: '' });
        setPreviewImage(null);
        setSelectedFile(null);
        setHasSubmitted(true);
        
        toast({
          title: "Success",
          description: "Your testimonial has been submitted!",
        });
      } catch (error) {
        console.error("Error adding testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to submit testimonial",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields including your photo",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="testimonials" className="section bg-light">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-8">What Our Students Say</h2>
        
        {/* Add Testimonial Form */}
        {!currentUser ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-16 text-center">
            <h3 className="text-2xl mb-4">Share Your Experience</h3>
            <p className="mb-6 text-gray-700">Please log in to share your testimonial.</p>
            <div className="flex justify-center">
              <button 
                className="bg-orange text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                onClick={() => {
                  const loginButton = document.querySelector('.fixed.bottom-8.right-8 button');
                  if (loginButton) (loginButton as HTMLElement).click();
                }}
              >
                <LogIn size={18} />
                <span>Log In</span>
              </button>
            </div>
          </div>
        ) : !hasSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-16">
            <h3 className="text-2xl mb-4">Share Your Experience</h3>
            <form onSubmit={handleAddTestimonial}>
              <div className="mb-4">
                <Label htmlFor="name" className="block text-gray-700 mb-2">
                  Your Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="text" className="block text-gray-700 mb-2">
                  Your Experience
                </Label>
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
                <Label htmlFor="image" className="block text-gray-700 mb-2">
                  Your Photo (Required)
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
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
                disabled={isLoading}
                className={`bg-orange text-white py-2 px-6 rounded-lg transition-colors focus:outline-none ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Add Testimonial'}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-16 text-center">
            <h3 className="text-2xl mb-4">Thank You!</h3>
            <p className="text-gray-700">You have already submitted a testimonial. Thank you for sharing your experience!</p>
          </div>
        )}
        
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
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-orange shadow-md">
                          <img 
                            src={testimonial.imageUrl} 
                            alt={`${testimonial.name}'s photo`} 
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
