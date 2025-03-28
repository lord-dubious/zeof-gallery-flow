
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AtelierSection = () => {
  // Fetch atelier content from database
  const { data: atelierContent } = useQuery({
    queryKey: ["site-content", "atelier"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .eq("section", "atelier")
        .single();

      if (error) {
        // Handle the error silently for this non-critical section
        console.error("Error fetching atelier content:", error);
        return null;
      }
      return data;
    },
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="pr-8"
          >
            <span className="text-zeof-gold font-serif italic mb-4 block">Our Atelier</span>
            <h2 className="text-4xl font-serif mb-6 text-zeof-black">
              {atelierContent?.title || "The House of Zeof Legacy"}
            </h2>
            <p className="text-gray-700 mb-6 font-light leading-relaxed">
              {atelierContent?.description || 
                "For over three decades, our atelier has been crafting exceptional garments for distinguished gentlemen, heads of state, and connoisseurs of fine tailoring. Each piece is a testament to our unwavering commitment to excellence and the preservation of traditional craftsmanship."}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-zeof-gold hover:text-zeof-brown transition-colors duration-300 font-serif"
            >
              Discover Our Heritage
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={atelierContent?.image_url || "https://images.unsplash.com/photo-1585914924626-15adac1e6402?q=80&w=2671"}
              alt="Atelier"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AtelierSection;
