
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define type for hero content
interface HeroContent {
  content?: {
    overlayColor?: string;
    overlayOpacity?: number;
    imagePosition?: {
      x: number;
      y: number;
    };
    heroText?: {
      heading?: string;
      subheading?: string;
      buttonText?: string;
      buttonUrl?: string;
    };
    [key: string]: any;
  };
  image_url?: string;
  [key: string]: any;
}

const HeroSection = () => {
  // Fetch hero content from database
  const { data: heroContent } = useQuery({
    queryKey: ["site-content", "hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .eq("section", "hero")
        .single();

      if (error) throw error;
      return data as HeroContent;
    },
  });

  // Extract overlay settings
  const overlayColor = heroContent?.content?.overlayColor || "#000000";
  const overlayOpacity = heroContent?.content?.overlayOpacity !== undefined 
    ? heroContent.content.overlayOpacity 
    : 0.6;
  
  // Extract image position
  const imagePosition = heroContent?.content?.imagePosition || { x: 50, y: 50 };
  
  // Extract hero text content
  const heroText = heroContent?.content?.heroText || {};
  const heading = heroText.heading || "The Art of Refined Elegance";
  const subheading = heroText.subheading || "Where timeless craftsmanship meets contemporary sophistication";
  const buttonText = heroText.buttonText || "Explore Collection";
  const buttonUrl = heroText.buttonUrl || "/gallery";
  
  const imageUrl = heroContent?.image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574';

  return (
    <section className="relative h-screen">
      <div 
        className="absolute inset-0 overflow-hidden"
      >
        <img 
          src={imageUrl}
          alt="Hero background"
          className="absolute w-auto h-auto min-w-full min-h-full object-cover"
          style={{ 
            objectPosition: `${imagePosition.x}% ${imagePosition.y}%`
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `${overlayColor}`,
            opacity: overlayOpacity
          }} 
        />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-zeof-gold font-serif tracking-wider mb-6 block text-sm uppercase">
              Est. 1985
            </span>
            <h1 className="text-6xl md:text-7xl font-serif text-white mb-8 leading-tight">
              {heading}
            </h1>
            <p className="text-lg text-gray-100 mb-12 font-light tracking-wide max-w-xl">
              {subheading}
            </p>
            <Link to={buttonUrl}>
              <Button className="bg-zeof-gold hover:bg-zeof-brown text-white px-8 py-6 text-sm tracking-wider transition-all duration-300 rounded-none uppercase">
                {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
