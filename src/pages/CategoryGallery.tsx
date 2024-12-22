import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";

const CategoryGallery = () => {
  const { category } = useParams();
  const categoryData = categories.find(c => c.slug === category);

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{categoryData.title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{categoryData.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
              </div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample data structure for the gallery items
const categories = [
  {
    slug: "tropical-suits",
    title: "Tropical Suits",
    description: "Elegance meets comfort in our signature tropical collection",
    items: [
      {
        id: 1,
        title: "Classic Linen Suit",
        description: "Lightweight and breathable linen suit in ivory",
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Summer Cotton Suit",
        description: "Refined cotton suit in light blue",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"
      },
      // Add more items as needed
    ]
  },
  {
    slug: "african-suits",
    title: "African Suits",
    description: "Contemporary interpretations of traditional African aesthetics",
    items: [
      {
        id: 1,
        title: "Ankara Print Suit",
        description: "Modern suit with traditional Ankara patterns",
        image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Kente Inspired Blazer",
        description: "Blazer featuring Kente-inspired designs",
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop"
      },
      // Add more items as needed
    ]
  },
  {
    slug: "bespoke-shirts",
    title: "Bespoke Shirts",
    description: "Perfectly tailored shirts for the distinguished gentleman",
    items: [
      {
        id: 1,
        title: "Classic White Oxford",
        description: "Timeless white Oxford shirt with perfect fit",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "French Cuff Dress Shirt",
        description: "Elegant dress shirt with French cuffs",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop"
      },
      // Add more items as needed
    ]
  }
];

export default CategoryGallery;