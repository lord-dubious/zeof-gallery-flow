import { motion } from "framer-motion";
import GalleryItem from "./GalleryItem";

interface GalleryGridProps {
  items: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <GalleryItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default GalleryGrid;