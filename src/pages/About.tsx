import React from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { Facebook, Mail, Share2, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const shareUrl = window.location.href;
  const title = "About ZEOF EXCLUZIONI - A Story of Fashion and Legacy";
  
  const shareHandlers = {
    facebook: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    },
    twitter: () => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
    },
    whatsapp: () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`, '_blank');
    },
    telegram: () => {
      window.open(`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
    },
    email: () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
    }
  };

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
            The Story of Chief Jideofor Ezeofor
          </h1>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={shareHandlers.facebook}
              className="hover:bg-blue-500 hover:text-white"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareHandlers.twitter}
              className="hover:bg-sky-500 hover:text-white"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Tweet
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareHandlers.whatsapp}
              className="hover:bg-green-500 hover:text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareHandlers.telegram}
              className="hover:bg-blue-400 hover:text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Telegram
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareHandlers.email}
              className="hover:bg-gray-800 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="mb-4 text-lg leading-relaxed">
                Coming from a lineage of lawyers, it was expected that Chief Jideofor Ezeofor would follow in his parents' footsteps. However, providence had different plans, leading him to find his true calling in the fashion industry.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                Hailing from a family with the highest noble rank of the legal profession – the body of benchers, Chief Ezeofor would have probably been sitting on the Bar as a Court of Appeal judge had he threaded the family's traditional career path. Rather, Ezeofor who practised law for a while, switched to the fashion business.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-serif font-semibold mb-4 text-zeof-gold">Early Beginnings</h2>
              <p className="mb-4 text-lg leading-relaxed">
                "I started designing clothes when I was very young, around 12 years old," he recalled. "All through my senior secondary school and university, I designed and made clothes. My initial clients were my schoolmates at the University of Ife, now Obafemi Awolowo University, Ile-Ife, where I studied law."
              </p>
              <blockquote className="border-l-4 border-zeof-gold pl-4 italic my-6">
                "I'm a lawyer by training and a tailor and artist by inclination. I didn't abandon the legal profession. I am a second-generation lawyer. My father and mother are lawyers. My father, Ichie Ezeofor is a life bencher of the Body of Benchers; it is a body of lawyers of the highest distinction in Nigeria."
              </blockquote>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-serif font-semibold mb-4 text-zeof-gold">Journey to Fashion</h2>
              <p className="mb-4 text-lg leading-relaxed">
                "Law also is in my veins. I was once a Magistrate in the Anambra State Judiciary. I served for five years at the Chief Magistrate Court Ogidi and Onitsha respectively. The fulfillment I got when I dispensed justice without fear or favour cannot be equated. I became conflicted when it was our turn to be elevated to the High Court. The artist in me couldn't keep still."
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                With over three decades in the industry, Ezeofor has expanded his fashion business significantly. His designer label, Zeof Excluzioni, now serves a diverse clientele across all segments of society, establishing itself as a top-end brand.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-serif font-semibold mb-4 text-zeof-gold">Global Recognition</h2>
              <p className="mb-4 text-lg leading-relaxed">
                "Nigerian designers have matured in their craft over the years. When I started designing clothes in 1985, it wasn't popular; Nigerians preferred to buy ready-to-wear clothes imported from Europe and America. But now, we have matured in fashion content, just like our Afrobeat music. We have clients in Europe and America. The Nigerian fashion brand is international."
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                "We receive orders from abroad, package and ship them. Sometimes in 2007, I showcased how my Zeof tropical, hybrid and African suit is worn in the international fashion arena in the magic marketplace in Las Vegas, USA, organised by the US Commercial department."
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-serif font-semibold mb-4 text-zeof-gold">Vision for the Future</h2>
              <p className="mb-4 text-lg leading-relaxed">
                While calling on the government to embed fashion designing and other vocational skills in the tertiary education curriculum, High Chief Ezeofor expressed optimism that in the next 30 years, Zeof will expand beyond its present status and become a global brand.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                "My first son, who is an architect, is very much interested in continuing with the business. He has his design for the younger generation and his younger brother too. They created a label known as Denzel Blake Imperial, which is an offshoot of Zeof Excluzioni."
              </p>
            </section>

            <div className="bg-zeof-gold/10 p-6 rounded-lg border border-zeof-gold/20 mt-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-zeof-gold">
                Words of Wisdom
              </h2>
              <p className="text-lg leading-relaxed">
                "The fashion business is tough; you have to have the extra passion to be successful in the fashion business. The early years can be frustrating, but if you persist, you will gather experience and tenacity and success will be yours."
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;