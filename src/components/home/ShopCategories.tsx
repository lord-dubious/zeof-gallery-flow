import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Bespoke Suits",
    description: "Handcrafted excellence for the modern gentleman",
    image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99",
    link: "/shop/suits"
  },
  {
    title: "Formal Collection",
    description: "Timeless elegance for special occasions",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    link: "/shop/formal"
  },
  {
    title: "Accessories",
    description: "Refined details that make a statement",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
    link: "/shop/accessories"
  },
  {
    title: "Casual Wear",
    description: "Sophisticated comfort for everyday elegance",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
    link: "/shop/casual"
  }
];

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

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link to={category.link} key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                    <p className="text-sm font-light mb-4">{category.description}</p>
                    <div className="inline-flex items-center text-zeof-gold hover:text-white transition-colors">
                      Explore Collection <ArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;