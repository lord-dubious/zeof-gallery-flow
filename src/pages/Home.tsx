import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-zeof-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Welcome to Zeof Excluzioni
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zeof-cream mb-8 max-w-2xl mx-auto"
          >
            Discover the extraordinary journey of Chief Jideofor Ezeofor and his vision for excellence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/about">
              <Button className="bg-zeof-gold hover:bg-zeof-brown text-white px-8 py-6 text-lg">
                Explore Our Story <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-zeof-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Vision</h3>
              <p className="text-gray-600">Leading with innovation and excellence in every endeavor.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Mission</h3>
              <p className="text-gray-600">Creating lasting value through sustainable practices and community engagement.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Values</h3>
              <p className="text-gray-600">Integrity, excellence, and commitment to positive change.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;