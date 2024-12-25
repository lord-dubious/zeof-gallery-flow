import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-zeof-cream py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-zeof-black text-center mb-12">
            Get in Touch
          </h1>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;