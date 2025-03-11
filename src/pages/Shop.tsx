
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShopProvider, 
  SearchResultsProvider,
  ProductListingPage 
} from 'react-storefront';
import { Helmet } from 'react-helmet';

const Shop = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <Helmet>
        <title>ZEOF - Shop</title>
        <meta name="description" content="Discover our handcrafted luxury apparel and accessories." />
      </Helmet>

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
          <ShopProvider apiHost="/api">
            <SearchResultsProvider>
              <ProductListingPage />
            </SearchResultsProvider>
          </ShopProvider>
        </div>
      </section>
    </div>
  );
};

export default Shop;
