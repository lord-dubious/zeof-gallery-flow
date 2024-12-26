import { motion } from "framer-motion";

const Shop = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <div className="container mx-auto px-8 py-24">
        <h1 className="text-5xl md:text-7xl font-serif text-zeof-black mb-12">
          Our Collections
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4">
                <img
                  src={category.items[0].image}
                  alt={category.title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
              </div>
              <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;