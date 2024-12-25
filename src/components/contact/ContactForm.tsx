import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <Input type="text" placeholder="Your name" className="bg-zeof-cream border-zeof-gold/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input type="email" placeholder="Your email" className="bg-zeof-cream border-zeof-gold/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea 
              placeholder="Your message" 
              className="h-32 bg-zeof-cream border-zeof-gold/20" 
            />
          </div>
          <Button className="w-full bg-zeof-gold hover:bg-zeof-brown text-white">
            Send Message
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zeof-black p-8 rounded-lg text-white"
      >
        <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-zeof-gold mr-4" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-zeof-cream">contact@zeofexcluzioni.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-zeof-gold mr-4" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-zeof-cream">+1 234 567 890</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-zeof-gold mr-4" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-zeof-cream">
                123 Business Avenue<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;