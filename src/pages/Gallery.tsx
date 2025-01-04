import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Image } from "@/components/admin/types/images";
import { useToast } from "@/hooks/use-toast";
import { MagazineCover } from "@/components/gallery/MagazineCover";
import { MagazineContents } from "@/components/gallery/MagazineContents";
import { MagazineSpread } from "@/components/gallery/MagazineSpread";
import { useIsMobile } from "@/hooks/use-mobile";
import HTMLFlipBook from 'react-pageflip';

const Gallery = () => {
  const bookRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();

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
      const viewportWidth = Math.min(window.innerWidth * (isMobile ? 0.95 : 0.9), 1200);
      const viewportHeight = window.innerHeight * 0.8;
      const aspectRatio = 1.4;
      
      let width = viewportWidth;
      let height = width / (isMobile ? 1 : 2) * aspectRatio;
      
      if (height > viewportHeight) {
        height = viewportHeight;
        width = (height / aspectRatio) * (isMobile ? 1 : 2);
      }

      setDimensions({ 
        width: isMobile ? width : width / 2, 
        height 
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [isMobile]);

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
    <div className="min-h-screen bg-gradient-to-b from-zeof-black/90 to-zeof-black/95 flex flex-col items-center justify-center p-4 md:p-8 space-y-8 relative">
      <Link 
        to="/" 
        className="absolute top-8 left-8 text-white hover:text-zeof-gold transition-colors duration-300 flex items-center gap-2 z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-2xl font-serif tracking-wider">ZEOF</span>
      </Link>
      
      <div className="text-center max-w-2xl mx-auto mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-4">Our Collection Gallery</h1>
        <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
          {isMobile ? 
            "Swipe through our digital collection to explore our work." :
            "Click and drag the corners to flip through the pages of our digital magazine."
          }
        </p>
      </div>
      
      <div 
        className="relative shadow-2xl rounded-lg overflow-hidden backdrop-blur-sm bg-white/5 p-4"
        style={{
          width: isMobile ? dimensions.width : dimensions.width * 2,
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
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          useMouseEvents={true}
          clickEventForward={true}
          swipeDistance={isMobile ? 10 : 30}
          showPageCorners={!isMobile}
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

      <div className="text-center mt-8 text-gray-400/80 text-sm animate-fadeIn delay-300">
        <p>{isMobile ? "Swipe to navigate pages" : "Use your mouse or touch to navigate through the pages"}</p>
      </div>
    </div>
  );
};

export default Gallery;