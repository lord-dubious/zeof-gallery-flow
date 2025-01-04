import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "turn.js";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Image } from "@/components/admin/types/images";
import { useToast } from "@/hooks/use-toast";
import { MagazineCover } from "@/components/gallery/MagazineCover";
import { MagazineContents } from "@/components/gallery/MagazineContents";
import { MagazineSpread } from "@/components/gallery/MagazineSpread";

declare global {
  interface JQuery {
    turn(options: any): JQuery;
    turn(method: string): JQuery;
  }
}

const Gallery = () => {
  const magazineRef = useRef<HTMLDivElement>(null);
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
      const aspectRatio = 1.4; // Standard magazine aspect ratio
      
      let width = viewportWidth;
      let height = width / 2 * aspectRatio;
      
      if (height > viewportHeight) {
        height = viewportHeight;
        width = (height / aspectRatio) * 2;
      }

      setDimensions({ width, height });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  useEffect(() => {
    // Hide navigation during gallery view
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    const initializeTurn = () => {
      if (magazineRef.current && images && images.length > 0 && dimensions.width > 0) {
        try {
          const $magazine = $(magazineRef.current);
          
          $magazine.turn({
            display: 'double',
            acceleration: true,
            gradients: true,
            elevation: 50,
            autoCenter: true,
            width: dimensions.width,
            height: dimensions.height,
            when: {
              turning: function(event: Event, page: number) {
                const book = $(this);
                if (book.turn('hasPage', page)) {
                  event.preventDefault();
                }
              },
              turned: function() {
                setIsLoading(false);
              }
            }
          });
        } catch (error) {
          console.error('Error initializing Turn.js:', error);
          setIsLoading(false);
        }
      }
    };

    if (images && images.length > 0 && dimensions.width > 0) {
      // Wait for images to be loaded
      const timer = setTimeout(initializeTurn, 1000);
      return () => clearTimeout(timer);
    }

    return () => {
      // Show navigation when leaving gallery
      if (nav) nav.style.display = "block";
      
      // Cleanup Turn.js
      try {
        if (magazineRef.current) {
          $(magazineRef.current).turn('destroy');
        }
      } catch (error) {
        console.error('Error destroying Turn.js:', error);
      }
    };
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-zeof-gold" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">No published images available in the gallery</p>
      </div>
    );
  }

  // Create pairs of images for each spread
  const spreads = [];
  for (let i = 0; i < images.length; i += 2) {
    spreads.push({
      leftImage: images[i],
      rightImage: images[i + 1]
    });
  }

  return (
    <div className="min-h-screen bg-zeof-cream flex items-center justify-center p-4">
      <div 
        ref={magazineRef}
        className="magazine turn-shadow"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      >
        <MagazineCover />
        <MagazineContents />
        {spreads.map((spread, index) => (
          <MagazineSpread 
            key={index}
            leftImage={spread.leftImage}
            rightImage={spread.rightImage}
          />
        ))}
        <MagazineCover isBack />
      </div>
    </div>
  );
};

export default Gallery;