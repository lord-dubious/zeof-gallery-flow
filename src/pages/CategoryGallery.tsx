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
      {
        id: 3,
        title: "Tropical Wool Suit",
        description: "Breathable wool suit perfect for warm climates",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop"
      }
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
      {
        id: 3,
        title: "Contemporary African Suit",
        description: "Modern take on traditional African formal wear",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
      }
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
      {
        id: 3,
        title: "Business Casual Shirt",
        description: "Versatile shirt for any occasion",
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "casual-wear",
    title: "Casual Wear",
    description: "Sophisticated casual pieces for the modern gentleman",
    items: [
      {
        id: 1,
        title: "Casual Blazer",
        description: "Unstructured blazer for a relaxed look",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Polo Shirt",
        description: "Premium cotton polo in navy",
        image: "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Casual Chinos",
        description: "Comfortable yet stylish chinos",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "shirts",
    title: "Shirts Collection",
    description: "From formal to casual, our comprehensive shirt collection",
    items: [
      {
        id: 1,
        title: "Dress Shirt",
        description: "Classic fit dress shirt in white",
        image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Casual Shirt",
        description: "Relaxed fit casual shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Linen Shirt",
        description: "Summer linen shirt in beige",
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "trousers",
    title: "Trousers",
    description: "Expertly tailored trousers for every occasion",
    items: [
      {
        id: 1,
        title: "Formal Trousers",
        description: "Classic wool dress trousers",
        image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Casual Chinos",
        description: "Versatile cotton chinos",
        image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Linen Trousers",
        description: "Lightweight summer trousers",
        image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "shoes",
    title: "Shoes",
    description: "Handcrafted footwear for the discerning gentleman",
    items: [
      {
        id: 1,
        title: "Oxford Shoes",
        description: "Classic black Oxford shoes",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Loafers",
        description: "Comfortable leather loafers",
        image: "https://images.unsplash.com/photo-1614251056216-f748f76cd228?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Derby Shoes",
        description: "Elegant brown Derby shoes",
        image: "https://images.unsplash.com/photo-1613219413642-38a56f71c89e?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  }
];

export default CategoryGallery;
