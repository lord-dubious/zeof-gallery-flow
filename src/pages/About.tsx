import React from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-zeof-black">
      <Navigation />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 lg:py-24"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-zeof-gold">
            About ZEOF EXCLUZIONI
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              ZEOF EXCLUZIONI is a curated visual experience that celebrates the intersection 
              of art, design, and exclusivity. Founded with a passion for unique perspectives, 
              we showcase carefully selected imagery that tells compelling stories.
            </p>
            
            <p>
              Our mission is to provide a platform where visual narratives transcend traditional 
              boundaries, offering viewers a glimpse into extraordinary moments and perspectives.
            </p>
            
            <div className="bg-zeof-gold/10 p-6 rounded-lg border border-zeof-gold/20 mt-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-zeof-gold">
                Our Philosophy
              </h2>
              <p>
                We believe in the power of visual storytelling and the ability of images to 
                communicate complex emotions and experiences beyond words.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;