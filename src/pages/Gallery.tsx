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

  const { data: images, error } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched images:', data);
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
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    const initializeTurn = () => {
      if (magazineRef.current && images && images.length > 0) {
        try {
          const $magazine = $(magazineRef.current);
          
          // Calculate dimensions based on viewport
          const width = Math.min(window.innerWidth * 0.9, 1200);
          const height = (width / 2) * 1.4;

          $magazine.turn({
            display: 'double',
            acceleration: true,
            gradients: true,
            elevation: 50,
            autoCenter: true,
            width: width,
            height: height,
            when: {
              turning: (event: Event, page: number) => {
                console.log('Turning to page:', page);
              },
              turned: (event: Event, page: number) => {
                console.log('Current page:', page);
                setIsLoading(false);
              }
            }
          });
        } catch (error) {
          console.error('Error initializing Turn.js:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (images && images.length > 0) {
      // Wait for images to be loaded
      const timer = setTimeout(initializeTurn, 1000);
      return () => clearTimeout(timer);
    }

    return () => {
      if (nav) nav.style.display = "block";
      try {
        if (magazineRef.current) {
          $(magazineRef.current).turn("destroy");
        }
      } catch (error) {
        console.error('Error destroying Turn.js:', error);
      }
    };
  }, [images]);

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
        className="magazine w-[90vw] max-w-[1200px] h-[80vh] bg-white shadow-2xl"
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