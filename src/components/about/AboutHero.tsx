import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1581092795360-fd1ca04f0952)',
          transform: 'scale(1.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm">
          <div className="container mx-auto h-full flex items-center justify-center px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-8xl text-white font-serif font-bold leading-tight mb-6">
                The Art of <br />
                <span className="text-zeof-gold">Sartorial Excellence</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                Crafting distinction for distinguished gentlemen since 1985
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;