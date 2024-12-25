import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import CategoryHeader from "../components/gallery/CategoryHeader";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { categories } from "../data/categories";

const CategoryGallery = () => {
  const { category } = useParams();
  const categoryData = categories.find(c => c.slug === category);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-zeof-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-zeof-black mb-4">Collection Not Found</h1>
          <p className="text-gray-600">The collection you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <CategoryHeader 
          title={categoryData.title} 
          description={categoryData.description} 
        />
        <GalleryGrid items={categoryData.items} />
      </div>
    </div>
  );
};

export default CategoryGallery;