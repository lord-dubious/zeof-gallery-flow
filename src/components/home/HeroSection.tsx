import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574)',
        }}
      >
        {/* layered cinematic wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-12 bg-zeof-gold/80" />
              <span className="text-zeof-gold font-sans text-[0.7rem] tracking-[0.4em] uppercase">
                Maison Zeof &mdash; Est. 1985
              </span>
            </div>

            <h1 className="font-display text-white text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] font-light tracking-tight mb-10">
              The Art of
              <br />
              <span className="italic font-normal text-zeof-gold/95">
                Refined Elegance
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-light tracking-wide max-w-lg leading-relaxed mb-14">
              Where timeless craftsmanship meets contemporary sophistication &mdash;
              garments tailored with quiet intention for the discerning few.
            </p>

            <Link
              to="/gallery"
              className="group inline-flex items-center gap-5 text-white text-[0.7rem] tracking-[0.35em] uppercase pb-3 border-b border-white/40 hover:border-zeof-gold hover:text-zeof-gold transition-colors duration-500"
            >
              Explore the Collection
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                &mdash;&rsaquo;
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* refined scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/50 text-[0.6rem] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
