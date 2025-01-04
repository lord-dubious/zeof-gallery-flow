import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../data/categories";
import $ from "jquery";
import "turn.js";

declare global {
  interface JQuery {
    turn(options: any): JQuery;
    turn(method: string): JQuery;
  }
}

const Gallery = () => {
  const magazineRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide navigation when entering the gallery
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    // Initialize turn.js
    if (magazineRef.current) {
      $(magazineRef.current).turn({
        display: 'double',
        acceleration: true,
        gradients: true,
        elevation: 50,
        when: {
          turned: function(e: Event, page: number) {
            console.log('Current page: ' + page);
          }
        }
      });
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      if (nav) nav.style.display = "block";
      $(magazineRef.current).turn("destroy");
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (magazineRef.current) {
        const width = Math.min(window.innerWidth * 0.9, 1200);
        const height = (width / 2) * 1.4; // Maintain magazine aspect ratio
        $(magazineRef.current).turn("size", width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zeof-gold"></div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-serif mb-6 text-zeof-black">Contents</h2>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={category.slug} className="flex items-center">
                <span className="text-zeof-gold mr-4">{index + 1}</span>
                <span className="text-lg font-serif">{category.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pages */}
        {categories.map((category) => (
          <div key={category.slug} className="p-8 bg-white">
            <h2 className="text-3xl font-serif mb-6 text-zeof-black">{category.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.id} className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-serif">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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