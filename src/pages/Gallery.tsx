import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-zeof-cream py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-zeof-gold font-serif italic mb-4 block">Collections</span>
          <h1 className="text-4xl md:text-5xl font-serif text-zeof-black mb-4">
            Masterpieces of Craftsmanship
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Explore our curated collections, where each piece embodies the pinnacle of sartorial excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={`/gallery/${category.slug}`} key={category.slug}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={category.items[0].image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-zeof-black mb-2">{category.title}</h3>
                  <p className="text-gray-600 font-light">{category.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;