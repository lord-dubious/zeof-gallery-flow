import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1581092795360-fd1ca04f0952)',
          transform: 'scale(1.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl text-white font-serif font-bold text-center leading-tight"
            >
              The Art of <br />
              <span className="text-zeof-gold">Sartorial Excellence</span>
            </motion.h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;