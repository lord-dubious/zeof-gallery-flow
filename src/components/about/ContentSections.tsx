import { motion } from 'framer-motion';

const ContentSections = () => {
  return (
    <div className="space-y-40 max-w-7xl mx-auto px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black/95 text-white p-16 md:p-24 rounded-none"
      >
        <h3 className="text-4xl md:text-5xl font-serif font-semibold mb-12 text-zeof-gold !mt-0">
          The Early Years
        </h3>
        <div className="space-y-8">
          <p className="text-gray-300 leading-relaxed text-lg">
            Fashion became an allure to Ezeofor as a child. Even though nobody in his family showed 
            a proclivity towards the art, he embraced it wholeheartedly.
          </p>
          <blockquote className="border-l-4 border-zeof-gold pl-8 my-12 italic text-2xl text-white">
            "I started designing clothes when I was very young, around 12 years old. All through my 
            senior secondary school and university, I designed and made clothes. My initial clients 
            were my schoolmates at the University of Ife."
          </blockquote>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-zeof-cream p-16 md:p-24 rounded-none"
      >
        <h3 className="text-4xl md:text-5xl font-serif font-semibold mb-12 text-zeof-black !mt-0">
          Legal Heritage & Fashion Passion
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-zeof-black/80 leading-relaxed text-lg">
              Coming from a family of distinguished legal practitioners, Ezeofor's journey took an 
              unexpected turn. While serving as a Magistrate in Anambra State for five years, his 
              artistic inclinations led him to make a bold decision.
            </p>
          </div>
          <div className="bg-black p-12 rounded-none">
            <p className="text-white italic text-xl leading-relaxed">
              "I'm a lawyer by training and a tailor and artist by inclination. I didn't abandon the 
              legal profession. I am a second-generation lawyer. My father and mother are lawyers. 
              My father, Ichie Ezeofor is a life bencher of the Body of Benchers."
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-black to-zeof-black p-16 md:p-24 rounded-none"
      >
        <h3 className="text-4xl md:text-5xl font-serif font-semibold mb-12 text-zeof-gold !mt-0">
          Global Recognition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-300 leading-relaxed text-lg">
              With over three decades in the industry, Ezeofor has expanded his fashion business 
              significantly. His designer label, Zeof Excluzioni, now serves a diverse clientele 
              across all segments of society.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-12 rounded-none border border-zeof-gold/20">
            <p className="text-zeof-gold italic text-xl leading-relaxed">
              "We clothe captains of industries, bankers, professionals, top public servants, 
              businessmen, governors, African presidents and upwardly mobile individuals with 
              great sense of style."
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContentSections;