import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ShopSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="my-24"
    >
      <div className="relative overflow-hidden rounded-xl group cursor-pointer">
        <Link to="/shop">
          <div className="relative h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1594938328870-9623159c8c99"
              alt="Luxury Shop Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-serif mb-4">Discover Our Collections</h3>
                <p className="text-lg mb-6 max-w-xl">
                  Explore our curated selection of bespoke suits, shirts, and accessories crafted with unparalleled attention to detail.
                </p>
                <div className="inline-flex items-center text-zeof-gold hover:text-white transition-colors">
                  Visit Shop <ArrowRight className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.section>
  );
};

export default ShopSection;