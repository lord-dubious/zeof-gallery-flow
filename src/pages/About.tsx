import React from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { Facebook, Mail, Share2, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      
      {/* Hero Section with Parallax Effect */}
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 lg:py-24"
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-zeof-gold/20 transform rotate-3 rounded-xl"></div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                    alt="Chief Jideofor Ezeofor"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
            <div className="md:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-zeof-gold">
                  Chief Jideofor Ezeofor
                </h2>
                <p className="text-xl mb-6 text-zeof-brown italic font-serif">
                  "I'm a lawyer by training and a tailor and artist by inclination."
                </p>
                <div className="prose prose-lg text-zeof-black/80 mb-8">
                  <p className="leading-relaxed">
                    From a distinguished lineage of lawyers to becoming a pioneering force in fashion, 
                    Chief Jideofor Ezeofor's journey is a testament to following one's true calling.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareHandlers.facebook}
                    className="border-zeof-gold text-zeof-gold hover:bg-zeof-gold hover:text-white transition-colors"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareHandlers.twitter}
                    className="border-zeof-gold text-zeof-gold hover:bg-zeof-gold hover:text-white transition-colors"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Tweet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareHandlers.email}
                    className="border-zeof-gold text-zeof-gold hover:bg-zeof-gold hover:text-white transition-colors"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content Sections with Enhanced Styling */}
          <div className="space-y-24 prose prose-lg max-w-none">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-serif font-semibold mb-8 text-zeof-gold">
                The Early Years
              </h3>
              <div className="bg-gradient-to-r from-zeof-cream to-white p-8 rounded-lg border border-zeof-gold/10 shadow-lg">
                <p className="mb-6 leading-relaxed">
                  Fashion became an allure to Ezeofor as a child. Even though nobody in his family showed 
                  a proclivity towards the art, he embraced it wholeheartedly.
                </p>
                <blockquote className="border-l-4 border-zeof-gold pl-6 my-8 italic text-lg">
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
            >
              <h3 className="text-3xl font-serif font-semibold mb-8 text-zeof-gold">
                Legal Heritage & Fashion Passion
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="prose prose-lg">
                  <p className="leading-relaxed">
                    Coming from a family of distinguished legal practitioners, Ezeofor's journey took an 
                    unexpected turn. While serving as a Magistrate in Anambra State for five years, his 
                    artistic inclinations led him to make a bold decision.
                  </p>
                </div>
                <div className="bg-zeof-black p-8 rounded-lg">
                  <p className="text-white italic text-lg leading-relaxed">
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
            >
              <h3 className="text-3xl font-serif font-semibold mb-8 text-zeof-gold">
                Global Recognition
              </h3>
              <div className="bg-gradient-to-br from-zeof-cream via-white to-zeof-cream p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="mb-4 leading-relaxed">
                      With over three decades in the industry, Ezeofor has expanded his fashion business 
                      significantly. His designer label, Zeof Excluzioni, now serves a diverse clientele 
                      across all segments of society.
                    </p>
                  </div>
                  <div className="bg-zeof-gold/10 p-6 rounded-lg">
                    <p className="italic text-zeof-brown text-lg leading-relaxed">
                      "We clothe captains of industries, bankers, professionals, top public servants, 
                      businessmen, governors, African presidents and upwardly mobile individuals with 
                      great sense of style."
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-zeof-black text-white p-12 rounded-lg mt-16">
                <h3 className="text-3xl font-serif font-semibold mb-6 text-zeof-gold">
                  Words of Wisdom
                </h3>
                <p className="text-xl leading-relaxed italic">
                  "The fashion business is tough; you have to have the extra passion to be successful 
                  in the fashion business. The early years can be frustrating, but if you persist, you 
                  will gather experience and tenacity and success will be yours."
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;