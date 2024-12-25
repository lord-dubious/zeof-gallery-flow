import { motion } from 'framer-motion';
import { Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileSectionProps {
  shareHandlers: {
    facebook: () => void;
    twitter: () => void;
    email: () => void;
  };
}

const ProfileSection = ({ shareHandlers }: ProfileSectionProps) => {
  return (
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
  );
};

export default ProfileSection;