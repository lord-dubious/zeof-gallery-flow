import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Image } from "@/components/admin/types/images";
import { useToast } from "@/hooks/use-toast";
import { MagazineCover } from "@/components/gallery/MagazineCover";
import { MagazineContents } from "@/components/gallery/MagazineContents";
import { MagazineSpread } from "@/components/gallery/MagazineSpread";
import HTMLFlipBook from 'react-pageflip';

const Gallery = () => {
  const bookRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { data: images, error } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Image[];
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    const calculateDimensions = () => {
      const viewportWidth = Math.min(window.innerWidth * 0.9, 1200);
      const viewportHeight = window.innerHeight * 0.8;
      const aspectRatio = 1.4;
      
      let width = viewportWidth;
      let height = width / 2 * aspectRatio;
      
      if (height > viewportHeight) {
        height = viewportHeight;
        width = (height / aspectRatio) * 2;
      }

      setDimensions({ width: width / 2, height });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    return () => {
      if (nav) nav.style.display = "block";
    };
  }, []);

  useEffect(() => {
    if (images && dimensions.width > 0) {
      setIsLoading(false);
    }
  }, [images, dimensions]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error loading gallery images</p>
      </div>
    );
  }

  if (isLoading || !images) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zeof-cream to-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-zeof-gold" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zeof-cream to-white flex items-center justify-center">
        <p className="text-xl text-gray-500 font-serif italic">No published images available in the gallery</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zeof-cream to-white flex flex-col items-center justify-center p-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-serif text-zeof-black mb-4">Our Collection Gallery</h1>
        <p className="text-lg text-zeof-brown font-light leading-relaxed">
          Immerse yourself in our curated collection. Click and drag the corners to flip through the pages of our digital magazine.
        </p>
      </div>
      
      <div 
        className="relative shadow-2xl rounded-lg overflow-hidden backdrop-blur-sm bg-white/30 p-4"
        style={{
          width: dimensions.width * 2,
          height: dimensions.height,
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      >
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          showCover={true}
          mobileScrollSupport={true}
          className="magazine"
          ref={bookRef}
          style={{ background: 'transparent' }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          useMouseEvents={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          <div className="page">
            <MagazineCover />
          </div>
          <div className="page">
            <MagazineContents />
          </div>
          {images.map((image, index) => (
            <div key={image.id} className="page">
              <MagazineSpread leftImage={image} />
            </div>
          ))}
          <div className="page">
            <MagazineCover isBack />
          </div>
        </HTMLFlipBook>
      </div>

      <div className="text-center mt-8 text-zeof-brown/80 text-sm animate-fadeIn delay-300">
        <p>Use your mouse or touch to navigate through the pages</p>
      </div>
    </div>
  );
};

export default Gallery;