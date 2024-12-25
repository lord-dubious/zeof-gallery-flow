import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574)', 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-zeof-gold font-serif italic mb-4 block text-lg">
              Est. 1985
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              The Art of Bespoke Elegance
            </h1>
            <p className="text-lg text-gray-200 mb-8 font-light">
              Where timeless craftsmanship meets contemporary sophistication in haute couture
            </p>
            <Link to="/gallery">
              <Button className="bg-zeof-gold hover:bg-zeof-brown text-white px-8 py-6 text-lg rounded-none">
                Explore Collection <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;