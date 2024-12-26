import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AboutHero from '@/components/about/AboutHero';
import ProfileSection from '@/components/about/ProfileSection';
import ContentSections from '@/components/about/ContentSections';
import ShopSection from '@/components/about/ShopSection';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AboutHero />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 lg:py-24"
      >
        <div className="max-w-4xl mx-auto">
          <ProfileSection />
          <ContentSections />
          <ShopSection />
        </div>
      </motion.div>
    </div>
  );
};

export default About;