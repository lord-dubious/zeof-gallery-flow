import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <div className="relative h-[95vh] overflow-hidden pt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1581092795360-fd1ca04f0952)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/90">
          <div className="container mx-auto h-full flex items-center px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-7xl md:text-9xl text-white font-serif font-bold leading-[1.1] mb-8">
                The Art of <br />
                <span className="text-zeof-gold">Sartorial Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light tracking-wide">
                Crafting distinction for distinguished gentlemen since 1985. A legacy of precision, passion, and unparalleled craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;