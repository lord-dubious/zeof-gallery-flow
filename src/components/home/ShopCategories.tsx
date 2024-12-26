import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ShopCategories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-zeof-gold font-serif italic mb-4 block">Collections</span>
          <h2 className="text-4xl font-serif mb-4">Explore Our Shop</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Discover our curated selection of luxury garments and accessories
          </p>
        </motion.div>

        <Link to="/shop">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1594938328870-9623159c8c99"
                alt="Luxury Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                <h3 className="text-4xl font-serif mb-4">Discover Our Complete Collection</h3>
                <p className="text-lg mb-6 max-w-2xl">
                  From bespoke suits to accessories, explore our curated selection of luxury garments crafted with unparalleled attention to detail.
                </p>
                <div className="inline-flex items-center text-zeof-gold hover:text-white transition-colors text-lg">
                  Visit Shop <ArrowRight className="ml-2" />
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