
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShopProvider, 
  SearchResultsProvider,
  ProductListingPage,
  FilterButton,
  SortButton,
  SearchBar,
  ProductCard
} from 'react-storefront';
import { Helmet } from 'react-helmet';
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
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
              <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                  <SearchBar placeholder="Search our collection..." />
                </div>
                <div className="flex gap-2">
                  <FilterButton 
                    onOpen={() => setIsFiltersOpen(true)}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm"
                  />
                  <SortButton 
                    options={[
                      { value: 'price_asc', label: 'Price: Low to High' },
                      { value: 'price_desc', label: 'Price: High to Low' },
                      { value: 'newest', label: 'Newest First' }
                    ]}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block col-span-1`}>
                  <div className="sticky top-24 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-serif">Filters</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsFiltersOpen(false)}
                        className="md:hidden"
                      >
                        Close
                      </Button>
                    </div>
                    
                    <div className="divide-y">
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Category</h4>
                        <div className="space-y-2">
                          <FilterButton.Facet
                            field="category"
                            label="All Categories"
                            value={null}
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="category"
                            label="Suits"
                            value="suits"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="category"
                            label="Shirts"
                            value="shirts"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="category"
                            label="Knitwear"
                            value="knitwear"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="category"
                            label="Footwear"
                            value="footwear"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="category"
                            label="Accessories"
                            value="accessories"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                        </div>
                      </div>
                      
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Price Range</h4>
                        <div className="space-y-2">
                          <FilterButton.Facet
                            field="price_range"
                            label="All Prices"
                            value={null}
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="price_range"
                            label="Under $200"
                            value="0-200"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="price_range"
                            label="$200 - $500"
                            value="200-500"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="price_range"
                            label="$500 - $1000"
                            value="500-1000"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                          <FilterButton.Facet
                            field="price_range"
                            label="Over $1000"
                            value="1000-"
                            className="block w-full text-left hover:text-zeof-gold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <ProductListingPage 
                    variant="custom"
                    pageSize={12}
                    skeleton={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-md p-4 h-80 animate-pulse" />
                      ))}
                    </div>}
                    ProductGrid={({ products }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            as="a"
                            href={`/shop/product/${product.id}`}
                            className="group bg-white border border-gray-100 rounded-md overflow-hidden transition-shadow hover:shadow-md"
                            imageProps={{
                              className: "w-full h-56 object-cover object-center transition-transform group-hover:scale-105",
                              width: 300,
                              height: 400
                            }}
                            nameProps={{
                              className: "text-lg font-serif mt-4 px-4"
                            }}
                            priceProps={{
                              className: "text-zeof-gold font-medium mt-1 mb-4 px-4"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </SearchResultsProvider>
          </ShopProvider>
        </div>
      </section>
    </div>
  );
};

export default Shop;
