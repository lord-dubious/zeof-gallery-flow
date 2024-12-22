import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section h-screen relative flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-zeof-gold font-medium mb-4 block">
              Since 1985
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
              Crafting Distinction for Distinguished Gentlemen
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Where meticulous attention to detail meets contemporary flow in
              bespoke fashion
            </p>
            <Link
              to="/gallery"
              className="inline-flex items-center px-8 py-3 bg-zeof-gold text-white rounded hover:bg-opacity-90 transition-all duration-300"
            >
              Explore Collections
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-zeof-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-zeof-gold font-medium mb-4 block">
              Our Collections
            </span>
            <h2 className="text-4xl font-serif mb-4">Signature Styles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated collections of tropical suits, African suits, and
              bespoke shirts, each piece crafted with unparalleled attention to
              detail.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link to={`/gallery/${category.slug}`} key={category.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-zeof-gold font-medium mb-4 block">
                Our Heritage
              </span>
              <h2 className="text-4xl font-serif mb-6">
                The House of Zeof Legacy
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 1985 by Jideofor V.C. Ezeofor Esg, The House of Zeof
                has established itself as a beacon of excellence in bespoke
                fashion. Our journey spans decades of crafting exceptional garments
                for presidents, kings, and distinguished gentlemen.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-zeof-gold hover:text-zeof-brown transition-colors duration-300"
              >
                Discover Our Story
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
                src="/heritage-image.jpg"
                alt="Heritage"
                className="w-full h-[600px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const categories = [
  {
    title: "Tropical Suits",
    description: "Elegance meets comfort in our signature tropical collection",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop",
    slug: "tropical-suits"
  },
  {
    title: "African Suits",
    description: "Contemporary interpretations of traditional African aesthetics",
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop",
    slug: "african-suits"
  },
  {
    title: "Bespoke Shirts",
    description: "Perfectly tailored shirts for the distinguished gentleman",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
    slug: "bespoke-shirts"
  },
];

export default Index;