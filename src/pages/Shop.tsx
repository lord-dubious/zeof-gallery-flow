
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProductGrid from "../components/shop/ProductGrid";
import ShopFilters from "../components/shop/ShopFilters";
import { useProducts } from "../hooks/use-products";

const Shop = () => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const { products, isLoading, error } = useProducts();

  const handleCategoryChange = (category: string | null) => {
    setCurrentCategory(category);
  };

  const filteredProducts = currentCategory
    ? products.filter(product => product.category === currentCategory)
    : products;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-zeof-cream">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-zeof-gold font-serif tracking-wider mb-4 block text-sm uppercase">
              Our Collections
            </span>
            <h1 className="text-5xl font-serif mb-6 text-zeof-black">
              Luxury Apparel & Accessories
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto font-light tracking-wide">
              Discover our handcrafted pieces created with exceptional materials and uncompromising attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ShopFilters 
                currentCategory={currentCategory} 
                onCategoryChange={handleCategoryChange} 
              />
            </div>

            <div className="w-full lg:w-3/4">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-zeof-gold" />
                </div>
              ) : error ? (
                <div className="text-center p-8 bg-red-50 rounded-lg">
                  <p className="text-red-600">
                    We're experiencing some difficulties loading our products. Please try again later.
                  </p>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
