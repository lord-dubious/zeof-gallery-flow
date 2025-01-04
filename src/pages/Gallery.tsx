import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "turn.js";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Image } from "@/components/admin/types/images";

declare global {
  interface JQuery {
    turn(options: any): JQuery;
    turn(method: string): JQuery;
  }
}

const Gallery = () => {
  const magazineRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch only published images from the gallery bucket
  const { data: images } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_published', true)
        .like('url', '%/gallery/%') // Filter for images from the gallery bucket
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Image[];
    }
  });

  useEffect(() => {
    // Hide navigation when entering the gallery
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    // Initialize turn.js with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (magazineRef.current) {
        try {
          $(magazineRef.current).turn({
            display: 'double',
            acceleration: true,
            gradients: true,
            elevation: 50,
            autoCenter: true,
            when: {
              turning: function(event: Event, page: number, view: number[]) {
                console.log('Turning to page:', page);
              },
              turned: function(event: Event, page: number, view: number[]) {
                console.log('Current page:', page);
              }
            }
          });
          setIsLoading(false);
        } catch (error) {
          console.error('Error initializing Turn.js:', error);
          setIsLoading(false);
        }
      }
    }, 1000);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (nav) nav.style.display = "block";
      try {
        if (magazineRef.current) {
          $(magazineRef.current).turn("destroy");
        }
      } catch (error) {
        console.error('Error destroying Turn.js:', error);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (magazineRef.current) {
        try {
          const width = Math.min(window.innerWidth * 0.9, 1200);
          const height = (width / 2) * 1.4; // Maintain magazine aspect ratio
          $(magazineRef.current).turn("size", width, height);
        } catch (error) {
          console.error('Error resizing Turn.js:', error);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-zeof-gold" />
      </div>
    );
  }

  // Group images into pairs for double-page spread
  const imageGroups = images ? Array.from({ length: Math.ceil(images.length / 2) }, (_, i) =>
    images.slice(i * 2, i * 2 + 2)
  ) : [];

  return (
    <div className="min-h-screen bg-zeof-cream flex items-center justify-center p-4">
      <div 
        ref={magazineRef}
        className="magazine w-[90vw] max-w-[1200px] h-[80vh] bg-white shadow-2xl"
      >
        {/* Cover */}
        <div className="hard relative bg-zeof-black text-white">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">ZEOF Collection</h1>
            <p className="text-lg md:text-xl font-light">A Journey Through Elegance</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-serif mb-6 text-zeof-black">Our Gallery</h2>
          <p className="text-lg text-gray-600">
            Browse through our collection of curated images, each telling a unique story of style and sophistication.
          </p>
        </div>

        {/* Image Pages */}
        {imageGroups.map((group, index) => (
          <div key={index} className="p-8 bg-white flex">
            {group.map((image, imageIndex) => (
              <div key={image.id} className="flex-1 p-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.url}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-serif">
                      {image.title || 'Untitled'}
                    </h3>
                    {image.description && (
                      <p className="text-white/80 text-sm">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Back Cover */}
        <div className="hard relative bg-zeof-black text-white">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="ZEOF Logo"
              className="w-24 h-24 opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;