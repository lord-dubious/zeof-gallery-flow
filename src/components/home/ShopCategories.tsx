
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ShopCategories = () => {
  // Fetch shop content from database
  const { data: shopContent } = useQuery({
    queryKey: ["site-content", "shop"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .eq("section", "shop")
        .single();

      if (error) {
        console.error("Error fetching shop content:", error);
        return null;
      }
      return data;
    },
  });

  return (
    <section className="py-32 bg-zeof-cream">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-zeof-gold font-serif tracking-wider mb-4 block text-sm uppercase">Collections</span>
          <h2 className="text-4xl font-serif mb-4 text-zeof-black">{shopContent?.title || "Discover Our Atelier"}</h2>
          <p className="text-gray-700 max-w-2xl mx-auto font-light tracking-wide">
            {shopContent?.description || "Experience the epitome of bespoke craftsmanship"}
          </p>
        </motion.div>

        <Link to="/shop">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden h-[70vh]">
              <img
                src={shopContent?.image_url || "https://images.unsplash.com/photo-1594938328870-9623159c8c99"}
                alt="Luxury Collection"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
                <h3 className="text-5xl font-serif mb-6">The Complete Collection</h3>
                <p className="text-lg mb-8 max-w-2xl font-light tracking-wide">
                  From bespoke suits to accessories, explore our curated selection of luxury garments crafted with unparalleled attention to detail.
                </p>
                <div className="inline-flex items-center text-zeof-gold group-hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase">
                  Visit Shop <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default ShopCategories;
