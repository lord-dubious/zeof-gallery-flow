import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 12, channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Shop = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (error) {
    console.error('Shop query error:', error);
    toast.error("Failed to load products");
    return <div>Error loading products</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <div className="container mx-auto px-8 py-24">
        <h1 className="text-5xl md:text-7xl font-serif text-zeof-black mb-12">
          Our Collections
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            data?.products.edges.map(({ node: product }) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={product.thumbnail?.url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                </div>
                <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-semibold mb-4">
                  {product.pricing?.priceRange?.start?.gross?.amount} 
                  {product.pricing?.priceRange?.start?.gross?.currency}
                </p>
                <Button 
                  onClick={() => toast.success("Added to cart")}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;