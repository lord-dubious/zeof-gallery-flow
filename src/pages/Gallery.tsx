import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Leadership Summit",
      category: "Events",
      url: "https://source.unsplash.com/random/800x600?business",
    },
    {
      id: 2,
      title: "Community Project",
      category: "Community",
      url: "https://source.unsplash.com/random/800x600?community",
    },
    {
      id: 3,
      title: "Innovation Hub",
      category: "Technology",
      url: "https://source.unsplash.com/random/800x600?technology",
    },
    // Add more placeholder images as needed
  ]);

  return (
    <div className="min-h-screen bg-zeof-cream py-24">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-zeof-black text-center mb-12"
        >
          Our Gallery
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif text-zeof-black mb-2">{image.title}</h3>
                <p className="text-gray-600">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;