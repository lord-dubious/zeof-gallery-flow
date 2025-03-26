
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      return data;
    },
  });

  // Extract overlay settings
  const overlayColor = heroContent?.content?.overlayColor || "#000000";
  const overlayOpacity = heroContent?.content?.overlayOpacity !== undefined 
    ? heroContent.content.overlayOpacity 
    : 0.6;
  
  const imageUrl = heroContent?.image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574';

  return (
    <section className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(${imageUrl})`, 
        }}
      >
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
              The Art of Refined Elegance
            </h1>
            <p className="text-lg text-gray-100 mb-12 font-light tracking-wide max-w-xl">
              Where timeless craftsmanship meets contemporary sophistication
            </p>
            <Link to="/gallery">
              <Button className="bg-zeof-gold hover:bg-zeof-brown text-white px-8 py-6 text-sm tracking-wider transition-all duration-300 rounded-none uppercase">
                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
