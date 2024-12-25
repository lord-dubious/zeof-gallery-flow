import React from 'react';
import Navigation from '@/components/Navigation';
import AboutHero from '@/components/about/AboutHero';
import ProfileSection from '@/components/about/ProfileSection';
import ContentSections from '@/components/about/ContentSections';
import ShopSection from '@/components/about/ShopSection';

const About = () => {
  const shareUrl = window.location.href;
  const title = "About ZEOF EXCLUZIONI - A Legacy of Sartorial Excellence";
  
  const shareHandlers = {
    facebook: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    },
    twitter: () => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
    },
    email: () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
    }
  };

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
          <ProfileSection shareHandlers={shareHandlers} />
          <ContentSections />
          <ShopSection />
        </div>
      </motion.div>
    </div>
  );
};

export default About;