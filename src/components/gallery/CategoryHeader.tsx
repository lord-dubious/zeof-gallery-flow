import { motion } from "framer-motion";

interface CategoryHeaderProps {
  title: string;
  description: string;
}

const CategoryHeader = ({ title, description }: CategoryHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <span className="text-zeof-gold font-serif italic mb-4 block">Collection</span>
      <h1 className="text-4xl md:text-5xl font-serif mb-4">{title}</h1>
      <p className="text-gray-600 max-w-2xl mx-auto font-light">{description}</p>
    </motion.div>
  );
};

export default CategoryHeader;