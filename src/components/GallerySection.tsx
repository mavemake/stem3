
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Sample gallery images
const initialGalleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Restaurant interior",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
    alt: "Plate of food",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Restaurant ambiance",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Food plating",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Chef at work",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Table setting",
  },
];

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      
      // Create a file reader to read the image
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now(),
          src: event.target.result,
          alt: file.name,
        };
        
        setGalleryImages([...galleryImages, newImage]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
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
        
        {/* Gallery Grid */}
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
      </div>
    </section>
  );
};

export default GallerySection;
