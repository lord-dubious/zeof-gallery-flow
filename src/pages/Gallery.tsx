
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchImages } from "@/services/content";
import { useQuery } from "@tanstack/react-query";

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: images } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      return fetchImages();
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zeof-black">
      <div className="pt-32 pb-16">
        <Link 
          to="/" 
          className="fixed top-4 md:top-8 left-4 md:left-8 text-white hover:text-zeof-gold transition-colors duration-300 flex items-center gap-2 z-50"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xl md:text-2xl font-serif tracking-wider">ZEOF</span>
        </Link>

        <div className="container mx-auto px-8">
          <h1 className="text-5xl font-serif mb-12 text-center text-white">Our Gallery</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-800 animate-pulse h-80"></div>
              ))
            ) : (
              images?.map((item, index) => (
                <div key={index} className="overflow-hidden group">
                  <img 
                    src={item.url || `https://images.unsplash.com/photo-15949383288${index + 1}0-9623159c8c99?q=80&w=2680`}
                    alt={item.alt || `Gallery item ${index + 1}`}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
