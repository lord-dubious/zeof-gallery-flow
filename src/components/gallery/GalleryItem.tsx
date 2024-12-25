import { motion } from "framer-motion";

interface GalleryItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

const GalleryItem = ({ item, index }: GalleryItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-serif mb-2">{item.title}</h3>
          <p className="text-sm font-light">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryItem;