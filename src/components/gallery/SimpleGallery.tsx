
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleGalleryProps {
  images: Array<{
    id: string;
    url: string;
    title?: string;
    description?: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
}

export const SimpleGallery = ({ 
  images, 
  autoPlay = true, 
  interval = 5000 
}: SimpleGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Handle auto-play
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval]);
  
  // Go to previous image
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Go to next image
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };
  
  // Handle swipe gestures
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold || velocity.x < -0.3) {
      handleNext();
    } 
    else if (offset.x > swipeThreshold || velocity.x > 0.3) {
      handlePrev();
    }
  };
  
  // If no images, show a message
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }
  
  const currentImage = images[currentIndex];
  
  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Main image area with swipe capability */}
      <div className="relative h-96 bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "none" }}
          >
            <img 
              src={currentImage.url} 
              alt={currentImage.title || 'Gallery image'} 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Error loading image:', currentImage.url);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            {/* Caption overlay */}
            {(currentImage.title || currentImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                {currentImage.title && (
                  <h3 className="text-xl font-medium mb-1">{currentImage.title}</h3>
                )}
                {currentImage.description && (
                  <p className="text-sm">{currentImage.description}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation controls */}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>
      
      {/* Dots navigation - simple way to show position */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Simple instructions */}
      <div className="text-center mt-2 text-sm text-gray-500">
        <p>Swipe left or right to see more images</p>
      </div>
    </div>
  );
};
