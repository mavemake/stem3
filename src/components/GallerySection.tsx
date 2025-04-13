
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { isUserLoggedIn } from '@/services/testimonialService';
import { toast } from 'sonner';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

// Empty gallery to start with
const initialGalleryImages: { id: number; src: string; alt: string }[] = [];

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string; alt: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      
      // Create a file reader to read the image
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const newImage = {
            id: Date.now(),
            src: result,
            alt: file.name,
          };
          
          setGalleryImages([...galleryImages, newImage]);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const openLightbox = (image: { id: number; src: string; alt: string }) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleProfilePrompt = () => {
    // Scroll to the section with profile creation
    const loginSection = document.getElementById('profile-prompt');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
      toast.info('Create a profile to personalize your experience!');
    }
  };

  return (
    <section id="gallery" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">Gallery</h2>
        
        {/* Upload Button */}
        <div className="mb-10 flex justify-center">
          <label className="btn btn-primary cursor-pointer relative overflow-hidden">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            {isUploading ? 'Uploading...' : 'Upload Your Photo'}
          </label>
        </div>
        
        {!isUserLoggedIn() && (
          <div className="max-w-xl mx-auto mb-8">
            <Alert className="bg-orange/10 border-orange">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Consider <button 
                  onClick={handleProfilePrompt} 
                  className="text-orange underline font-medium"
                >creating a profile</button> to personalize your experience!
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {galleryImages.length > 0 ? (
          /* Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div 
                key={image.id}
                className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer hover-scale"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p>No images in the gallery yet. Be the first to share your memories!</p>
          </div>
        )}
        
        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh]"
              />
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full text-dark flex items-center justify-center"
                onClick={closeLightbox}
              >
                X
              </button>
            </div>
          </div>
        )}
        
        {/* Hidden element for scrolling target */}
        <div id="profile-prompt" className="invisible h-0"></div>
      </div>
    </section>
  );
};

export default GallerySection;
